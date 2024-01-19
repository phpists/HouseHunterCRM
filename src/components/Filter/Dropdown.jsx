import { styled } from "styled-components";
import { Toggle } from "../Toggle";
import { useEffect, useState } from "react";
import { Option } from "../Option";
import { useGetAllPerimissionsLevelsQuery } from "../../store/structure/structure.api";

export const Dropdown = ({ open, filter, onFilterChange }) => {
  const { data: levels } = useGetAllPerimissionsLevelsQuery();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (levels) {
      setRoles(
        Object.entries(levels)[Object.entries(levels)?.length - 1][1][0]?.split(
          " - "
        ) ?? []
      );
    }
  }, [levels]);

  return (
    <StyledDropdown open={open}>
      <div className="flex items-center justify-between toggle-wrapper">
        <span>Вхід дозволено</span>
        <Toggle
          value={filter?.active}
          onChange={() => onFilterChange("active", !filter?.active)}
          className={filter?.active ? "toggle--active " : "toggle"}
        />
      </div>
      <div className="flex items-center justify-between toggle-wrapper">
        <span>Доступ оплачено</span>
        <Toggle
          value={filter?.billing}
          onChange={() => onFilterChange("billing", !filter?.billing)}
          className={filter?.billing ? "toggle--active " : "toggle"}
        />
      </div>
      {roles?.map((role, i) => (
        <Option
          key={i}
          title={role}
          active={filter?.roles?.find((r) => r === i.toString())}
          onSelect={() =>
            onFilterChange(
              "roles",
              filter.roles?.find((r) => r === i.toString())
                ? filter.roles?.filter((r) => r !== i.toString())
                : [...filter.roles, i.toString()]
            )
          }
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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18.5px);
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .toggle {
    background: #323232;
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
