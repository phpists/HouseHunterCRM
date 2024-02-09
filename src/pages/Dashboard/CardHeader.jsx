import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../src/assets/images/welcome-step-arrow.svg";
import { NavLink } from "react-router-dom";

export const CardHeader = ({ title, link }) => (
  <StyledCardHeader className="flex items-center justify-between" to={link}>
    <div className="title">{title}</div>
    <Arrow className="link-arrow" />
  </StyledCardHeader>
);

const StyledCardHeader = styled(NavLink)`
  color: rgba(255, 255, 255, 0.9);
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  letter-spacing: 0.36px;
  margin-bottom: 5px;
  cursor: pointer;
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
