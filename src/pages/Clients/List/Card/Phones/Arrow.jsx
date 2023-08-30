import { styled } from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../../../assets/images/arrow-down.svg";

export const Arrow = ({ open, onToggleOpen }) => (
  <StyledArrow
    className="flex items-center justify-center"
    open={open}
    onClick={onToggleOpen}
  >
    <ArrowIcon />
  </StyledArrow>
);

const StyledArrow = styled.div`
  padding: 0 3px;
  border-radius: 0 6px 6px 0;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  background: #444;
  transition: all 0.3s;
  height: 100%;
  cursor: pointer;
  flex-shrink: 0;
  svg {
    width: 17px;
    height: 17px;
  }
  g,
  svg {
    transition: all 0.3s;
  }
  path {
    fill: #fff;
  }
  &:hover {
    background: #535252;
    border-left: 1px solid #535252;
    g {
      opacity: 1;
    }
  }
  ${({ open }) =>
    open &&
    `
    border-radius: 0 6px 0 0;
    svg {
        transform: rotate(180deg);
    }
  `}
`;
