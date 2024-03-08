import { styled } from "styled-components";
import { Divider } from "../Divider";
import { ProfileField } from "../../../../components/ProfileField";
import { Select } from "../../../../components/Select/Select";
import { useGetCommentsToFieldsQuery } from "../../../../store/objects/objects.api";
import { CheckOption } from "../../../../components/CheckOption";
import { ToggleContent } from "./ToggleContent";
import { Fields } from "./Fields";
import { Categories } from "./Categories";

export const Info = ({ fields, data, onChangeField, errors }) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const notAllowedFields = [
    "comment",
    "description",
    "id_client",
    "id_location",
    "id_rubric",
    "label_without_animals",
    "label_without_children",
    "label_without_foreigners",
    "label_without_students",
    "title",
    "obj_is_actual",
    "obj_is_actual_dt",
    "photos_json",
    "price",
    "price_EUR",
    "price_UAH",
    "price_USD",
    "id_location_street",
    "is_actual_to_dt_end_agreement",
    "address_house_number",
    "price_history_json",
    "price_for",
    "price_currency",
    "label_fake",
    "label_without_animals",
    "label_without_children",
    "label_without_foreigners",
    "label_without_students",
    "mls",
    "dt_end_agreement",
  ];

  const handleCheckIsCollapsed = () => {
    const mainFields = Object.entries(fields?.main_field)
      ?.filter((field) => !notAllowedFields?.find((f) => f === field[0]))
      ?.filter((field) => field?.[1]?.collapsed === 1);

    const otherFields =
      Object.entries(fields?.other_field)?.length > 0
        ? [...Object.entries(fields?.other_field)]
            ?.filter(
              (category) => commentsToFields?.object[category[0]]?.length > 0
            )
            ?.filter((c) => c?.[1]?.collapsed === 1)
        : [];

    return mainFields?.length > 0 || otherFields?.length > 0;
  };

  return (
    <StyledCategories>
      <Divider title="Характеристики" className="first-divider" />
      <Fields
        fields={fields?.main_field}
        data={data}
        notAllowedFields={notAllowedFields}
        commentsToFields={commentsToFields}
        onChangeField={onChangeField}
        errors={errors}
      />
      <Categories
        data={data}
        onChangeField={onChangeField}
        fields={fields}
        errors={errors}
      />

      {handleCheckIsCollapsed() ? (
        <ToggleContent title="Інше">
          <Fields
            fields={fields?.main_field}
            data={data}
            notAllowedFields={notAllowedFields}
            commentsToFields={commentsToFields}
            onChangeField={onChangeField}
            errors={errors}
            collapsed
          />
          <Categories
            data={data}
            onChangeField={onChangeField}
            fields={fields}
            errors={errors}
            collapsed
          />
        </ToggleContent>
      ) : null}
    </StyledCategories>
  );
};

const StyledCategories = styled.div`
  border-radius: 10px;
  background: #323232;
  padding: 4px;
  margin-top: 20px;
  .first-divider {
    margin: -12px 0 0px;
    .title {
      background: #323232 !important;
      opacity: 1;
      color: rgba(255, 255, 255, 0.4);
      border: none;
    }
    div {
      opacity: 0;
    }
  }
  .fields {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    grid-auto-rows: max-content;
  }
  .field-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }
`;
