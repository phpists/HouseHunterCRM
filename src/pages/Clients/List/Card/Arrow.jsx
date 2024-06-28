import { styled } from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../../assets/images/clients-arrow.svg";
import { NavLink } from "react-router-dom";

export const Arrow = ({ id }) => (
  <StyledArrow
    className="flex items-center justify-center h-full arrow"
    to={`/client/${id}`}
  >
    <button>
      <ArrowIcon />
    </button>
  </StyledArrow>
);

const StyledArrow = styled(NavLink)`
  margin-right: 18px;
  height: 100%;
  display: block;
  width: 32px;
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
  button {
    position: absolute;
    right: -14px;
    width: 85px;
    top: -12px;
    bottom: -13px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: red;
  }
  @media (max-width: 1399.5px) {
    margin: 0 0 21px;
    position: relative;
    width: max-content;
    button {
      position: relative;
    }
  }
  @media (max-width: 850px) {
    margin: 0;
  }
`;
