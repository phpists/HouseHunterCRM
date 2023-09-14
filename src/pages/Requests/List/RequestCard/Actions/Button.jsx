import styled from "styled-components";

export const Button = ({ Icon, className }) => (
  <StyledButton className={`flex items-center justify-center ${className}`}>
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
  &:hover {
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    g,
    path {
      opacity: 1;
    }
  }
`;
