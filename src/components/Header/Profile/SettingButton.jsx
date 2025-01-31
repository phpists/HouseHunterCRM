import { NavLink } from "react-router-dom";
import { ReactComponent as Icon } from "../../../assets/images/settings.svg";
import styled from "styled-components";

export const SettingButton = () => {
  return (
    <StyledSettingButton
      to="/settings"
      className="flex items-center justify-center"
    >
      <Icon />
    </StyledSettingButton>
  );
};

const StyledSettingButton = styled(NavLink)`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  transition: all 0.3s;
  cursor: pointer;
  margin-right: 0px;
  position: relative;
  z-index: 10;
  div {
    position: absolute;
    right: 0px;
    top: 1px;
    background: #f94343;
    padding: 4px;
    color: var(--main-color);
    text-align: center;
    leading-trim: both;
    text-edge: cap;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 1; /* 127.273% */
    border-radius: 100%;
    min-width: 16px;
    height: 16px;
  }
  g {
    opacity: 1;
  }
  &:hover {
    background: var(--active-bg);
    path {
      fill: #5d63ff;
    }
  }
`;
