import styled from "styled-components";
import { ReactComponent as MapIcon } from "../../../../assets/images/map.svg";
import { IconButton } from "../../../../components/IconButton";
import { useState } from "react";

export const MapButton = ({ onOpenMap }) => {
  return (
    <StyledMapButton>
      <IconButton Icon={MapIcon} className="icon-wrapper" onClick={onOpenMap} />
    </StyledMapButton>
  );
};

const StyledMapButton = styled.div`
  cursor: pointer;
  .icon-wrapper {
    height: 48px;
    width: 48px;
    margin-left: 10px;
    svg {
      height: 30px;
      opacity: 0.5;
    }
    &:hover {
      svg {
        opacity: 1;
      }
    }
  }
`;
