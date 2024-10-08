import { styled } from "styled-components";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../store/structure/structure.api";
import { useEffect, useState } from "react";

export const Status = ({ status, className }) => {
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
          bg: `${COLORS[i]}40`,
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
    <StyledStatus
      status={roles?.find((r) => r.level === status)}
      className={`flex items-center justify-center ${className}`}
    >
      {roles?.find((r) => r.level === status)
        ? roles?.find((r) => r.level === status)?.title
        : "Без ролі"}
    </StyledStatus>
  );
};

const StyledStatus = styled.div`
  height: 18px;
  padding: 4px 4px 1px;
  color: ${({ status }) => status?.color};
  background: ${({ status }) => status?.bg ?? "#FFFFFF1A"};
  text-align: center;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 118%; /* 12.98px */
  letter-spacing: 0.22px;
  text-transform: uppercase;
  border-radius: 5px;
  margin-right: 9px;
`;
