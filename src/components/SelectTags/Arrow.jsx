import { styled } from "styled-components";
import { ReactComponent as ArrowIcon } from "../../assets/images/arrow-down.svg";

export const Arrow = ({ onClick, onBlur, active, innerRef }) => (
  <StyledArrow
    className="arrow flex items-center justify-center"
    onClick={onClick}
    onBlur={onBlur}
    active={active}
    ref={innerRef}
  >
    <ArrowIcon />
  </StyledArrow>
);

const StyledArrow = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 1;
  border-radius: 8px;
  transition: all 0.3s;
  svg {
    transition: all 0.3s;
    transform: rotate(${({ active }) => (active ? 180 : 0)}deg);
  }
  path {
    fill: #fff;
  }
  &:hover {
    background: var(--bg-20);
    g {
      opacity: 1;
    }
  }
`;
