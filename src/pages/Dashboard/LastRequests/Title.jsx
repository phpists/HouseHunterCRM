import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../assets/images/welcome-step-arrow.svg";
import { NavLink } from "react-router-dom";

export const Title = () => (
  <StyledTitle className="flex items-center justify-between" to="/requests">
    <span>Мої останні запити</span>
    <Arrow className="link-arrow" />
  </StyledTitle>
);

const StyledTitle = styled(NavLink)`
  margin-bottom: 20px;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  svg {
    transition: all 0.3s;
    path {
      fill: #fff;
    }
  }
  &:hover {
    svg {
      transform: rotate(45deg);
    }
    path {
      fill-opacity: 1;
    }
  }
`;
