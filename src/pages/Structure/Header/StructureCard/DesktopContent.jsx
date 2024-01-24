import styled from "styled-components";
import { ProfilleInfo } from "./ProfilleInfo/ProfilleInfo";
import { Biling } from "./Biling/Biling";
import { Statistic } from "./Statistic/Statistic";
import { TotalInfo } from "./TotalInfo/TotalInfo";
import { Arrow } from "./Arrow";

export const DesktopContent = ({
  onOpenInfo,
  totalInfoOpened,
  onToggleOpen,
  data,
  statisticData,
  onNextLevel,
  isMore,
}) => (
  <StyledDesktopContent>
    <ProfilleInfo onOpenInfo={onOpenInfo} data={data} />
    <Biling open={!totalInfoOpened} data={data} />
    <Statistic statisticData={statisticData} />
    <TotalInfo
      open={totalInfoOpened}
      onToggleOpen={onToggleOpen}
      id={data?.id}
    />
    {isMore ? <Arrow onClick={onNextLevel} /> : null}
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, max-content);
  grid-template-rows: 224px;
  @media (max-width: 1399.9px) {
    display: none;
  }
`;
