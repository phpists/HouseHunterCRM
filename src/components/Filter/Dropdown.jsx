import { styled } from "styled-components";
import { Toggle } from "../Toggle";
import { useEffect, useState } from "react";
import { Option } from "../Option";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../store/structure/structure.api";

export const Dropdown = ({ open, filter, onFilterChange }) => {
  const { data: levels } = useGetAllPerimissionsLevelsQuery();
  const [roles, setRoles] = useState([]);
  const { data: level } = useGetCompanyStructureLevelQuery();

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
        return levelRoles?.split(" - ");
      } else {
        return [];
      }
    }
  };

  useEffect(() => {
    if (level && levels) {
      const formatedRoles = handleFormatLevelRoles();
      setRoles(formatedRoles);
    }
  }, [level, levels]);

  return (
    <StyledDropdown open={open} className="companyFilterDropdown">
      <div
        className="flex items-center justify-between toggle-wrapper"
        onClick={() => onFilterChange("active", !filter?.active)}
      >
        <span>Вхід дозволено</span>
        <Toggle
          value={filter?.active}
          className={filter?.active ? "toggle--active " : "toggle"}
        />
      </div>
      <div
        className="flex items-center justify-between toggle-wrapper"
        onClick={() => onFilterChange("billing", !filter?.billing)}
      >
        <span>Доступ оплачено</span>
        <Toggle
          value={filter?.billing}
          className={filter?.billing ? "toggle--active " : "toggle"}
        />
      </div>
      {roles?.map((role, i) => (
        <Option
          key={i}
          title={role}
          active={
            filter?.roles?.find((r) => r === i.toString()) ? "true" : "false"
          }
          onSelect={() =>
            onFilterChange(
              "roles",
              filter.roles?.find((r) => r === i.toString())
                ? filter.roles?.filter((r) => r !== i.toString())
                : [...filter.roles, i.toString()]
            )
          }
          className="company-roles-option"
        />
      ))}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
  border-radius: 8px;
  background: var(--company-filter-dropdown-bg);
  backdrop-filter: blur(18.5px);
  color: var(--main-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  z-index: 56;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  div {
  }
  .toggle-wrapper {
    padding: 6px 6px 7px 11px;
    border-bottom: 1px solid var(--bg-10);
  }
  .toggle {
    background: var(--dark-card-bg);
  }
  .toggle--active {
    background: #35c511;
  }
  .last-option {
    border: none;
  }
  ${({ open }) =>
    open &&
    `
    opacity: 1;
    visibility: visible;
  `}
`;
