import styled from "styled-components";
import { InfoCard } from "./InfoCard/InfoCard";
import { TagsFilter } from "../../../../../components/TagsFilter/TagsFilter";

export const Date = () => {
  return (
    <StyledDate className="hide-scroll clickable">
      <InfoCard />
      <TagsFilter
        label="Локація"
        initTags={[
          "Галицький",
          "Личаківський",
          "Шевченківський",
          "Франківський",
        ]}
        className="tags-wrapper"
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
  @media (max-width: 1600px) {
    width: 100%;
  }
`;
