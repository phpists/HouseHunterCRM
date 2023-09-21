import styled from "styled-components";
import { ProfilleInfo } from "./ProfilleInfo/ProfilleInfo";
import { Biling } from "./Biling/Biling";
import { Statistic } from "./Statistic/Statistic";
import { TotalInfo } from "./TotalInfo/TotalInfo";
import { Arrow } from "./Arrow";
import { useState } from "react";

export const StructureCard = ({ onOpenInfo, onNextLevel }) => {
  const [totalInfoOpened, settotalInfoOpened] = useState(false);

  const handleNextLevel = (e) =>
    !e.target.classList.contains("notClickable") && onNextLevel();

  return (
    <StyledStructureCard onClick={handleNextLevel}>
      <ProfilleInfo onOpenInfo={onOpenInfo} />
      <Biling open={!totalInfoOpened} />
      <Statistic />
      <TotalInfo
        open={totalInfoOpened}
        onToggleOpen={() => settotalInfoOpened(!totalInfoOpened)}
      />
      <Arrow />
    </StyledStructureCard>
  );
};

const StyledStructureCard = styled.div`
  padding: 10px;
  border-radius: 10px;
  background: #3d3d3d;
  display: grid;
  grid-template-columns: repeat(5, max-content);
  transition: all 0.3s;
  border: 1px solid transparent;
  grid-template-rows: 224px;
  cursor: pointer;
  &:hover {
    border: 1px solid #fff;
  }
`;
