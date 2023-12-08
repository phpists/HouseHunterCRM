import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Tag } from "./Tag";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../../../../../store/structure/structure.api";

export const BossCard = ({ data }) => {
  const COLORS = ["#7ecefd", "#b1ff91", "#d0a0ff", "#7ecefd"];
  const { data: levels } = useGetAllPerimissionsLevelsQuery();
  const { data: level, refetch } = useGetCompanyStructureLevelQuery();

  const handleGetCurrentLevel = () =>
    levels
      ? Object.entries(levels)
          ?.map((l) => l[1])
          ?.find((l) => Number(l.level) === Number(level)) ?? []
      : [];

  return (
    <StyledBossCard className="flex items-center">
      <Avatar
        photo={data?.photo_parent}
        color={COLORS[data?.structure_level - 2]}
      />
      <div>
        <Name name={data?.name_parent ?? "-"} />
        <Tag
          color={COLORS[data?.structure_level - 2]}
          role={
            handleGetCurrentLevel()[0]?.split(" - ")[data?.structure_level - 2]
          }
        />
      </div>
    </StyledBossCard>
  );
};

const StyledBossCard = styled.div`
  padding: 8px 10px;
`;
