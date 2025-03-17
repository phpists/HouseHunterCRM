import styled from "styled-components";
import { Price } from "./Info/Price";
import { Tag } from "./MainInfo/Tags/Tag";
import { useEffect, useState } from "react";
import { handleGetLocationAllPath } from "../../utilits";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
  useLazyGetRubricsFieldsQuery,
} from "../../store/requests/requests.api";

export const CarMainInfo = ({ data, onOpenPriceHistory }) => {
  const { data: locationsList } = useGetLocationsQuery();
  const { data: rubricsList } = useGetRubricsQuery();
  const [getRubricField, { data: fields }] = useLazyGetRubricsFieldsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);

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

  useEffect(() => {
    getRubricField(1);
  }, []);

  const handleGetTagValue = (field, value) =>
    fields?.find((f) => f.field === field)?.field_option?.[value] ?? value;

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

  return (
    <StyledCarMainInfo>
      <div className="car-info-header">
        {" "}
        <div
          className="main-title clickable mb-2"
          onClick={(e) => {
            e.stopPropagation();
            if (data?.link) {
              window.open(data?.link, "_blank");
            }
          }}
        >
          {`${data?.brand_name} ${data?.model_name} ${data?.year}`}
        </div>
        <div onClick={onOpenPriceHistory}>
          {" "}
          <Price data={data} />
        </div>
      </div>
      <div className="top-tags">
        <Tag
          title={`${Number(data?.сar_mileage) / 1000} тис. км.`}
          iIcom="bi bi-speedometer2"
        />
        <Tag
          title={`${formatedLocations
            ?.find((l) => l?.value === data?.id_location)
            ?.title?.split("=>")
            ?.join(" • ")}`}
          iIcom="bi bi-geo-alt"
        />
        <Tag
          title={`${Number(data?.volume_engine) / 1000} • ${
            handleGetTagValue("id_type_fuel", data?.id_type_fuel) ?? ""
          }`}
          iIcom="bi bi-fuel-pump"
        />
        <Tag
          title={`${handleGetTagValue("kpp", data?.kpp)}`}
          iIcom="bi bi-gear"
        />
      </div>{" "}
      <Tag
        title={`${handleGetTagValue(
          "drive_type",
          data?.drive_type
        )} • Універсал •  ${data.index_overbuying}/10 • TOP ${
          data?.data_level
        }`}
        className="mb-2.5"
      />
      <Tag
        titleHtml={
          <>
            На модерації {handleCheckIsNew() ? "• NEW" : ""} •
            <span className={`mx-[1px] ${data?.Count_object >= 5 && "red"}`}>
              {data?.Count_object >= 10
                ? "Перекуп"
                : data?.Count_object >= 5
                ? "Перекуп ?"
                : data?.Count_object >= 2
                ? "Перекуп"
                : "Продавець"}
              ({data?.Count_object})
            </span>
          </>
        }
      />
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
`;
