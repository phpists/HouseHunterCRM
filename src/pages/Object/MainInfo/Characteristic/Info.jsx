import { styled } from "styled-components";
import { Divider } from "../Divider";
import { ProfileField } from "../../../../components/ProfileField";
import { Select } from "../../../../components/Select/Select";
import { useGetCommentsToFieldsQuery } from "../../../../store/objects/objects.api";

export const Info = ({ fields, data, onChangeField }) => {
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
  ];

  return (
    <StyledCategories>
      <Divider title="Характеристики" className="first-divider" />
      <div className="fields">
        {fields?.main_field
          ? Object.entries(fields?.main_field)
              .filter((field) => !notAllowedFields?.find((f) => f === field[0]))
              ?.filter(
                (field) => commentsToFields?.object[field[0]]?.length > 0
              )
              .map((field) => {
                if (typeof field[1]?.field_option === "object") {
                  return (
                    <Select
                      value={data[field[0]]}
                      options={Object.entries(field[1]?.field_option)?.map(
                        (opt) => ({ value: opt[0], title: opt[1] })
                      )}
                      onChange={(val) => onChangeField(field[0], val)}
                      label={commentsToFields?.object[field[0]]}
                      labelActive={commentsToFields?.object[field[0]]}
                      hideArrowDefault
                    />
                  );
                } else {
                  return (
                    <ProfileField
                      placeholder="Введіть значення"
                      value={data[field[0]]}
                      onChange={(val) => onChangeField(field[0], val)}
                      label={commentsToFields?.object[field[0]]}
                      className="field"
                      grey
                    />
                  );
                }
              })
          : null}
      </div>
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
