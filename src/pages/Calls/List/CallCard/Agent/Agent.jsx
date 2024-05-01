import styled from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Tag } from "./Tag";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../../../../store/structure/structure.api";
import { useEffect, useState } from "react";

export const Agent = ({ name, photo, workerLevel }) => {
  const COLORS = ["#7ecefd", "var(--green-light)", "#d0a0ff", "#7ecefd"];
  const { data: level } = useGetCompanyStructureLevelQuery();
  const { data: levels } = useGetAllPerimissionsLevelsQuery();
  const [roles, setRoles] = useState([]);

  const handleGetCurrentLevel = () =>
    levels
      ? Object.entries(levels)
          ?.map((l) => l[1])
          ?.find((l) => Number(l.level) === Number(level))
      : [];

  const handleFormatLevelRoles = () => {
    if (handleGetCurrentLevel()) {
      const levelRoles = handleGetCurrentLevel()["0"];
      if (levelRoles) {
        return levelRoles?.split(" - ")?.map((role, i) => ({
          title: role,
          color: `${COLORS[i]}`,
          bg: `${COLORS[i]}17`,
          level: 1 + i,
        }));
      } else {
        return [];
      }
    }
  };

  useEffect(() => {
    if (level && levels) {
      const formatedRoles = handleFormatLevelRoles();
      setRoles(formatedRoles);
    } // eslint-disable-next-line
  }, [level, levels]);

  return (
    <StyledAgent className="flex items-center clickable">
      <Avatar
        photo={photo}
        level={roles?.find((r) => r.level === workerLevel)}
      />
      <div className="clickable">
        <Name name={name} />
        <Tag level={roles?.find((r) => r.level === workerLevel)} />
      </div>
    </StyledAgent>
  );
};

const StyledAgent = styled.div`
  padding: 8px 10px;
  border-radius: 9px;
  background: var(--card-bg-2);
  width: 185px;
  height: 60px;
  @media (max-width: 1399.9px) {
    width: 100%;
  }
`;
