import styled from "styled-components";
import { Header } from "./Header/Header";
import { useEffect, useState } from "react";
import { MobileHeader } from "./Header/StructureCard/MobileHeader";
import { Empty } from "./Empty";
import { WorkerModal } from "./WorkerModal";
import {
  useGetCompanyStructureLevelQuery,
  useGetRecurseStructureQuery,
  useGetStructureWorkersQuery,
  useLazyGetNotStructureWorkersQuery,
} from "../../store/structure/structure.api";
import { StructureCard } from "./Header/StructureCard/StructureCard";
import { useAppSelect } from "../../hooks/redux";
import { useGetAccessQuery } from "../../store/auth/auth.api";

export const Structure = () => {
  const { user } = useAppSelect((state) => state.auth);
  const [infoOpen, setInfoOpen] = useState(false);
  const [level, setLevel] = useState(1);
  const { data: currentLevel } = useGetCompanyStructureLevelQuery();
  const { data: recurseData, refetch } = useGetRecurseStructureQuery();
  const [parents, setParents] = useState([]);
  const [showNotStructureWorkers, setShowNotStructureWorkers] = useState(false);
  const [
    getNotStructureWorkers,
    { data, refetch: refetchNotStructureWorkers },
  ] = useLazyGetNotStructureWorkersQuery();
  const { data: accessData } = useGetAccessQuery();

  useEffect(() => {
    showNotStructureWorkers && getNotStructureWorkers();
  }, [showNotStructureWorkers]);

  const handleNextLevel = (children) => {
    if (level < currentLevel && !infoOpen) {
      const newLevel = 1 + level;
      setLevel(newLevel);
      if (newLevel > 2) {
        const childrens =
          Object.entries(children)
            ?.find((c) => c[0] === `struct_level_${newLevel}`)[1]
            .map((w) => w?.id_user) ?? [];

        const updatedParents = [...parents];
        updatedParents[newLevel] = childrens;
        setParents(updatedParents);
      }
    }
  };

  const handleGetLevelWorkers = () => {
    if (!recurseData) {
      return [];
    }

    return recurseData[`struct_level_${level}`] ?? [];
  };

  return (
    <StyledStructure className="hide-scroll">
      <Header
        level={level}
        onChangeLevel={(lvl) => (infoOpen ? null : setLevel(lvl))}
        onRefetchData={refetch}
        showNotStructureWorkers={showNotStructureWorkers}
        onToggleShowNotStructureWorkers={() =>
          setShowNotStructureWorkers(!showNotStructureWorkers)
        }
      />
      <MobileHeader />
      {infoOpen && (
        <WorkerModal
          onClose={() => setInfoOpen(false)}
          workerId={infoOpen}
          level={level}
          onRefetchData={() => {
            refetch();
            showNotStructureWorkers && getNotStructureWorkers();
          }}
          showNotStructureWorkers={showNotStructureWorkers}
        />
      )}
      <div className="structure-content hide-scroll">
        <div className="structure-cards hide-scroll">
          {showNotStructureWorkers && data && Object.entries(data) ? (
            Object.entries(data)
              ?.filter((w) => w[0] !== "error")
              ?.map((w) => w[1])
              ?.map((worker, i) => (
                <StructureCard
                  key={i}
                  onOpenInfo={() => setInfoOpen(worker?.id_user)}
                  onNextLevel={() => handleNextLevel(worker?.structure_worker)}
                  id={worker?.id_user}
                  data={worker}
                  isMore={false}
                />
              ))
          ) : level === 1 ? (
            <StructureCard
              onOpenInfo={() => setInfoOpen(user?.id)}
              onNextLevel={handleNextLevel}
              id={user?.id}
              data={{
                ...user,
                phone: JSON.stringify(user?.phones),
                name: `${user?.first_name ?? ""} ${user?.last_name ?? ""}`,
                id_user: user?.id,
              }}
              isMore
            />
          ) : handleGetLevelWorkers()?.length === 0 ? (
            <Empty />
          ) : (
            handleGetLevelWorkers()
              ?.filter((w) =>
                level > 2
                  ? !!parents[level]?.find((p) => p === w?.id_user)
                  : true
              )
              .map((worker, i) => (
                <StructureCard
                  key={i}
                  onOpenInfo={() => setInfoOpen(worker?.id_user)}
                  onNextLevel={() => handleNextLevel(worker?.structure_worker)}
                  id={worker?.id_user}
                  data={worker}
                  isMore={Object.entries(worker?.structure_worker)?.length > 0}
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
