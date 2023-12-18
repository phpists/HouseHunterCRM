import { useState } from "react";
import { styled } from "styled-components";
import { Toggle } from "../../../../components/Toggle";

export const ToggleOption = ({ status, className, onSetCallsStatus }) => {
  return (
    <StyledToggleOption
      className={` ${className} ${status === "1" && "active"}`}
    >
      <div onClick={() => onSetCallsStatus("1")}>Опрацьовано</div>
      <div onClick={() => onSetCallsStatus("0")}>Не опрацьовано</div>
      {/* 
      <Toggle
        value={status === "1"}
        onChange={onSetCallsStatus}
        className={status === "1" ? "toggle-active" : ""}
      /> */}
    </StyledToggleOption>
  );
};

const StyledToggleOption = styled.div`
  border-radius: 6px;
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  transition: all 0.3s;
  .toggle-active {
    background: #50f835;
  }
  div {
    color: rgba(255, 255, 255, 0.4);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 118%;
    letter-spacing: 0.3px;
    padding: 7px 12px 5px;
    transition: all 0.3s;
    cursor: pointer;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    &:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
  }
  &.active {
    color: #50f835;
  }
`;
