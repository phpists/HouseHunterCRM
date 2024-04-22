import { styled } from "styled-components";

export const IconButton = ({ Icon, onClick, className, active }) => (
  <StyledIconButton
    onClick={onClick}
    className={`flex items-center justify-center ${className} ${
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
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(18.5px);
  g {
    transition: all 0.3s;
  }
  &:hover,
  &.active {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    g {
      opacity: 1;
    }
  }
  &.active {
    border: 1.2px solid #fff;
  }
`;
