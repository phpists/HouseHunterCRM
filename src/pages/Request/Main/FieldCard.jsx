import styled from "styled-components";
import { Divider } from "../Divider";
import { SelectTags } from "../../../components/SelectTags/SelectTags";
import { checkIsArray, handleChangeRange } from "../../../utilits";
import { Price } from "./Price/Price";
import { TitleDivider } from "./TitleDivider";
import { TagsFilter } from "../../../components/TagsFilter/TagsFilter";

export const FieldCard = ({
  title,
  data,
  onChangeField,
  formatedLocations,
  errors,
  fields,
  rubricId,
}) => {
  return (
    <StyledFieldCard>
      <TitleDivider title={title} />
      <SelectTags
        label="Локація"
        tags={formatedLocations?.filter(
          (l) => !!checkIsArray(data?.id_location)?.find((v) => v === l.value)
        )}
        onChange={(val) =>
          onChangeField(
            "id_location",
            checkIsArray(data?.id_location)?.find((l) => l === val)
              ? checkIsArray(data?.id_location)?.filter((l) => l !== val)
              : [
                  ...(checkIsArray(data?.id_location)
                    ? checkIsArray(data?.id_location)
                    : []),
                  val,
                ]
          )
        }
        options={formatedLocations}
        error={!!errors?.find((e) => e === "id_location")}
        showTags
      />
      <Divider />
      <Price
        values={[data?.price_min ?? 0, data?.price_max ?? 0]}
        onChange={(values) =>
          handleChangeRange(
            values,
            [data?.price_min ?? 0, data?.price_max ?? 0],
            ["price_min", "price_max"],
            onChangeField
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
        label="Пошук 1"
        search
        tags={
          Array.isArray(data?.search_key_like_json)
            ? data?.search_key_like_json
            : []
        }
        onChange={(val) => onChangeField("search_key_like_json", val)}
        error={!!errors?.find((e) => e === "search_key_like_json")}
      />
      <Divider />
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
      />
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
      />
    </StyledFieldCard>
  );
};

const StyledFieldCard = styled.div`
  margin: 20px 0;
`;
