import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const ActionButton = ({ Icon, className, onClick, active, link }) =>
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
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--card-bg-2);
  transition: all 0.3s;
  border: 1px solid transparent;
  padding: 5px;
  svg {
    height: 100%;
  }
  &:hover,
  &.active {
    border-radius: 4px;
    border: 1px solid var(--bg-20);
    g,
    path {
      opacity: 1;
    }
  }
  @media (max-width: 700px) {
    width: 24px;
    height: 24px;
  }
`;

const StyledLink = styled(NavLink)`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: 4px;
  background: var(--card-bg-2);
  transition: all 0.3s;
  border: 1px solid transparent;
  svg {
    height: 18px;
  }
  &:hover,
  &.active {
    border-radius: 4px;
    border: 1px solid var(--bg-20);
    g,
    path {
      opacity: 1;
    }
  }
`;
