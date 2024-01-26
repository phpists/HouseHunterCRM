import { styled } from "styled-components";
import { StructureCard } from "./StructureCard";
import { Divider } from "../Divider";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../../../../../store/structure/structure.api";

export const Structure = ({ data }) => {
  const { data: level, refetch } = useGetCompanyStructureLevelQuery();
  const { data: levels } = useGetAllPerimissionsLevelsQuery();

  const handleGetCurrentLevel = () => {
    if (levels) {
      const currentLevel = Object.entries(levels)
        ?.map((l) => l[1])
        ?.find((l) => Number(l.level) === Number(level));
      const roles = currentLevel[0] ? currentLevel[0]?.split(" - ") : [];
      return roles ? ["", ...roles] : [];
    } else {
      return [];
    }
  };

  return (
    <StyledStructure>
      {data && Object.entries(data)?.length > 0
        ? Object.entries(data)?.map((workers, i) => (
            <>
              <StructureCard
                key={i}
                count={workers[1]?.length}
                levelTitle={handleGetCurrentLevel()[workers[0]?.split("_")[2]]}
                photos={workers[1]?.map((e) => e.photo)}
                level={workers[0]?.split("_")[2]}
              />
              {Object.entries(data)?.length - 1 > i && <Divider />}
            </>
          ))
        : null}
    </StyledStructure>
  );
};

const StyledStructure = styled.div``;
