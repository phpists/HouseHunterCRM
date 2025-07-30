import styled from "styled-components";
import { Price } from "./Info/Price";
import { Tag } from "./MainInfo/Tags/Tag";
import { useEffect, useState } from "react";
import {
  getFromCarMainInfoFiledsOptions,
  handleGetLocationAllPath,
} from "../../utilits";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
  useLazyGetRubricsFieldsQuery,
} from "../../store/requests/requests.api";
import {
  useLazyAddViewLinkQuery,
  useLazyGetCarBodyQuery,
} from "../../store/objects/objects.api";
import { car_body_type, CarMainInfoFileds } from "../../constants";
import rst from "../../assets/images/rst.svg";
import olx from "../../assets/images/olx.png";
import Autoria from "../../assets/images/autoria.svg";
import { ReactComponent as Exchange } from "../../assets/images/exchange.svg";
import { ReactComponent as ChatIcon } from "../../assets/images/chat-grey.svg";
import { ActionButton } from "./ShowMore/ActionButton";

export const CarMainInfo = ({
  data,
  onOpenPriceHistory,
  onClick,
  phones,
  fetchClient,
  onOpenCommentAutoria,
  onToggleFavoriteStatus,
}) => {
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);
  const [addViewLink] = useLazyAddViewLinkQuery();

  const handleFormatLocations = () => {
    const locList = Object.entries(locationsList)?.map((loc) => loc[1]);
    const locations = Object.entries(locationsList)
      .sort((a, b) => Number(b[1].id_parent) - Number(a[1].id_parent))
      ?.map((loc) => loc[1])
      .map(({ id, id_parent, name }) => {
        return handleGetLocationAllPath(locList, id, id_parent, name, "-");
      });

    setFormatedLocations(locations);
  };

  useEffect(() => {
    if (locationsList) {
      handleFormatLocations();
    }
  }, [locationsList]);

  const handleGetTagValue = (field, value) => {
    if (field === "id_type_body") {
      return car_body_type
        .filter(({ id_category }) => id_category == data.id_rubric)[0]
        .data?.find((f) => f.id === value)?.name;
    }
    return (
      CarMainInfoFileds?.find((f) => f.field === field)?.field_option?.[
        value
      ] ?? value
    );
  };

  const handleCheckIsNew = () => {
    const { dt_edit_in_source, price_change_date } = data;
    const editInSourceDate = Number(dt_edit_in_source) * 1000;
    const priceChangeDate = Number(price_change_date) * 1000;
    let today = new Date();
    today.setDate(today.getDate() - 1);
    today.setHours(0, 0, 0, 0);
    today = today.getTime();

    return editInSourceDate > today || priceChangeDate > today;
  };

  const searchByNumber = async () => {
    if (data.id_source === "2") {
      const { id_source, owner_id } = data.clients_inf.contact;

      window.open(
        `/objects?showOwnerObject=${owner_id}&ownerSource=${id_source}`,
        "_blank"
      );
    } else {
      let number = phones;
      if (!phones) {
        const client = await fetchClient(data.id);
        number = client;
      }
      // if there's no number don't redirect
      if (number?.length) {
        window.open(
          `/objects?findClientsObjects=${number[0]?.phone?.replace("38", "")}`,
          "_blank"
        );
      }
    }
  };

  const drive_type = getFromCarMainInfoFiledsOptions(
    "drive_type",
    data?.drive_type
  );

  const id_type_body = data?.data?.filter(
    ({ id }) => id === data?.id_type_body
  )[0]?.name;

  return (
    <StyledCarMainInfo>
      <div className="car-info-header">
        <div>
          <h1 className="flex items-center gap-1 text-md">
            <div
              className="cursor-pointer"
              onClick={() => data?.link && window.open(data?.link, "_blank")}
            >
              {data.id_source === "1" && (
                <img src={Autoria} alt="Autoria" className="w-10" />
              )}
              {data.id_source === "2" && (
                <img src={olx} alt="olx" className="w-6" />
              )}
              {data.id_source === "3" && (
                <img src={rst} alt="RST" className="w-8" />
              )}
            </div>
            <span
              className="cursor-pointer hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                addViewLink(data.id);
                onClick(e);
              }}
            >{`${data?.brand_name} ${data?.model_name} ${data?.year}`}</span>
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <div onClick={onOpenPriceHistory}>
            <Price data={data} />
          </div>
          {data?.comment_autoria && onOpenCommentAutoria && (
            <ActionButton
              Icon={ChatIcon}
              onClick={onOpenCommentAutoria}
              className={`md:hidden ${
                data?.comment_autoria && "chat-active pulse"
              }`}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 mt-1">
        <Tag
          title={`${
            Number(data?.сar_mileage) / 1000 === 0
              ? "-"
              : Number(data?.сar_mileage) / 1000
          } тис. км.`}
          iIcom="bi bi-circle-fill"
        />
        <Tag
          title={getFromCarMainInfoFiledsOptions("kpp", data.kpp)}
          iIcom="bi bi-circle-fill"
        />
        <Tag
          title={`${getFromCarMainInfoFiledsOptions(
            "id_type_fuel",
            data.id_type_fuel
          )} ${
            data.volume_engine && data.volume_engine !== "0"
              ? `${Number(data.volume_engine) / 1000} л`
              : ""
          }`}
          iIcom="bi bi-circle-fill"
        />
        <Tag title={data.location_name} iIcom="bi bi-circle-fill" />
      </div>
      <Tag
        className="text-xs mt-1"
        iIcom="bi bi-circle-fill"
        titleHtml={
          <>
            <span>{drive_type && drive_type + " • "}</span>
            <span>{id_type_body && id_type_body + " • "}</span>
            <span>{data.rubric_name && data.rubric_name + " • "}</span>
            <span>{data?.name && data?.name + " • "}</span>
          </>
        }
      />

      <div className="flex my-1 gap-1">
        {data?.exchangePossible !== "0" && (
          <>
            <Tag
              Icon={<Exchange />}
              className="!hidden md:!flex !bg-orange-500/20 !text-orange-400"
              title={`Обмін`}
            />
            <Tag
              Icon={<Exchange />}
              className="md:!hidden !bg-orange-500/20 !text-orange-400"
            />
          </>
        )}
        {data?.exchangeType.length !== 0 && <Tag title={data?.exchangeType} />}
        {data?.id_dtp_status !== "0" && <Tag title={`Участь у дтп`} />}
        {data?.id_custom === "2" && <Tag title={`Не розмитнена`} />}
      </div>

      {data.VIN && (
        <div className="hidden md:flex flex-wrap gap-1 items-center">
          <Tag
            className="!text-xs cursor-pointer"
            title={`VIN ${data.VIN}`}
            onClick={() => {
              window.open(`/objects?VIN=${data.VIN}`, "_blank");
            }}
          />

          <Tag
            className="!text-xs cursor-pointer"
            сopyValue={data.VIN}
            iIcom="bi bi-copy"
            copy
          />
          <p
            onClick={() =>
              window.open(
                `https://www.google.com/search?q=VIN+${data.VIN}`,
                "_blank"
              )
            }
            className="cursor-pointer underline text-white/60 text-xs"
          >
            шукати в Google
          </p>
        </div>
      )}

      <div className="hidden md:flex justify-between items-center">
        <div
          className="mt-1 flex items-center gap-4 cursor-pointer"
          onClick={() => {
            if (data.id_source === "2") {
              const { owner_id, id_source } = data?.clients_inf?.contacts;
              window.open(
                `/objects?showOwnerObject=${owner_id}&ownerSource=${id_source}`,
                "_blank"
              );
            } else {
              window.open(
                `/objects?findClientsObjects=${data?.clients_inf?.contacts?.phones[0]?.phone?.replace(
                  "38",
                  ""
                )}`,
                "_blank"
              );
            }
          }}
        >
          {data?.Count_object > 10 ? (
            <Tag className="!bg-red-500/20 !text-red-400" title={"Перекуп"} />
          ) : data?.Count_object > 5 ? (
            <Tag
              className=" !bg-red-500/20 !text-red-400"
              title={"Перекуп ?"}
            />
          ) : data?.Count_object > 2 ? (
            <Tag title={"Перекуп ?"} />
          ) : (
            <Tag
              className=" !bg-green-500/20 !text-green-400"
              title={`Продавець ${
                data?.Count_object && `(${data?.Count_object})`
              }`}
            />
          )}
        </div>
        <div className="flex gap-2">
          <Tag
            className={"!bg-transparent"}
            title={data?.count_views}
            iIcom="bi bi-eye"
          />
          <Tag
            className={"!bg-transparent"}
            title={data?.count_likes}
            iIcom="bi bi-heart"
          />
        </div>
      </div>
    </StyledCarMainInfo>
  );
};

const StyledCarMainInfo = styled.div`
  .car-info-header {
    display: grid;
    grid-template-columns: 1fr max-content;
    gap: 10px;
    align-items: center;
  }
  .main-title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;

    &:hover {
      text-decoration: underline;
    }
  }
  .top-tags {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 10px;
  }
  .red {
    color: #f94343;
  }

  @media (max-width: 768px) {
    .car-info-header {
      grid-template-columns: 1fr;
    }
  }
`;
