import styled from "styled-components";
import { InfoCard } from "./InfoCard/InfoCard";
import { TagsFilter } from "../../../../../components/TagsFilter/TagsFilter";

export const Date = ({ category, location, date }) => {
  return (
    <StyledDate className="hide-scroll clickable">
      <InfoCard category={category} date={date} />
      <TagsFilter
        label="Локація"
        initTags={[location]}
        className="tags-wrapper"
        noEdit
      />
    </StyledDate>
  );
};

const StyledDate = styled.div`
  border-radius: 9px;
  background: rgba(50, 50, 50, 0.6);
  padding: 10px;
  width: 310px;
  height: 136px;
  overflow: auto;
  .tags-wrapper {
    padding-top: 0;
    background: none;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
  @media (min-width: 1400px) {
    width: 156px;
  }
  @media (min-width: 1550px) {
    width: 310px;
  }
`;
