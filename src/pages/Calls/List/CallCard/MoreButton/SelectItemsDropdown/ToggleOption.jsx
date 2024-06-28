import { useState } from "react";
import { styled } from "styled-components";
import { Toggle } from "../../../../../../components/Toggle";

export const ToggleOption = ({ className, status, onSetStatus }) => {
  return (
    <StyledToggleOption
      className={`flex items-center justify-between ${className} ${
        status === "1" && "active"
      }`}
    >
      <span>{status === "1" ? "Опрацьований " : "Не опрацьований"}</span>
      <Toggle
        value={status === "1"}
        onChange={onSetStatus}
        className={status === "1" ? "toggle-active" : ""}
      />
    </StyledToggleOption>
  );
};

const StyledToggleOption = styled.div`
  padding: 7px 7px 7px 11px;
  border-radius: 6px;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  transition: all 0.3s;
  .toggle-active {
    background: var(--green-light-2);
  }
  &:hover {
    background: var(--bg-10);
  }
  &.active {
    color: var(--green-light-2);
  }
`;
