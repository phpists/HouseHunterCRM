import styled from "styled-components";
import { Avatar } from "./Avatar";
import { LastTime } from "./LastTime";
import { Name } from "./Name";
import { Id } from "./Id";
import { Tag } from "./Tag";
import { Date } from "./Date";
import { Divider } from "../Divider";
import { useGetAllPerimissionsLevelsQuery } from "../../../../../../store/structure/structure.api";

export const Header = ({ onOpenInfo, data }) => {
  const COLORS = ["#7ecefd", "#b1ff91", "#d0a0ff", "#7ecefd"];
  const { data: levels } = useGetAllPerimissionsLevelsQuery();

  const handleGetCurrentLevel = () =>
    levels
      ? Object.entries(levels)
          ?.map((l) => l[1])
          ?.find((l) => Number(l.level) === Number(data?.structure_level))
      : [];

  return (
    <StyledHeader className="flex items-center notClickable">
      <Avatar
        onOpenInfo={onOpenInfo}
        color={COLORS[handleGetCurrentLevel()?.level ?? "1"]}
      />
      <div>
        <LastTime date={data?.last_active} />
        <div
          className="flex items-baseline main-text notClickable"
          onClick={onOpenInfo}
        >
          <Name name={data?.name ?? ""} />
          <Id id={data?.id_user} />
        </div>
        <Tag
          color={COLORS[handleGetCurrentLevel()?.level ?? "1"]}
          role={handleGetCurrentLevel()[0] ?? "-"}
        />
        <Date date={data?.dt_reg} />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin: 0 0 0 -32px;
  position: relative;
  z-index: 2;
  .main-text {
    margin-bottom: 2px;
  }
`;
