import { styled } from "styled-components";
import { Slider } from "./Slider/Slider";
import { Divider } from "../Divider";
import { Field } from "../../../../components/Field";
import { CreatedDate } from "./CreatedDate";
import { Tag } from "./Tag/Tag";
import { ReactComponent as DoorsIcon } from "../../.../../../../assets/images/doors.svg";
import { ReactComponent as ExpandedIcon } from "../../.../../../../assets/images/epanded.svg";
// import { ReactComponent as BoxSelectIcon } from "../../.../../../../assets/images/box-select.svg";
import { ReactComponent as StairsIcon } from "../../.../../../../assets/images/stairs.svg";
import noPhoto from "../../.../../../../assets/images/no-photo.svg";
import { TagDivider } from "./Tag/TagDivider";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
  useLazyGetRubricsFieldsQuery,
} from "../../../../store/requests/requests.api";
import { useState } from "react";
import { useEffect } from "react";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import {
  checkIsArray,
  fortmatNumber,
  handleGetFieldsOptions,
  handleGetLocationAllPath,
} from "../../../../utilits";
import { PRICES_FOR_TITLE } from "../../../../constants";
import { Status } from "./Status";
import { Id } from "../Id";
import { useGetCommentsToFieldsQuery } from "../../../../store/objects/objects.api";
import { ProfileField } from "../../../../components/ProfileField";
import { Ranger } from "../../../../components/Ranger/Ranger";
import { CheckOption } from "../../../../components/CheckOption";

const filteredFields = [
  "id_rubric",
  "id_location",
  "comment",
  "price_currency",
  "price_min_USD",
  "price_max_USD",
  "price_min_EUR",
  "price_max_EUR",
  "price_min_UAH",
  "price_max_UAH",
  "price_min",
  "price_max",
  "price_for",
];

