import styled from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";

export const ObjectCard = ({ selected, onSelect }) => {
  const handleClick = (e) =>
    e.target.classList.contains("clickable") && onSelect();

  return (
    <StyledObjectCard
      className={` clickable ${selected && "selected"}`}
      onClick={handleClick}
    >
      <DesktopContent />
      <MobileContent />
    </StyledObjectCard>
  );
};

const StyledObjectCard = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: #3d3d3d;
  position: relative;
  transition: all 0.1s;
  border: 1px solid transparent;
  cursor: pointer;
  &.selected {
    border: 1px solid #fff;
  }
  @media (max-width: 1600px) {
    padding: 10px;
  }
`;
