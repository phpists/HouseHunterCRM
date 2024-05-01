import styled from "styled-components";
import { SelectTags } from "../../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import { Select } from "../../../../../components/Select/Select";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../../../store/requests/requests.api";
import { useState } from "react";
import {
  checkIsArray,
  handleChangeRange,
  handleGetLocationAllPath,
} from "../../../../../utilits";
import { useEffect } from "react";
import { ProfileField } from "../../../../../components/ProfileField";
import {
  useGetCommentsToFieldsQuery,
  useGetTagsListQuery,
} from "../../../../../store/objects/objects.api";
import { Price } from "../../../../Request/Main/Price/Price";
import { ToggleOption } from "./ToggleOption";
import { CheckOption } from "../../../../../components/CheckOption";
import { SELECTION_TAGS, TAGS } from "../../../../../constants";

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
];

export const Main = ({
  filters,
  onChangeFilter,
  filtersFields,
  onChangeInputFocus,
  isInputFocused,
}) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const { data: rubricsList } = useGetRubricsQuery();
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);
  const { data: tagsList } = useGetTagsListQuery();

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
  }, [locationsList]);

  const handleSelectTag = (val, fieldName) => {
    const isSelectionTag = SELECTION_TAGS.find((t) => t.value === val);

    if (!!isSelectionTag) {
      const isExist = !!filters?.folder_tags?.find((t) => t === val);
      onChangeFilter(
        "folder_tags",
        isExist
          ? filters?.folder_tags?.filter((t) => t !== val)
          : [...checkIsArray(filters?.folder_tags), val]
      );
    } else {
      const isExist = !!filters?.labels?.find((t) => t === val);
      onChangeFilter(
        fieldName,
        isExist
          ? filters?.labels?.filter((t) => t !== val)
          : [...checkIsArray(filters?.labels), val]
      );
    }
  };

  return (
    <StyledMain className="section">
      <SelectTags
        label="Категорія"
        notMultiSelect
        value={filters?.id_rubric}
        onChange={(val) =>
          onChangeFilter("id_rubric", val === filters?.id_rubric ? null : val)
        }
        options={
          rubricsList
            ? rubricsList?.map(({ id, name }) => ({ title: name, value: id }))
            : []
        }
      />
      <Divider />
      <SelectTags
        label="Локація"
        notMultiSelect
        value={filters?.id_location}
        onChange={(val) =>
          onChangeFilter(
            "id_location",
            val === filters?.id_location ? null : val
          )
        }
        options={formatedLocations}
      />
      <Divider />
      <Price
        values={[filters?.price_min ?? 0, filters?.price_max ?? 0]}
        onChange={(values) =>
          handleChangeRange(
            values,
            [filters?.price_min ?? 0, filters?.price_max ?? 0],
            ["price_min", "price_max"],
            onChangeFilter
          )
        }
        currency={Number(filters?.price_currency)}
        onChangeCurrency={(val) => onChangeFilter("price_currency", val)}
        isType
        allTypes
        rubricId={filters?.id_rubric}
        typeValue={filters?.price_for}
        onChangeType={(val) => onChangeFilter("price_for", val)}
        onFocus={() => !isInputFocused && onChangeInputFocus(true)}
        onBlur={() => onChangeInputFocus(false)}
      />
      <Divider />
      <ToggleOption
        label="Лайк"
        value={filters?.only_like_object === "1"}
        onChange={() =>
          onChangeFilter(
            "only_like_object",
            {
              ...filters,
              show_not_choise_objects: undefined,
              only_dislike_object: undefined,
              only_like_object:
                filters?.only_like_object === "1" ? undefined : "1",
            },
            true
          )
        }
      />
      <Divider />
      <ToggleOption
        label="Дизлайк"
        value={filters?.only_dislike_object === "1"}
        onChange={() =>
          onChangeFilter(
            "only_dislike_object",
            {
              ...filters,
              show_not_choise_objects: undefined,
              only_dislike_object:
                filters?.only_dislike_object === "1" ? undefined : "1",
              only_like_object: undefined,
            },
            true
          )
        }
      />
      <Divider />
      <ToggleOption
        label="Не обрані клієнтом "
        value={filters?.show_not_choise_objects === "1"}
        onChange={() =>
          onChangeFilter(
            "only_dislike_object",
            {
              ...filters,
              show_not_choise_objects:
                filters?.show_not_choise_objects === "1" ? undefined : "1",
              only_dislike_object: undefined,
              only_like_object: undefined,
            },
            true
          )
        }
      />
      <Divider />
      <SelectTags
        label="Теги"
        showTags
        tags={
          TAGS
            ? [
                ...TAGS?.filter(
                  (t) => !!filters?.labels?.find((l) => l === t)
                )?.map((t) => ({
                  title: commentsToFields?.object[t] ?? "-",
                  value: t,
                })),
                ...SELECTION_TAGS?.filter(
                  (t) => !!filters?.folder_tags?.find((l) => l === t.value)
                ),
              ]
            : []
        }
        options={[
          ...TAGS?.map((value) => ({
            title: commentsToFields?.object[value] ?? "-",
            value,
          })),
          ...SELECTION_TAGS,
        ]}
        onChange={(val) => handleSelectTag(val, "labels")}
      />
      <Divider />

      <CheckOption
        label="Мої об'єкти"
        className="check-opt"
        value={filters?.my_object ? "1" : "0"}
        onChange={(val) =>
          onChangeFilter(
            "my_object",
            {
              ...filters,
              my_object: filters?.my_object === "1" ? undefined : "1",
              company_object: undefined,
              street_base_object: undefined,
              mls_object: undefined,
            },
            true
          )
        }
      />
      <CheckOption
        label="Об'єкти компанії"
        className="check-opt"
        value={filters?.company_object ? "1" : "0"}
        onChange={(val) =>
          onChangeFilter(
            "my_object",
            {
              ...filters,
              my_object: undefined,
              company_object: filters?.company_object === "1" ? undefined : "1",
              street_base_object: undefined,
              mls_object: undefined,
            },
            true
          )
        }
      />
      <CheckOption
        label="Об'єкти street base"
        className="check-opt"
        value={filters?.street_base_object ? "1" : "0"}
        onChange={(val) =>
          onChangeFilter(
            "my_object",
            {
              ...filters,
              my_object: undefined,
              company_object: undefined,
              street_base_object:
                filters?.street_base_object === "1" ? undefined : "1",
              mls_object: undefined,
            },
            true
          )
        }
      />
      <CheckOption
        label="Об'єкти MLS"
        className="check-opt"
        value={filters?.mls_object ? "1" : "0"}
        onChange={(val) =>
          onChangeFilter(
            "my_object",
            {
              ...filters,
              my_object: undefined,
              company_object: undefined,
              street_base_object: undefined,
              mls_object: filters?.mls_object === "1" ? undefined : "1",
            },
            true
          )
        }
      />
      <Divider />
      {/* {filtersFields?.main_field
        ? Object.entries(filtersFields?.main_field)
            .filter((field) => !notAllowedFields?.find((f) => f === field[0]))
            ?.filter((field) => commentsToFields?.object[field[0]]?.length > 0)
            .map((field) => {
              if (typeof field[1]?.field_option === "object") {
                return (
                  <>
                    <Select
                      value={filters[field[0]]}
                      options={Object.entries(field[1]?.field_option)?.map(
                        (opt) => ({ value: opt[0], title: opt[1] })
                      )}
                      onChange={(val) => onChangeFilter(field[0], val)}
                      label={commentsToFields?.object[field[0]]}
                      labelActive={commentsToFields?.object[field[0]]}
                      hideArrowDefault
                    />
                    <Divider />
                  </>
                );
              } else {
                if (field[1]?.type === "date") {
                  return null;
                }
                return (
                  <>
                    <ProfileField
                      placeholder="Введіть значення"
                      value={filters[field[0]]}
                      onChange={(val) => onChangeFilter(field[0], val)}
                      label={commentsToFields?.object[field[0]]}
                      className="field"
                      grey
                      type={
                        field[1]?.type === "int" ? "number" : field[1]?.type
                      }
                    />
                    <Divider />
                  </>
                );
              }
            })
        : null} */}
    </StyledMain>
  );
};

const StyledMain = styled.div`
  .first-angle,
  .second-angle {
    &::after {
      background: var(--bg-78-heck) !important;
    }
  }
`;
