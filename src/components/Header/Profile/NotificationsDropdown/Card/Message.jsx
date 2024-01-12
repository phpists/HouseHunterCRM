import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../../../assets/images/welcome-step-arrow.svg";
import { NavLink } from "react-router-dom";

export const Message = ({ message, info, link }) => (
  <StyledMessage className="flex items-center justify-between" to={link}>
    <div>{message}</div>
    {!info && <Arrow />}
  </StyledMessage>
);

const StyledMessage = styled(NavLink)`
  color: #fff;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 200;
  line-height: 20px; /* 142.857% */
  cursor: pointer;
  padding: 0 12px 12px;
  &:hover {
    path {
      fill-opacity: 1;
    }
  }
`;
