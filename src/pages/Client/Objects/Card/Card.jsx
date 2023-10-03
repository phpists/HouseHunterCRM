import { styled } from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";

export const Card = ({ selected, onSelect, onOpenInfo }) => {
  const handleClick = (e) =>
    e.target.classList.contains("openInfo") ? onOpenInfo() : onSelect();

  return (
    <StyledCard onClick={handleClick} selected={selected}>
      <DesktopContent />
      <MobileContent />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 6px 6px 6px 6px;
  border-radius: 15px;
  background: #3d3d3d;
  margin-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: #484848;
  }

  @media (max-width: 700px) {
    padding: 6px;
  }

  ${({ selected }) => selected && "border: 1.4px solid #FFF;"}
`;
