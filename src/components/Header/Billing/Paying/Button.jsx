import { styled } from "styled-components";

export const Button = ({ Icon, hoverColor, className, onClick, disabled }) => (
  <StyledButton
    className={`flex items-center justify-center  ${className}`}
    hoverColor={hoverColor}
    onClick={onClick}
    disabled={disabled}
  >
    <Icon />
  </StyledButton>
);

const StyledButton = styled.div`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.1);
  padding: 5px;
  transition: all 0.3s;
  &:hover {
    background: #fff;
    svg,
    g,
    path {
      opacity: 1;
      fill-opacity: 1;
    }
    path {
      opacity: 1;
      fill: ${({ hoverColor }) => hoverColor};
    }
  }
  ${({ disabled }) => disabled && "opacity: 0.7; cursor: not-allowed;"}
`;
