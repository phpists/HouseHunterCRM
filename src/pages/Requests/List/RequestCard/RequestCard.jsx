import styled from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";

export const RequestCard = ({ selected, onSelect }) => {
  const handleClick = (e) =>
    e.target.classList.contains("clickable") && onSelect();

  return (
    <StyledRequestCard
      selected={selected}
      onClick={handleClick}
      className="clickable"
    >
      <DesktopContent />
      <MobileContent />
    </StyledRequestCard>
  );
};

const StyledRequestCard = styled.div`
  border-radius: 10px;
  background: #3d3d3d;
  padding: 10px;
  justify-content: space-between;
  border: 1px solid transparent;
  ${({ selected }) => selected && "border: 1px solid #fff;"}
  cursor: pointer
`;
