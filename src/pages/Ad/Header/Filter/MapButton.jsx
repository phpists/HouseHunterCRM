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
    height: 30px;
    width: 30px;
    svg {
      height: 20px;
      opacity: 0.5;
    }
    &:hover {
      svg {
        opacity: 1;
      }
    }
  }
`;
