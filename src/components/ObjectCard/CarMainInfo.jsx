import styled from "styled-components";
import { Price } from "./Info/Price";
import { Tag } from "./MainInfo/Tags/Tag";
import { useEffect, useState } from "react";
import {
  getFromCarMainInfoFiledsOptions,
  handleGetLocationAllPath,
  searchByNumber,
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
  onFindSimilar,
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

  const location = formatedLocations
    .filter(({ value }) => data.id_location === value)[0]
    ?.title.replace(" ", "")
    .replace("=>", ",");

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

  const drive_type = getFromCarMainInfoFiledsOptions(
    "drive_type",
    data?.drive_type
  );

  const id_type_body = car_body_type[0].data?.filter(
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
          <div onClick={onOpenPriceHistory} className="w-full">
            <Price onClick={onOpenPriceHistory} data={data} />
          </div>
          {data?.comment_autoria && onOpenCommentAutoria && (
            <div className="md:hidden relative">
              <div className="absolute top-[-5px] right-[-5px] before:inline-block before:w-1.5 before:h-1.5 before:mr-2 before:bg-red-500 before:rounded-full" />
              <ActionButton
                Icon={ChatIcon}
                onClick={onOpenCommentAutoria}
                className={` ${data?.comment_autoria && "chat-active pulse"}`}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 mt-1">
        <Tag
          className={"!text-xs"}
          title={`${
            Number(data?.сar_mileage) / 1000 === 0
              ? "-"
              : Number(data?.сar_mileage) / 1000
          } тис. км.`}
          iIcom="bi bi-circle-fill"
        />
        <Tag
          className={"!text-xs"}
          title={getFromCarMainInfoFiledsOptions("kpp", data.kpp)}
          iIcom="bi bi-circle-fill"
        />
        <Tag
          className={"!text-xs"}
          title={`${
            data.volume_engine && data.volume_engine !== "0"
              ? `${Number(data.volume_engine) / 1000} л`
              : ""
          } ${getFromCarMainInfoFiledsOptions(
            "id_type_fuel",
            data.id_type_fuel
          )}`}
          iIcom="bi bi-circle-fill"
        />
        <Tag
          className={"!text-xs"}
          title={location}
          iIcom="bi bi-circle-fill"
        />

        <Tag
          className={"md:!hidden !text-xs"}
          title={drive_type}
          iIcom="bi bi-circle-fill"
        />
        <Tag
          className="md:!hidden !text-xs"
          iIcom="bi bi-circle-fill"
          title={id_type_body}
        />
      </div>

      {(drive_type || id_type_body) && (
        <Tag
          className="!hidden md:!flex !text-xs mt-1"
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
      )}

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
        {data?.exchangePossible !== "0" && data?.exchangeType.length !== 0 && (
          <Tag title={data?.exchangeType} />
        )}
        {data?.id_dtp_status === "2" && (
          <Tag
            className="!bg-red-500/20 !text-red-400"
            title={`Участь у дтп`}
          />
        )}
        {data?.id_custom === "2" && <Tag title={`Не розмитнена`} />}
      </div>

      {data.VIN && (
        <div className="hidden md:flex flex-wrap gap-2 items-center">
          <Tag
            className="!text-xs cursor-pointer !bg-transparent !border !border-white !text-white"
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
          onClick={() => searchByNumber(data, fetchClient, phones)}
        >
          {data?.Count_object > 10 ? (
            <Tag
              className="!text-xs !bg-red-500/20 !text-red-400"
              title={`Перекуп ${
                data?.Count_object && `(${data?.Count_object})`
              }`}
            />
          ) : data?.Count_object > 5 ? (
            <Tag
              className="!text-xs !bg-red-500/20 !text-red-400"
              title={`Перекуп ? ${
                data?.Count_object && `(${data?.Count_object})`
              }`}
            />
          ) : data?.Count_object > 2 ? (
            <Tag
              className="!text-xs"
              title={`Перекуп ? ${
                data?.Count_object && `(${data?.Count_object})`
              }`}
            />
          ) : (
            <Tag
              className="!text-xs !bg-green-500/20 !text-green-400"
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
  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
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
