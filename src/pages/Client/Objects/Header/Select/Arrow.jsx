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

const StyledArrow = styled.button`
  margin: 0 7px;
  flex-shrink: 0;
  path {
    fill: #fff;
  }
  g,
  svg {
    transition: all 0.3s;
  }
  &:hover {
    g {
      opacity: 1;
    }
  }

  ${({ open }) => open && "svg { transform: rotate(180deg); }"}
`;
