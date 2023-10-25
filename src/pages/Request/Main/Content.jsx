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

export const Content = ({ data, onChangeField }) => {
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
    <StyledContent>
      <SelectTags
        label="Категорія"
        notMultiSelect
        value={data.id_rubric}
        onChange={(val) => onChangeField("id_rubric", val)}
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
        value={data.id_location}
        onChange={(val) => onChangeField("id_location", val)}
        options={formatedLocations}
      />
      <Divider />
      {/* <TagsFilter label="Вулиця" />
      <Divider /> */}
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
      />
    </StyledContent>
  );
};

const StyledContent = styled.div`
  padding: 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
`;
