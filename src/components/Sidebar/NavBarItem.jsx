import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";

export const NavBarItem = ({ Icon, link, title, childrenLinks, className }) => {
  const { pathname } = useLocation();

  return (
    <StyledNavbarItem
      to={link}
      className={`flex items-center sidebarLink ${
        childrenLinks.includes(pathname?.split("/")?.[1]) && "active"
      } ${className}`}
      activeclassname="active"
      title={title}
    >
      <Icon />
    </StyledNavbarItem>
  );
};
const StyledNavbarItem = styled(NavLink)`
  height: 40px;
  width: 84px;
  padding-left: 30px;
  position: relative;
  transition: all 0.3s;
  path {
    transition: all 0.3s;
  }

  &::before {
    content: "";
    height: 100%;
    width: 3px;
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 0px 10px 10px 0px;
    /* transition: all 0.3s; */
  }

  a {
    margin: 8px 0;
  }
  &.active,
  &:hover {
    background: linear-gradient(
      90deg,
      rgba(93, 99, 255, 0.1) 0%,
      rgba(93, 99, 255, 0) 100%
    );
    svg,
    g {
      opacity: 1;
    }
    path {
      fill: #5d63ff;
    }
    &::before {
      content: "";
      background: #5d63ff;
    }
    &.red {
      path {
        fill: red;
      }
      &::before {
        content: "";
        background: red;
      }
    }
  }
`;
