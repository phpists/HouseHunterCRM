import styled from "styled-components";
import { Avatar } from "./Avatar";
import { LastTime } from "./LastTime";
import { Name } from "./Name";
import { Id } from "./Id";
import { Tag } from "./Tag";
import { Date } from "./Date";
import { Divider } from "../Divider";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../../../../../store/structure/structure.api";
import { handleFormatDate } from "../../../../../../utilits";

export const Header = ({ onOpenInfo, data }) => {
  const COLORS = ["#7ecefd", "var(--green-light)", "#d0a0ff", "#7ecefd"];
  const { data: levels } = useGetAllPerimissionsLevelsQuery();
  const { data: level, refetch } = useGetCompanyStructureLevelQuery();

  const handleGetCurrentLevel = () =>
    levels
      ? Object.entries(levels)
          ?.map((l) => l[1])
          ?.find((l) => Number(l.level) === Number(level)) ?? []
      : [];

  return (
    <StyledHeader className="flex items-center notClickable">
      <Avatar
        onOpenInfo={onOpenInfo}
        color={COLORS[handleGetCurrentLevel()?.level ?? "1"]}
        level={data?.structure_level ?? data?.struct_level}
        photo={data?.photo}
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
          color={COLORS[(data?.structure_level ?? data?.struct_level) - 1]}
          role={
            handleGetCurrentLevel()[0]?.split(" - ")[
              (data?.structure_level ?? data?.struct_level) - 1
            ] ??
            `${
              data?.name_permision?.length > 0
                ? data?.name_permision
                : "Без ролі"
            }`
          }
        />
        <Date
          date={
            isNaN(data?.dt_reg)
              ? data?.dt_reg
              : handleFormatDate(Number(data?.dt_reg) * 1000, true)
          }
        />
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
