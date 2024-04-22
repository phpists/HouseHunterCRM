import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Button = ({ Icon, className, onClick, active, link }) =>
  link ? (
    <StyledLink
      to={link}
      className={`flex items-center justify-center ${className} ${
        active && "active"
      }`}
    >
      <Icon />
    </StyledLink>
  ) : (
    <StyledButton
      className={`flex items-center justify-center ${className} ${
        active && "active"
      }`}
      onClick={onClick}
    >
      <Icon />
    </StyledButton>
  );

const StyledButton = styled.button`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
  border: 1px solid transparent;
  svg {
    height: 18px;
  }
  &:hover,
  &.active {
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    g,
    path {
      opacity: 1;
    }
  }
`;

const StyledLink = styled(NavLink)`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
  border: 1px solid transparent;
  svg {
    height: 18px;
  }
  &:hover,
  &.active {
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    g,
    path {
      opacity: 1;
    }
  }
`;
