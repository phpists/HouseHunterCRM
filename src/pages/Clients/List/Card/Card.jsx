import { styled } from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent/MobileContent";

export const Card = ({ selected, onSelect }) => {
  const handleClick = (e) => {
    e.target.classList.contains("card") && onSelect();
  };

  return (
    <StyledCard
      className="hide-scroll card"
      onClick={handleClick}
      selected={selected}
    >
      <DesktopContent />
      <MobileContent />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 14px;
  border-radius: 15px;
  background: #3d3d3d;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: #484848;
  }
  ${({ selected }) => selected && "border: 1.4px solid #FFF;"}
`;
