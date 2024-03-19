import { useState } from "react";
import { styled } from "styled-components";
import { Toggle } from "../../../../../components/Toggle";

export const ToggleOption = ({ label, className, value, onChange }) => {
  return (
    <StyledToggleOption
      className={`flex items-center justify-between ${className}`}
      onClick={onChange}
    >
      <span>{label}</span>
      <Toggle value={value} />
    </StyledToggleOption>
  );
};

const StyledToggleOption = styled.div`
  padding: 7px 7px 7px 11px;
  border-radius: 6px;
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
