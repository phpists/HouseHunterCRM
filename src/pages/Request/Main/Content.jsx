import { styled } from "styled-components";
import { Divider } from "../Divider";
import { Price } from "./Price/Price";
import { TagsFilter } from "../../../components/TagsFilter/TagsFilter";
import { SelectTags } from "../../../components/SelectTags/SelectTags";
import {
  useGetLocationsQuery,
  useGetRubricsQuery,
} from "../../../store/requests/requests.api";
import { handleChangeRange } from "../../../utilits";
import { useEffect, useState } from "react";

export const Content = ({ data, onChangeField }) => {
  const { data: rubricsList } = useGetRubricsQuery();
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);

  const handleFormatLocations = (formatedLocations = [], level = 0) => {
    if (level >= 0) {
      locationsList
        .filter(({ id }) => Number(id) === level)
        .forEach((parent) => {
          const childrenlocations = locationsList.filter(
            ({ id_parent }) => Number(id_parent) === level
          );

          childrenlocations.forEach((loc) => {
            if (Number(loc.id) !== 0) {
              formatedLocations = [
                ...formatedLocations,
                {
                  title: `${parent.name} => ${loc.name}`,
                  value: loc.id,
                },
              ];
            }
          });
        });
      handleFormatLocations(formatedLocations, level - 1);
    } else {
      setFormatedLocations(formatedLocations);
    }
  };

  useEffect(() => {
    if (locationsList) {
      const lastParentId = Math.max(
        ...locationsList?.map(({ id_parent }) => Number(id_parent))
      );
      handleFormatLocations([], lastParentId);
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
