import React from "react";
import styled from "styled-components";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../../../store/structure/structure.api";
import { BackButton } from "../../../../components/BackButton";

export const Breadcrumbs = ({
  level,
  onChangeLevel,
  showNotStructureWorkers,
  onToggleShowNotStructureWorkers,
}) => {
  const { data: companyLevel, refetch } = useGetCompanyStructureLevelQuery();
  const { data: levels } = useGetAllPerimissionsLevelsQuery();

  const handleGetCurrentLevel = () =>
    levels
      ? Object.entries(levels)
          ?.map((l) => l[1])
          ?.find((l) => Number(l.level) === Number(companyLevel))
      : [];

  const handleGetPath = () =>
    !handleGetCurrentLevel()
      ? []
      : handleGetCurrentLevel()["0"]
      ? handleGetCurrentLevel()["0"]?.split(" - ")
      : [];

  return (
    <StyledBreadcrumbs className="flex items-center" isSmall={level >= 3}>
      {showNotStructureWorkers ? (
        <div className="flex items-center">
          <BackButton onClick={onToggleShowNotStructureWorkers} />
          <div className="title active">Незакріплені працівники</div>
        </div>
      ) : (
        handleGetPath()
          .slice(0, level)
          .map((title, i) => (
            <React.Fragment>
              <div
                className={`title ${
                  i === handleGetPath()?.slice(0, level).length - 1 && "active"
                }`}
                onClick={() => onChangeLevel(1 + i)}
              >
                {title}
              </div>
              {i < handleGetPath()?.slice(0, level).length - 1 && (
                <div className="divider">/</div>
              )}
            </React.Fragment>
          ))
      )}
    </StyledBreadcrumbs>
  );
};

const StyledBreadcrumbs = styled.div`
  font-size: ${({ isSmall }) => (isSmall ? 14 : 18)}px;
  .title {
    color: var(--second-color);
    font-family: Overpass;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: normal;
    letter-spacing: 0.36px;
    font-size: 18px;

    cursor: pointer;
    &.active {
      color: var(--dark-90);
      font-family: Overpass;
    }
  }
  .divider {
    color: var(--second-color);
    font-family: Overpass;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.36px;
    margin: 0 4px;
  }
`;
