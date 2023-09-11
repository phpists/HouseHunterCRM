import styled from "styled-components";
import { Slider } from "./Slider/Slider";
import { MainInfo } from "./MainInfo/MainInfo";
import { Info } from "./Info/Info";
import { Tags } from "./Tags/Tags";
import { Contacts } from "./Contacts/Contacts";
import { ShowMore } from "./ShowMore/ShowMore";

export const ObjectCard = ({ selected, onSelect }) => {
  const handleClick = (e) =>
    e.target.classList.contains("object-card") && onSelect();

  return (
    <StyledObjectCard
      className={`object-card ${selected && "selected"}`}
      onClick={handleClick}
    >
      <Slider />
      <MainInfo />
      <Info />
      <Tags />
      <Contacts />
      <ShowMore />
    </StyledObjectCard>
  );
};

const StyledObjectCard = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: #3d3d3d;
  height: max-content;
  display: grid;
  grid-template-columns: repeat(5, max-content);
  position: relative;
  transition: all 0.3s;
  border: 1px solid transparent;

  &.selected {
    border: 1px solid #fff;
  }
`;
