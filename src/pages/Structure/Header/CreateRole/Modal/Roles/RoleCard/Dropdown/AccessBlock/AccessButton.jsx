import { useState } from "react";
import styled from "styled-components";

export const AccessButton = ({ Icon, active, onToggle }) => {
  return (
    <StyledAccessButton
      onClick={() => onToggle(!active)}
      className={` flex items-center justify-center ${active && "active"}`}
    >
      <Icon />
    </StyledAccessButton>
  );
};

const StyledAccessButton = styled.button`
  display: flex;
  width: 26px;
  height: 26px;
  padding: 4px;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 5px;
  svg {
    flex-shrink: 0;
  }
  g {
    opacity: 1;
  }
  path {
    opacity: 0.4;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.4);
    path {
      opacity: 1;
    }
  }

  &.active {
    background: rgba(255, 255, 255, 0.2);
  }
`;
