import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../../../../assets/images/plus.svg";
import { ReactComponent as ArrowDownIcon } from "../../../../../assets/images/arrow-down.svg";
import { Dropdown } from "./Dropdown/Dropdown";
import { useEffect } from "react";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../../../../store/structure/structure.api";

export const RoleSelect = ({ value, onChange, rolesOnlyView }) => {
  const [open, setOpen] = useState(false);
  const COLORS = ["#7ecefd", "#b1ff91", "#d0a0ff", "#7ecefd"];
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
    }
  }, [level, levels]);

  const handleToggleOpen = () => {
    const filteredRoles = roles
      .filter((role) => role?.level !== value)
      .filter((role) => role?.level !== 1);

    if (filteredRoles?.length > 0 && value !== 1 && !rolesOnlyView) {
      setOpen(!open);
    }
  };

  if (!level) {
    return null;
  }

  return (
    <StyledRoleSelect
      active={roles?.find((role) => role?.level === value)}
      onClick={handleToggleOpen}
      open={open}
    >
      <div className="title">
        {value && roles?.find((r) => r.level === value)
          ? roles?.find((r) => r.level === value)?.title
          : open
          ? "Оберіть роль"
          : "Немає ролі"}
      </div>
      {!rolesOnlyView && (
        <button className="select-btn flex items-center justify-center">
          <PlusIcon className="plus-icon-btn" />
          {value !== 1 && <ArrowDownIcon className="arrow" />}
        </button>
      )}
      {open && !rolesOnlyView && (
        <Dropdown
          roles={roles
            .filter((role) => role?.level !== value)
            .filter((role) => role?.level !== 1)}
          onChangeActiveRole={(value) => onChange(value)}
          isValue={value && roles?.find((r) => r.level === value)}
        />
      )}
    </StyledRoleSelect>
  );
};

const StyledRoleSelect = styled.div`
  padding: ${({ active }) => (active ? " 2px 4px 2px 2px" : "2px")};
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 3px;
  background: ${({ active }) => active?.bg ?? "rgba(255, 255, 255, 0.30)"};
  border-radius: ${({ open }) => (open ? "6px 6px 0 0" : "6px")};
  height: 22px;
  align-items: center;
  position: relative;
  transition: all 0.3s;
  max-width: 121px;
  .title {
    color: ${({ active }) => active?.color ?? "#fff"};
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: 200;
    line-height: 1; /* 12.98px */
    letter-spacing: 0.22px;
    text-transform: uppercase;
    padding: 4px 6px;
    text-align: center;
    height: 16px;
    width: 90px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    ${({ active, open }) =>
      !active &&
      !open &&
      `
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.30);
    `}
  }
  .select-btn {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    padding: 1px;
  }
  &:hover {
    .select-btn g {
      opacity: 1;
    }
  }

  .plus-icon-btn {
    display: ${({ active }) => (active ? "none" : "block")};
  }
  .arrow {
    display: ${({ active }) => (active ? "block" : "none")};
    transition: all 0.3s;
    transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
    path {
      fill: ${({ active }) => active?.color ?? "#fff"};
    }
  }

  ${({ open }) =>
    open &&
    `
    .arrow {
        display: block !important;
    }
    .select-btn g {
      opacity: 1;
    }
    .plus-icon-btn{
        display: none;
    }
  `}
`;
