import { styled } from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../../assets/images/arrow-right-tarif.svg";
import { NavLink } from "react-router-dom";

export const Arrow = () => (
  <StyledArrow
    className="flex items-center justify-center h-full arrow"
    to="/clients/3"
  >
    <ArrowIcon />
  </StyledArrow>
);

const StyledArrow = styled(NavLink)`
  svg {
    transform: rotate(-45deg);
    opacity: 0.4;
    transition: all 0.3s;
  }
`;
