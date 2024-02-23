import styled from "styled-components";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../../../../../store/structure/structure.api";

export const Tag = ({ level }) => {
  const COLORS = ["#7ecefd", "#b1ff91", "#d0a0ff", "#7ecefd"];
  const { data: levels } = useGetAllPerimissionsLevelsQuery();
  const { data: companyLevel, refetch } = useGetCompanyStructureLevelQuery();

  const handleGetCurrentLevel = () =>
    levels
      ? Object.entries(levels)
          ?.map((l) => l[1])
          ?.find((l) => Number(l.level) === Number(companyLevel)) ?? []
      : [];

  return (
    <StyledTag className="notClickable" color={COLORS[level - 1]}>
      {handleGetCurrentLevel()[0]?.split(" - ")?.[level - 1] ?? "Без ролі"}
    </StyledTag>
  );
};

const StyledTag = styled.div`
  padding: 6px 6px 4px;
  border-radius: 4px;
  background: ${({ color }) => (color ? `${color}40` : "#FFFFFF1A")};
  color: ${({ color }) => color ?? "#FFFFFFCC"};
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 100;
  line-height: 1; /* 12.98px */
  letter-spacing: 0.22px;
  margin: 2px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 170px;
  width: max-content;
`;
