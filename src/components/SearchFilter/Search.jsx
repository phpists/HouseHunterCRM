import React from "react";
import { Divider } from "../../pages/Objects/Header/Filter/Divider";
import {
  notAllowedFields,
  notAllowedFieldsForRubricFive,
} from "../../pages/Objects/Header/Filter/Main";
import { useGetPhonesCodesQuery } from "../../store/auth/auth.api";
import { useGetCommentsToFieldsQuery } from "../../store/objects/objects.api";
import MultipleAccordion from "../Accordions/MultipleAccordion";
import { CARS_TAGS } from "../Base/Base";
import { Field } from "../Field";
import { ProfileField } from "../ProfileField";
import { TagsFilter } from "../TagsFilter/TagsFilter";
import { useAppSelect } from "../../hooks/redux";

const Search = ({
  data,
  onChangeFilter,
  onChangeInputFocus,
  phoneCode,
  onChangePhoneCode,
  errors,
}) => {
  const { filtersFields } = useAppSelect((state) => state.objects);
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();

  const active = CARS_TAGS.filter(
    (t) =>
      t.value !== "tag_exchangePossible" &&
      data?.street_base_object?.[t.value] === "1"
  );

  const handleTagChange = (selectedValues) => {
    // Create a new street_base_object with all tags reset
    const updatedTags = {};
    CARS_TAGS.filter((t) => t.value !== "tag_exchangePossible").forEach(
      (tag) => {
        updatedTags[tag.value] = selectedValues.includes(tag.value)
          ? "1"
          : undefined;
      }
    );

    // Update the parent component's state
    onChangeFilter("street_base_object", {
      ...data?.street_base_object,
      ...updatedTags,
    });
  };

  const selects = filtersFields?.main_field
    ? Object.entries(filtersFields?.main_field)
        .filter((field) => !notAllowedFields?.find((f) => f === field[0]))
        .filter((field) =>
          data.id_rubric === "5"
            ? !notAllowedFieldsForRubricFive?.find((f) => f === field[0])
            : true
        )
        .filter((field) =>
          data.id_rubric === "5"
            ? true
            : !["id_technical_condition"]?.find((f) => f === field[0])
        )
        ?.filter((field) => commentsToFields?.object[field[0]]?.length > 0)
        ?.sort((a, b) => a[1]?.sort - b[1]?.sort)
    : null;

  return (
    <div className="section filterFieldsWrapper">
      <MultipleAccordion
        active={active}
        label={"Теги"}
        options={CARS_TAGS}
        onChange={handleTagChange}
      />
      <Divider />

      <TagsFilter
        label="Пошук по слову"
        search
        tags={Array.isArray(data?.search_like) ? data?.search_like : []}
        onChange={(val) => onChangeFilter("search_like", val)}
      />
      <Divider />

      <TagsFilter
        label="Пошук за виключенням слова"
        search
        tags={Array.isArray(data?.search_not_like) ? data?.search_not_like : []}
        onChange={(val) => {
          onChangeFilter("search_not_like", val);
        }}
        noEdit={
          (Array.isArray(data?.search_like) ? data?.search_like : [])
            ?.length === 0
        }
        noEditAlert="Пошук виключення доступний лише після заповнення поля 'Пошук'"
      />
      <Divider />

      <Field
        placeholder="Введіть значення..."
        value={data?.street_base_object?.id_ad_in_source}
        onChange={(val) =>
          onChangeFilter("street_base_object", {
            ...data?.street_base_object,
            id_ad_in_source: val,
          })
        }
        label="Пошук по ID на першому джерелі"
        className="field-wrapper"
        onFocus={() => onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
      />
      <Divider />

      <ProfileField
        placeholder="Введіть значення"
        value={data?.id_hash}
        onChange={(val) => onChangeFilter("id_hash", val)}
        label="Пошук по ID xDrive"
        className="field"
        grey
        onFocus={() => onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
      />
      <Divider />

      <ProfileField
        label="Пошук по номеру телефону"
        placeholder="Введіть значення..."
        value={data.search_phone}
        onChange={(val) => onChangeFilter("search_phone", val)}
        phone
        phonesCodes={phonesCodes}
        phoneCode={phoneCode}
        onChangePhoneCode={(val) => onChangePhoneCode(val)}
        error={errors?.search_phone}
        onFocus={() => onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
      />
      <Divider />

      {selects?.map((select) => {
        if (select[0] === "VIN") {
          return (
            <React.Fragment key={select[0]}>
              <ProfileField
                placeholder="Введіть значення"
                value={data["VIN"]}
                onChange={(val) =>
                  onChangeFilter(
                    "VIN",
                    filtersFields?.main_field?.VIN?.type === "int"
                      ? Math.ceil(val)
                      : val
                  )
                }
                label={commentsToFields?.object["VIN"]}
                className="field"
                grey
                type={
                  filtersFields?.main_field?.VIN?.type === "int"
                    ? "number"
                    : filtersFields?.main_field?.VIN?.type
                }
                onFocus={() => onChangeInputFocus(true)}
                onBlur={() => onChangeInputFocus(false)}
              />
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};

export default Search;
