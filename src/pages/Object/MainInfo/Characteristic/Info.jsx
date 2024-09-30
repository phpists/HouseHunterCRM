import { styled } from "styled-components";
import { Divider } from "../Divider";
import { useGetCommentsToFieldsQuery } from "../../../../store/objects/objects.api";
import { ToggleContent } from "./ToggleContent";
import { Fields } from "./Fields";
import { Categories } from "./Categories";
import { useEffect, useState } from "react";

export const Info = ({
  fields,
  data,
  onChangeField,
  errors,
  onOpenSelect,
  onScrollToErrorFields,
}) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [collapsedFields, setCollapsedFields] = useState({});

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

  const handleCheckIsCollapsed = (isSetCollapsedFields) => {
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

    isSetCollapsedFields &&
      setCollapsedFields({
        ...Object.fromEntries(mainFields),
        ...Object.fromEntries(otherFields),
      });
    return mainFields?.length > 0 || otherFields?.length > 0;
  };

  useEffect(() => {
    handleCheckIsCollapsed(true);
  }, [data]);

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
        onOpenSelect={onOpenSelect}
      />
      <Categories
        data={data}
        onChangeField={onChangeField}
        fields={fields?.other_field}
        errors={errors}
        onOpenSelect={onOpenSelect}
      />

      {handleCheckIsCollapsed() ? (
        <ToggleContent
          title="Інше"
          error={errors.filter((e) => collapsedFields?.[e])?.length > 0}
          errorsUpdated={errors.includes("updated")}
          onScrollToErrorFields={onScrollToErrorFields}
        >
          <Categories
            data={data}
            onChangeField={onChangeField}
            fields={collapsedFields}
            errors={errors}
            collapsed
            onOpenSelect={onOpenSelect}
          />
        </ToggleContent>
      ) : null}
    </StyledCategories>
  );
};

const StyledCategories = styled.div`
  border-radius: 10px;
  background: var(--dark-card-bg);
  padding: 4px;
  margin-top: 20px;
  .first-divider {
    margin: -12px 0 0px;
    .title {
      background: var(--dark-card-bg) !important;
      opacity: 1;
      color: var(--second-color);
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
