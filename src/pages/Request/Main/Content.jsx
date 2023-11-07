import { styled } from "styled-components";
import { Divider } from "../Divider";
import { Price } from "./Price/Price";
import { TagsFilter } from "../../../components/TagsFilter/TagsFilter";
import { SelectTags } from "../../../components/SelectTags/SelectTags";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../store/requests/requests.api";
import { handleChangeRange, handleGetLocationAllPath } from "../../../utilits";
import { useEffect, useState } from "react";
import { FieldCard } from "./FieldCard";

export const Content = ({
  data,
  onChangeField,
  categories,
  onChangeCategories,
  fields,
}) => {
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

  const handleFormatCategoriesValues = () =>
    categories.map((id) => {
      const title = rubricsList?.find((r) => r.id === id)?.name ?? "-";
      return { title, value: id };
    });

  const handleChangeValue = (rubricId, fieldName, value) => {
    onChangeField(
      "fields",
      data?.fields.map((f) =>
        f.id_rubric === rubricId ? { ...f, [fieldName]: value } : f
      )
    );
  };

  console.log(fields);
  return (
    <StyledContent>
      <SelectTags
        label="Категорія"
        tags={handleFormatCategoriesValues()}
        showTags
        onChange={(id, title) => onChangeCategories(id, title)}
        options={
          rubricsList
            ? rubricsList?.map(({ id, name }) => ({ title: name, value: id }))
            : []
        }
      />
      {fields?.map((field, i) => (
        <FieldCard
          key={i}
          title={rubricsList?.find((r) => r.id === field?.id)?.name}
          data={data?.fields.find((f) => f.id_rubric === field.id)}
          onChangeField={(fieldName, value) =>
            handleChangeValue(field.id, fieldName, value)
          }
          formatedLocations={formatedLocations}
        />
      ))}
    </StyledContent>
  );
};

const StyledContent = styled.div`
  padding: 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
`;
