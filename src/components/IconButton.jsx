import { styled } from "styled-components";

export const IconButton = ({ Icon, onClick, className, active }) => (
  <StyledIconButton
    onClick={onClick}
    className={`flex items-center justify-center iconButton ${className} ${
      active && "active"
    }`}
  >
    <Icon />
  </StyledIconButton>
);

const StyledIconButton = styled.div`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: var(--second-color-border);
  backdrop-filter: blur(18.5px);
  g {
    transition: all 0.3s;
  }
  &:hover,
  &.active {
    background: var(--bg-20);
    border: none;
    g {
      opacity: 1;
    }
  }
  &.active {
    border: 1.2px solid #fff;
  }
`;
