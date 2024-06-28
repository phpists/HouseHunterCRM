import { useState } from "react";
import { styled } from "styled-components";
import { Toggle } from "../../../../components/Toggle";

export const ToggleOption = ({
  status,
  className,
  onSetCallsStatus,
  onSend,
}) => {
  return (
    <StyledToggleOption
      className={` ${className} ${status === "1" && "active"}`}
    >
      <div onClick={() => onSetCallsStatus("1")}>Опрацювати обране</div>
      {onSend && <div onClick={onSend}>Передати обране </div>}
    </StyledToggleOption>
  );
};

const StyledToggleOption = styled.div`
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
  div {
    color: var(--second-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%;
    letter-spacing: 0.3px;
    padding: 7px 12px 5px;
    transition: all 0.3s;
    cursor: pointer;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    &:hover {
      opacity: 1;
      background: var(--bg-10);
      color: var(--main-color);
    }
  }
  &.active {
    color: var(--green-light-2);
  }
`;
