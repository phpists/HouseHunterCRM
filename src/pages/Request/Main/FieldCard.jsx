import styled from "styled-components";
import { Divider } from "../Divider";
import { SelectTags } from "../../../components/SelectTags/SelectTags";
import { handleChangeRange } from "../../../utilits";
import { Price } from "./Price/Price";
import { TitleDivider } from "./TitleDivider";

export const FieldCard = ({
  title,
  data,
  onChangeField,
  formatedLocations,
  errors,
}) => (
  <StyledFieldCard>
    <TitleDivider title={title} />
    <SelectTags
      label="Локація"
      notMultiSelect
      value={data?.id_location}
      onChange={(val) => onChangeField("id_location", val)}
      options={formatedLocations}
      error={!!errors?.find((e) => e === "id_location")}
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
        !!errors?.find((e) => e === "price_max")
      }
    />
  </StyledFieldCard>
);

const StyledFieldCard = styled.div`
  margin: 20px 0;
`;
