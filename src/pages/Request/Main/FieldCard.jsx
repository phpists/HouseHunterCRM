import styled from "styled-components";
import { Divider } from "../Divider";
import { SelectTags } from "../../../components/SelectTags/SelectTags";
import { checkIsArray, handleChangeRange, showAlert } from "../../../utilits";
import { Price } from "./Price/Price";
import { TitleDivider } from "./TitleDivider";
import { TagsFilter } from "../../../components/TagsFilter/TagsFilter";
import { useEffect } from "react";
import { LocationSearch } from "../../../components/LocationSearch/LocationSearch";

export const FieldCard = ({
  title,
  data,
  onChangeField,
  formatedLocations,
  errors,
  fields,
  rubricId,
}) => {
  useEffect(() => {
    if (
      (Array.isArray(data?.search_key_like_json)
        ? data?.search_key_like_json
        : []
      )?.length === 0
    ) {
      onChangeField("search_key_notlike_json", []);
    }
  }, [data?.search_key_like_json]);

  return (
    <StyledFieldCard>
      <TitleDivider title={title} />
      <LocationSearch
        label="Локація"
        value={data?.id_location}
        onChange={(val) =>
          checkIsArray(data?.id_location)?.length >= 10
            ? showAlert("error", "Можна обрати максимум 10 локацій")
            : onChangeField("id_location", val)
        }
        error={!!errors?.find((e) => e === "id_location")}
        placeholder="Оберіть локацію"
      />

      <Divider />
      <Price
        values={[data?.price_min ?? 0, data?.price_max ?? 0]}
        onChange={(values) =>
          handleChangeRange(
            values,
            [data?.price_min ?? 0, data?.price_max ?? 0],
            ["price_min", "price_max"],
            (values) => onChangeField("update", { ...data, ...values }, true)
          )
        }
        currency={Number(data?.price_currency)}
        onChangeCurrency={(val) => onChangeField("price_currency", val)}
        error={
          !!errors?.find((e) => e === "price_min") ||
          !!errors?.find((e) => e === "price_max") ||
          !!errors?.find((e) => e === "price_for")
        }
        isType={!!fields?.find((f) => f?.field === "price_for")}
        rubricId={rubricId}
        typeValue={data?.price_for}
        onChangeType={(val) => onChangeField("price_for", val)}
        typeError={!!errors?.find((e) => e === "price_for")}
      />
      <Divider />
      <TagsFilter
        label="Пошук"
        search
        tags={
          Array.isArray(data?.search_key_like_json)
            ? data?.search_key_like_json
            : []
        }
        onChange={(val) => onChangeField("search_key_like_json", val)}
        error={!!errors?.find((e) => e === "search_key_like_json")}
      />
      {/* <Divider />
      <TagsFilter
        label="Пошук 2"
        search
        tags={
          Array.isArray(data?.search_key_like2_json)
            ? data?.search_key_like2_json
            : []
        }
        onChange={(val) => onChangeField("search_key_like2_json", val)}
        error={!!errors?.find((e) => e === "search_key_like2_json")}
      /> */}
      <Divider />
      <TagsFilter
        label="Пошук виключення"
        search
        tags={
          Array.isArray(data?.search_key_notlike_json)
            ? data?.search_key_notlike_json
            : []
        }
        onChange={(val) => onChangeField("search_key_notlike_json", val)}
        error={!!errors?.find((e) => e === "search_key_notlike_json")}
        noEdit={
          (Array.isArray(data?.search_key_like_json)
            ? data?.search_key_like_json
            : []
          )?.length === 0
        }
        noEditAlert="Пошук виключення доступний лише після заповнення поля 'Пошук'"
      />
    </StyledFieldCard>
  );
};

const StyledFieldCard = styled.div`
  margin: 20px 0;
`;
