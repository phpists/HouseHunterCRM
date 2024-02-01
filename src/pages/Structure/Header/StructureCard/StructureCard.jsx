import styled from "styled-components";
import { useEffect, useState } from "react";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent/MobileContent";
import { useLazyGetStatisticWorkerQuery } from "../../../../store/structure/structure.api";

export const StructureCard = ({
  onOpenInfo,
  onNextLevel,
  id,
  data,
  isMore,
  user,
}) => {
  const [getWorkerStatistic, { data: statisticData }] =
    useLazyGetStatisticWorkerQuery();
  const [totalInfoOpened, settotalInfoOpened] = useState(false);

  useEffect(() => {
    getWorkerStatistic(id);
  }, [id]);

  useEffect(() => {
    getWorkerStatistic(id);
  }, []);

  return (
    <StyledStructureCard>
      <DesktopContent
        onOpenInfo={onOpenInfo}
        totalInfoOpened={totalInfoOpened}
        onToggleOpen={() => settotalInfoOpened(!totalInfoOpened)}
        data={data}
        statisticData={statisticData}
        onNextLevel={onNextLevel}
        isMore={isMore}
        user={user}
      />
      <MobileContent
        onOpenInfo={onOpenInfo}
        totalInfoOpened={totalInfoOpened}
        onToggleOpen={() => settotalInfoOpened(!totalInfoOpened)}
        data={data}
        statisticData={statisticData}
        onNextLevel={onNextLevel}
        isMore={isMore}
        user={user}
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
  /* &:hover {
    border: 1px solid #fff;
  } */
`;
