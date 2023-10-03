import styled from "styled-components";
import { useState } from "react";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent/MobileContent";

export const StructureCard = ({ onOpenInfo, onNextLevel }) => {
  const [totalInfoOpened, settotalInfoOpened] = useState(false);

  const handleNextLevel = (e) =>
    !e.target.classList.contains("notClickable") && onNextLevel();

  return (
    <StyledStructureCard onClick={handleNextLevel}>
      <DesktopContent
        onOpenInfo={onOpenInfo}
        totalInfoOpened={totalInfoOpened}
        onToggleOpen={() => settotalInfoOpened(!totalInfoOpened)}
      />
      <MobileContent
        onOpenInfo={onOpenInfo}
        totalInfoOpened={totalInfoOpened}
        onToggleOpen={() => settotalInfoOpened(!totalInfoOpened)}
      />
    </StyledStructureCard>
  );
};

const StyledStructureCard = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: #3d3d3d;
  transition: all 0.3s;
  border: 1px solid transparent;
  cursor: pointer;
  position: relative;
  &:hover {
    border: 1px solid #fff;
  }
`;
