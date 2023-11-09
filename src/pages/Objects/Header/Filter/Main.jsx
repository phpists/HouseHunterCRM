import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import { Select } from "../../../../components/Select/Select";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../../store/requests/requests.api";
import { useState } from "react";
import { handleGetLocationAllPath } from "../../../../utilits";
import { useEffect } from "react";
import { ProfileField } from "../../../../components/ProfileField";
import { useGetCommentsToFieldsQuery } from "../../../../store/objects/objects.api";

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
      .filter((loc) => Number(loc?.id_parent) !== 0)
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
        onChange={(val) => onChangeFilter("id_rubric", val)}
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
        onChange={(val) => onChangeFilter("id_location", val)}
        options={formatedLocations}
      />
      <Divider />
      {filtersFields?.main_field
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
        : null}
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
`;
