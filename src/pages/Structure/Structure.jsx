import styled from "styled-components";
import { Header } from "./Header/Header";
import { useEffect, useState } from "react";
import { MobileHeader } from "./Header/StructureCard/MobileHeader";
import { Empty } from "./Empty";
import { WorkerModal } from "./WorkerModal";
import {
  useGetCompanyStructureLevelQuery,
  useGetRecurseStructureQuery,
  useLazyGetNotStructureWorkersQuery,
  useLazyGetWorkerCountQuery,
} from "../../store/structure/structure.api";
import { StructureCard } from "./Header/StructureCard/StructureCard";
import { useAppSelect } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";

const Structure = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelect((state) => state.auth);
  const [infoOpen, setInfoOpen] = useState(false);
  const [level, setLevel] = useState(1);
  const { data: currentLevel } = useGetCompanyStructureLevelQuery();
  const { data: recurseData, refetch } = useGetRecurseStructureQuery();
  const [parents, setParents] = useState([]);
  const [showNotStructureWorkers, setShowNotStructureWorkers] = useState(false);
  const [getNotStructureWorkers, { data }] =
    useLazyGetNotStructureWorkersQuery();
  const [getWorkerCount] = useLazyGetWorkerCountQuery();
  const { saveStructureWorkersCount } = useActions();
  const [levelWorkers, setLevelWorkers] = useState([]);
  const [currentWorkerLevel, setCurrentWorkerLevel] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetWorkerCount = () =>
    getWorkerCount().then((resp) =>
      saveStructureWorkersCount(resp?.data?.count ?? "-")
    );

  useEffect(() => {
    if (showNotStructureWorkers) {
      setLoading(true);
      getNotStructureWorkers();
    }
    if (showNotStructureWorkers) {
      navigate(`/structure?level=notStructure`);
    }
    // eslint-disable-next-line
  }, [showNotStructureWorkers]);

  useEffect(() => {
    if (data) {
      Object.entries(data)?.filter((w) => w[0] !== "error")?.length === 0 &&
        setLoading(false);
    }
  }, [data]);

  const handleNextLevel = (children, id) => {
    setCurrentWorkerLevel(id);
    if (level < currentLevel && !infoOpen) {
      const newLevel = 1 + level;
      setLevel(newLevel);
      navigate(`/structure?level=${newLevel}&id=${id}`);
      if (newLevel > user?.struct_level + 1) {
        const childrens =
          Object.entries(children)
            ?.find((c) => c[0] === `struct_level_${newLevel}`)[1]
            .map((w) => w?.id_user) ?? [];

        const updatedParents = [...parents];
        updatedParents[newLevel] = childrens;
        setParents(updatedParents);
        localStorage.setItem("structParent", JSON.stringify(updatedParents));
      }
    }
  };

  const handleGetLevelWorkers = (lvl) => {
    if (!recurseData) {
      return [];
    }

    return recurseData[`struct_level_${lvl ?? level}`] ?? [];
  };

  useEffect(() => {
    setLevel(user?.struct_level);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (recurseData) {
      handleGetWorkerCount();
    }
    // eslint-disable-next-line
  }, [recurseData]);

  const handleRefetchStructureData = () => {
    setLevel(1);
    refetch();
  };

  useEffect(() => {
    setLevelWorkers(
      !recurseData ? [] : recurseData[`struct_level_${level}`] ?? []
    );
  }, [recurseData, level]);

  const handleCreatedUser = (parentId) => {
    refetch().then((resp) => {
      if (parentId === currentWorkerLevel && resp?.data) {
        const parent = resp?.data[`struct_level_${level - 1}`]?.find(
          ({ id_user }) => id_user === currentWorkerLevel
        );
        const children = parent?.structure_worker;

        if (children && level > user?.struct_level + 1) {
          const childrens =
            Object.entries(children)
              ?.find((c) => c[0] === `struct_level_${level}`)[1]
              .map((w) => w?.id_user) ?? [];

          const updatedParents = [...parents];
          updatedParents[level] = childrens;
          setParents(updatedParents);
          localStorage.setItem("structParent", JSON.stringify(updatedParents));
        }
      }
    });
  };

  useEffect(() => {
    if (search?.length === 0) {
      setLevel(user?.struct_level);
      setShowNotStructureWorkers(false);
    }
    // eslint-disable-next-line
  }, [search]);

  const handleClickChangeLevel = (lvl) => {
    setLevel(lvl);
  };

  useEffect(() => {
    if (search?.length > 0) {
      const level = search
        ?.split("&")
        ?.find((p) => p.includes("?level="))
        ?.split("=")?.[1];
      if (level) {
        setLevel(Number(level));
        let prevParents = [];

        try {
          prevParents = JSON.parse(localStorage.getItem("structParent"));
        } catch {
          prevParents = [];
        }

        setParents(prevParents);
      }
    }
  }, []);

  console.log(parents);
  return (
    <StyledStructure className="hide-scroll">
      <Header
        level={level}
        onChangeLevel={(lvl) =>
          infoOpen
            ? null
            : lvl >= user?.struct_level
            ? handleClickChangeLevel(lvl)
            : null
        }
        onRefetchData={refetch}
        showNotStructureWorkers={showNotStructureWorkers}
        onToggleShowNotStructureWorkers={() =>
          setShowNotStructureWorkers(!showNotStructureWorkers)
        }
        currentLevel={currentLevel}
        onRefetchStructureData={handleRefetchStructureData}
        onCreatedUser={handleCreatedUser}
      />
      <MobileHeader
        showNotStructureWorkers={showNotStructureWorkers}
        onToggleShowNotStructureWorkers={() =>
          setShowNotStructureWorkers(!showNotStructureWorkers)
        }
      />
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
          worker={infoOpen !== user?.id}
          noStructure={showNotStructureWorkers}
        />
      )}
      <div className="structure-content ">
        <div className="structure-cards ">
          {loading ? (
            <div className="structure-loader">
              <Loader white className="loader-wrap" />
            </div>
          ) : null}
          {showNotStructureWorkers && data && Object.entries(data) ? (
            <>
              {Object.entries(data)?.filter((w) => w[0] !== "error")?.length >
              0 ? (
                Object.entries(data)
                  ?.filter((w) => w[0] !== "error")
                  ?.map((w) => w[1])
                  ?.map((worker, i) => (
                    <StructureCard
                      key={worker?.id_user}
                      onOpenInfo={() =>
                        user?.is_director ? setInfoOpen(worker?.id_user) : null
                      }
                      onNextLevel={() =>
                        handleNextLevel(worker?.structure_worker)
                      }
                      id={worker?.id_user}
                      data={worker}
                      isMore={false}
                      onLoad={() =>
                        i + 1 ===
                        Object.entries(data)
                          ?.filter((w) => w[0] !== "error")
                          ?.map((w) => w[1])?.length
                          ? setLoading(false)
                          : null
                      }
                    />
                  ))
              ) : (
                <Empty noSubtitle className="no-structure-empty" />
              )}
            </>
          ) : level === user?.struct_level ? (
            <StructureCard
              onOpenInfo={() =>
                user?.is_director ? setInfoOpen(user?.id) : null
              }
              onNextLevel={() => handleNextLevel(null, user?.id)}
              id={user?.id}
              data={{
                ...user,
                phone: JSON.stringify(user?.phones),
                name: `${user?.first_name ?? ""} ${user?.last_name ?? ""}`,
                id_user: user?.id,
                struct_level: user?.struct_level,
                isCurrentUser: true,
                structure_worker: recurseData
                  ? Object.fromEntries(
                      Object.entries(recurseData)?.filter(
                        (w) => w[0] !== "error"
                      )
                    ) ?? {}
                  : {},
              }}
              isMore={handleGetLevelWorkers(1 + user?.struct_level)?.length > 0}
              user={true}
            />
          ) : handleGetLevelWorkers()?.length === 0 ? (
            <Empty white />
          ) : (
            levelWorkers
              ?.filter((w) =>
                level > user?.struct_level + 1
                  ? !!parents[level]?.find((p) => p === w?.id_user)
                  : true
              )
              .map((worker, i) => (
                <StructureCard
                  key={worker?.id_user}
                  onOpenInfo={() =>
                    user?.is_director ? setInfoOpen(worker?.id_user) : null
                  }
                  onNextLevel={() =>
                    handleNextLevel(worker?.structure_worker, worker?.id_user)
                  }
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
  background: var(--dark-card-bg);
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
    position: relative;
  }
  .no-structure-empty {
    margin-top: 40px;
  }
  .loader-wrap {
    height: 50px;
    margin: 40px 0;
  }
  .structure-loader {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10000;
    background: var(--dark-card-bg);
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
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

export default Structure;