export const Maininfo = ({
  data,
  onChangeField,
  requestData,
  isObject,
  objectFields,
  id,
}) => {
  const { data: rubricsList } = useGetRubricsQuery();
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);
  const [getRubricField, { data: fields }] = useLazyGetRubricsFieldsQuery();
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();

  const TYPES = ["", "metr", "sotka", "hektar", "object"];

  const handleFormatLocations = () => {
    const locList = Object.entries(locationsList)?.map((loc) => loc[1]);
    const locations = Object.entries(locationsList)
      .sort((a, b) => Number(b[1].id_parent) - Number(a[1].id_parent))
      ?.map((loc) => loc[1])
      //   .filter((loc) => Number(loc?.id_parent) !== 0)
      .map(({ id, id_parent, name }) => {
        return handleGetLocationAllPath(locList, id, id_parent, name);
      });

    setFormatedLocations(locations);
  };

  useEffect(() => {
    if (locationsList) {
      handleFormatLocations();
    }
    // eslint-disable-next-line
  }, [locationsList]);

  const handleGetPriceCurrency = (price_currency) =>
    price_currency === "1" ? "₴" : price_currency === "2" ? "$" : "€";

  useEffect(() => {
    getRubricField(data.id_rubric);
  }, [data.id_rubric]);

  return (
    <StyledMaininfo>
      {isObject && (
        <>
          <Slider photos={data?.img?.length > 0 ? data?.img : [noPhoto]} />
          <Divider />
        </>
      )}
      <div className="flex items-center category-wrapper">
        <SelectTags
          label="Категорія"
          notMultiSelect
          value={data.id_rubric}
          onChange={(val) => onChangeField("id_rubric", val)}
          options={
            rubricsList
              ? rubricsList?.map(({ id, name }) => ({ title: name, value: id }))
              : []
          }
          viewOnly
          hide
        />{" "}
        <Id id={id} />
      </div>
      <Divider />
      <SelectTags
        label="Локація"
        tags={formatedLocations?.filter((l) =>
          checkIsArray(data.id_location)?.find((i) => i === l.value)
        )}
        onChange={(val) => onChangeField("id_location", val)}
        options={formatedLocations}
        viewOnly
        showTags
        hide
      />
      <Divider />
      <div className="field-group">
        <Field
          value={
            isObject
              ? Number(data?.price ?? 0) === 0
                ? "Не вказана"
                : `${fortmatNumber(
                    Number(data?.[`price`] ?? 0)
                  )}${handleGetPriceCurrency(data?.price_currency)}`
              : Number(data?.price_max ?? 0) === 0 &&
                Number(data?.price_min ?? 0) === 0
              ? "Не вказана"
              : `${fortmatNumber(
                  Number(data?.price_min ?? 0)
                )}${handleGetPriceCurrency(
                  data?.price_currency
                )} - ${fortmatNumber(
                  Number(data?.price_max ?? 0)
                )}${handleGetPriceCurrency(data?.price_currency)}`
          }
          onChange={(val) => onChangeField("price_min", val)}
          label="Вартість"
          className="price-field"
          viewOnly
        />
        <CreatedDate date={data?.dt_add} deadline={data?.dt_deadline} />
      </div>
      <Divider />
      {isObject ? null : (
        <div>
          {" "}
          {data.generalInfo?.name?.length > 0 ? (
            <Field
              value={data.generalInfo?.comment}
              onChange={(val) => null}
              label="Коментар"
              viewOnly
            />
          ) : null}
          {data.generalInfo?.name?.length > 0 ? (
            <Field
              value={data.generalInfo?.name}
              onChange={(val) => null}
              label="Назва підбірки"
              viewOnly
            />
          ) : null}
          {fields
            ?.filter((f) => !filteredFields?.find((ff) => ff === f?.field))
            ?.map(({ field, field_option, type }, i) => {
              if (data[field] === "0" || data[field]?.length === 0) {
                return null;
              } else if (Object.entries(field_option)?.length > 0) {
                return (
                  <>
                    {i > 0 && <Divider />}
                    <SelectTags
                      label={
                        commentsToFields?.request?.[field]
                          ? commentsToFields?.request?.[field]
                          : commentsToFields?.object?.[field] ?? ""
                      }
                      placeholder="Оберіть"
                      notMultiSelect
                      options={handleGetFieldsOptions(fields, field)}
                      value={data[field]}
                      onChange={(val) => null}
                      viewOnly
                    />
                  </>
                );
              } else if (
                field?.includes("_min") &&
                fields?.find((f) => f.field === field?.replace("_min", "_max"))
              ) {
                return null;
              } else if (
                field?.includes("_from") &&
                fields?.find((f) => f.field === field?.replace("_from", "_to"))
              ) {
                return null;
              } else if (
                ["not_first_storey", "not_last_storey"]?.includes(field)
              ) {
                const labels = {
                  not_first_storey: "Не перший поверх",
                  not_last_storey: "Не останній поверх",
                };
                return (
                  <>
                    {" "}
                    {i > 0 && <Divider />}
                    <CheckOption
                      label={labels[field] ?? ""}
                      value={data[field]}
                      onChange={(val) => onChangeField(field, val)}
                    />
                  </>
                );
              } else if (["id_brand", "id_model"].includes(field)) {
                return null;
              } else if (
                field?.includes("_max") &&
                !fields?.find((f) => f.field === field?.replace("_max", "_min"))
              ) {
                return <div></div>;
              } else if (field?.includes("_to")) {
                return <div></div>;
              } else if (type === "int") {
                return (
                  <div>
                    {i > 0 && <Divider />}
                    <ProfileField
                      label={
                        commentsToFields?.request?.[field]
                          ? commentsToFields?.request?.[field]
                          : commentsToFields?.object?.[field] ?? ""
                      }
                      value={data[field]}
                      onChange={(val) => onChangeField(field, val)}
                      placeholder="Введіть значення"
                      type="number"
                    />{" "}
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>
      )}
      <div className="flex flex-wrap items-center tags">
        {/* {(isObject
          ? objectFields?.main_field?.rooms?.required === 1
          : true) && (
          <>
            <Tag
              Icon={DoorsIcon}
              text={
                isObject
                  ? `${data?.rooms ?? 0}к`
                  : `${data?.room_min ?? 0}-${data?.room_max ?? 0}к`
              }
            />
            <TagDivider />
          </>
        )} */}
        {/* {(isObject
          ? objectFields?.main_field?.area_total?.required === 1 ||
            objectFields?.main_field?.area_plot_sotka?.required === 1
          : true) && (
          <Tag
            Icon={ExpandedIcon}
            text={
              isObject ? (
                <>
                  {data?.area_total ? (
                    <>
                      {data?.area_total} м<sup>2</sup>
                    </>
                  ) : (
                    <>{data?.area_plot_sotka} соток</> ?? (
                      <>
                        0 м<sup>2</sup>
                      </>
                    )
                  )}
                </>
              ) : (
                <>
                  {data?.area_total_min}-{data?.area_total_max}м<sup>2</sup>
                </>
              )
            }
          />
        )} */}
        {/* <TagDivider />
        <Tag
          Icon={BoxSelectIcon}
          text={
            <>
              100 м<sup>2</sup>
            </>
          }
        /> */}
        {requestData?.address_storey &&
          (isObject
            ? objectFields?.main_field?.address_storey?.required === 1
            : true) && (
            <>
              <TagDivider />
              <Tag
                Icon={StairsIcon}
                text={`${requestData?.address_storey} із ${requestData?.storey_count}`}
              />
              <Divider />
            </>
          )}
      </div>
      <Divider />
      {isObject ? null : (
        <Status
          status={data?.isActual}
          date={
            data?.dateEndAggrement !== "0" ? data?.dateEndAggrement : undefined
          }
        />
      )}

      {data?.comment?.length > 0 && data?.comment ? (
        <>
          <Divider />
          <Field
            value={data?.comment}
            onChange={(val) => onChangeField("comment", val)}
            label="Коментар"
            textarea
            className="title-field"
            viewOnly
          />
        </>
      ) : null}
    </StyledMaininfo>
  );
};

const StyledMaininfo = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: var(--bg-10);
  margin-bottom: 10px;
  .title-field {
    align-items: start !important;
  }
  .field-group {
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 6px;
  }
  .tags {
    padding: 0 6px;
    gap: 10px 0;
  }
  .price-field {
    .value {
      color: var(--green);
      width: 150px;
    }
  }
  .location {
    span {
      width: 130px;
      transition: all 0.3s;
    }
  }
  .area-tag,
  .doors-tag {
    svg {
      transition: all 0.3s;
    }
  }
  .category-wrapper {
    display: grid;
    grid-template-columns: 217px max-content;
  }
`;
