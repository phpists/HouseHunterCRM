import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import { Select } from "../../../../components/Select/Select";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../../store/requests/requests.api";
import { useState } from "react";
import {
  handleChangeRange,
  handleGetLocationAllPath,
} from "../../../../utilits";
import { useEffect } from "react";
import { ProfileField } from "../../../../components/ProfileField";
import { useGetCommentsToFieldsQuery } from "../../../../store/objects/objects.api";
import { Price } from "../../../Request/Main/Price/Price";
import { ToggleOption } from "./ToggleOption";
import { CheckOption } from "../../../../components/CheckOption";
import { Base } from "../../../../components/Base/Base";
import { TagsFilter } from "../../../../components/TagsFilter/TagsFilter";

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

export const Main = ({ filters, onChangeFilter, filtersFields }) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const { data: rubricsList } = useGetRubricsQuery();
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);

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
        tags={formatedLocations?.filter(
          (l) => !!filters?.id_location?.find((v) => v === l.value)
        )}
        onChange={(val) =>
          onChangeFilter(
            "id_location",
            filters?.id_location?.find((l) => l === val)
              ? filters?.id_location?.filter((l) => l !== val)
              : [...(filters?.id_location ? filters?.id_location : []), val]
          )
        }
        options={formatedLocations}
        showTags
      />

      <Divider />
      <Price
        values={[filters?.price_min ?? "0", filters?.price_max ?? "0"]}
        onChange={(values) =>
          handleChangeRange(
            values,
            [filters?.price_min ?? "0", filters?.price_max ?? "0"],
            ["price_min", "price_max"],
            onChangeFilter
          )
        }
        currency={Number(filters?.price_currency)}
        onChangeCurrency={(val) => onChangeFilter("price_currency", val)}
      />
      <Divider />
      <ProfileField
        placeholder="Введіть значення"
        value={filters?.id_hash}
        onChange={(val) => onChangeFilter("id_hash", val)}
        label="Пошук по id"
        className="field"
        grey
      />
      {filtersFields?.main_field
        ? Object.entries(filtersFields?.main_field)
            .filter((field) => !notAllowedFields?.find((f) => f === field[0]))
            ?.filter((field) => commentsToFields?.object[field[0]]?.length > 0)
            .map((field) => {
              if (field[0] === "mls") {
                return null;
              }
              if (typeof field[1]?.field_option === "object") {
                return (
                  <>
                    <Divider />
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
                  </>
                );
              } else {
                if (field[1]?.type === "date") {
                  return null;
                }
                return (
                  <>
                    <Divider />
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
                  </>
                );
              }
            })
        : null}
      <Base className="base-wrapper" data={filters} onChange={onChangeFilter} />
      <Divider />
      <TagsFilter
        label="Пошук 1"
        search
        tags={
          Array.isArray(filters?.search_key_like_json)
            ? filters?.search_key_like_json
            : []
        }
        onChange={(val) => onChangeFilter("search_key_like_json", val)}
      />
      <Divider />
      <TagsFilter
        label="Пошук 2"
        search
        tags={
          Array.isArray(filters?.search_key_like2_json)
            ? filters?.search_key_like2_json
            : []
        }
        onChange={(val) => onChangeFilter("search_key_like2_json", val)}
      />
      <Divider />
      <TagsFilter
        label="Пошук Пошук виключення"
        search
        tags={
          Array.isArray(filters?.search_key_notlike_json)
            ? filters?.search_key_notlike_json
            : []
        }
        onChange={(val) => onChangeFilter("search_key_notlike_json", val)}
      />
    </StyledMain>
  );
};

const StyledMain = styled.div`
  .first-angle,
  .second-angle {
    &::after {
      background: #4e4e4e !important;
    }
  }

  .base-wrapper {
    background: none;
  }
`;
