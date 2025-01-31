import { styled } from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../../assets/images/clients-arrow.svg";

export const Arrow = ({ onClick }) => (
  <StyledArrow
    className="flex items-center justify-center btn"
    onClick={onClick}
  >
    <button>
      <ArrowIcon />
    </button>
  </StyledArrow>
);

const StyledArrow = styled.div`
  display: block;
  height: max-content;
  svg {
    transform: rotate(-45deg);
    opacity: 0.4;
    transition: all 0.3s;
    width: 24px;
    height: 24px;
    path {
      fill: #fff;
    }
  }
  &:hover {
    svg {
      transform: rotate(0deg);
      opacity: 1;
    }
  }
`;
