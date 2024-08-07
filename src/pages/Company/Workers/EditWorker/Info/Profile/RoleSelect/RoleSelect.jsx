import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../../../../../../assets/images/plus.svg";
import { ReactComponent as ArrowDownIcon } from "../../../../../../../assets/images/arrow-down.svg";
import { Dropdown } from "./Dropdown/Dropdown";

const ROLES = [
  {
    title: "Керівник",
    color: "#7ECEFD",
    bg: "rgba(126, 206, 253, 0.25)",
  },
  {
    title: "Структурний",
    color: "#D0A0FF",
    bg: "rgba(208, 160, 255, 0.25)",
  },
  {
    title: "Регіональний",
    color: "#59D8E6",
    bg: "rgba(89, 216, 230, 0.25)",
  },
  {
    title: "Агент",
    color: "var(--green-light)",
    bg: "rgba(177, 255, 145, 0.25)",
  },
];

export const RoleSelect = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(ROLES[0]);

  return (
    <StyledRoleSelect
      active={active}
      onClick={() => setOpen(!open)}
      open={open}
    >
      <div className="title">
        {active?.title ? active?.title : open ? "Оберіть роль" : "Немає ролі"}
      </div>
      <button className="select-btn flex items-center justify-center">
        <PlusIcon className="plus-icon-btn" />
        <ArrowDownIcon className="arrow" />
      </button>
      {open && (
        <Dropdown
          roles={ROLES.filter((role) => role?.title !== active?.title)}
          onChangeActiveRole={(value) => setActive(value)}
        />
      )}
    </StyledRoleSelect>
  );
};

const StyledRoleSelect = styled.div`
  padding: ${({ active }) => (active ? " 2px 4px 2px 2px" : "2px")};
  display: grid;
  grid-template-columns: 1fr 18px;
  gap: 3px;
  background: ${({ active }) => active?.bg ?? "rgba(255, 255, 255, 0.30)"};
  border-radius: ${({ open }) => (open ? "6px 6px 0 0" : "6px")};
  height: 22px;
  align-items: center;
  position: relative;
  transition: all 0.3s;
  width: 121px;
  .title {
    color: ${({ active }) => active?.color ?? "var(--main-color)"};
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 1; /* 12.98px */
    letter-spacing: 0.22px;
    text-transform: uppercase;
    padding: 4px 6px;
    text-align: center;
    height: 16px;
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
      fill: ${({ active }) => active?.color ?? "var(--main-color)"};
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
