import styled from "styled-components";
import { InfoCard } from "./InfoCard/InfoCard";
import { TagsFilter } from "../../../../../components/TagsFilter/TagsFilter";
import { useGetLocationsQuery } from "../../../../../store/requests/requests.api";
import { useEffect, useState } from "react";
import {
  checkIsArray,
  checkIsJSON,
  handleGetLocationAllPath,
} from "../../../../../utilits";
import { CreatedAt } from "./CreatedAt";

export const Date = ({ category, location, date, dateCreate }) => {
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

  const handleGetLocation = () => {
    const locationValue = checkIsArray(location)
      ? location
      : checkIsArray(checkIsJSON(location));
    return !formatedLocations
      ? []
      : formatedLocations
          ?.filter((v) => locationValue.find((l) => l === v.value))
          ?.map((l) => l.title) ?? [];
  };

  return (
    <StyledDate className="hide-scroll clickable">
      <CreatedAt dateCreate={dateCreate} />
      <InfoCard category={category} date={date} />
      <TagsFilter
        label="Локація"
        tags={handleGetLocation()}
        className="tags-wrapper clickable"
        noEdit
      />
    </StyledDate>
  );
};

const StyledDate = styled.div`
  border-radius: 9px;
  background: var(--bg-60-2);
  padding: 10px;
  width: 320px;
  overflow: auto;
  text-align: left;
  height: 170px;
  .tags-wrapper {
    padding-top: 0;
    background: none;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
  @media (min-width: 1400px) {
    width: 290px;
  }
  @media (min-width: 1550px) {
    width: 350px;
  }
  @media (min-width: 1600px) {
    width: 390px;
  }
`;
