import styled from "styled-components";
import { Header } from "./Header/Header";
import { useState } from "react";
import { MobileHeader } from "./Header/StructureCard/MobileHeader";
import { Empty } from "./Empty";
import { WorkerModal } from "./WorkerModal";
import {
  useGetCompanyStructureLevelQuery,
  useGetStructureWorkersQuery,
} from "../../store/structure/structure.api";
import { StructureCard } from "./Header/StructureCard/StructureCard";

export const Structure = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [level, setLevel] = useState(1);
  const { data, refetch } = useGetStructureWorkersQuery();
  const { data: currentLevel } = useGetCompanyStructureLevelQuery();

  const handleNextLevel = () => {
    if (level < currentLevel && !infoOpen) {
      setLevel(1 + level);
    }
  };

  data &&
    console.log(
      Object.entries(data)
        ?.filter((l) => Number(l[0]) === level)
        .map((l) => l[1][0])
    );

  const handleGetLevelWorkers = () => {
    if (!data) {
      return [];
    }

    return Object.entries(data)
      ?.filter((l) => Number(l[0]) === level)
      .map((l) => l[1][0]);
  };

  return (
    <StyledStructure className="hide-scroll">
      <Header
        level={level}
        onChangeLevel={(lvl) => (infoOpen ? null : setLevel(lvl))}
        onRefetchData={refetch}
      />
      <MobileHeader />
      {infoOpen && (
        <WorkerModal
          onClose={() => setInfoOpen(false)}
          workerId={infoOpen}
          level={level}
          onRefetchData={refetch}
        />
      )}
      <div className="structure-content hide-scroll">
        <div className="structure-cards hide-scroll">
          {handleGetLevelWorkers()?.length === 0 ? (
            <Empty />
          ) : (
            handleGetLevelWorkers().map((worker, i) => (
              <StructureCard
                key={i}
                onOpenInfo={() => setInfoOpen(worker?.id_user)}
                onNextLevel={handleNextLevel}
                id={worker?.id_user}
                data={worker}
              />
            ))
          )}
        </div>
      </div>
    </StyledStructure>
  );
};

const StyledStructure = styled.div`
  padding: 15px 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  position: relative;
  .structure-content {
    height: calc(100svh - 232px);
    overflow: auto;
  }
  .structure-cards {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: 20px;
  }
  @media (max-width: 850px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
    .structure-content {
      height: calc(100svh - 202px);
    }
  }
`;
