import styled from "styled-components";
import { ReactComponent as Icon } from "../../../../../assets/images/options.svg";

export const Button = ({ onChangeFocus }) => (
  <StyledButton
    className="flex items-center justify-center"
    onFocus={() => onChangeFocus(true)}
    onBlur={() => onChangeFocus(false)}
    onClick={(e) => e.currentTarget.focus()}
  >
    <Icon />
  </StyledButton>
);

const StyledButton = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1.4px solid var(--second-color);
  backdrop-filter: blur(18.5px);

  @media (max-width: 1400px) {
    border: none;
    width: 18px;
    height: 18px;
    backdrop-filter: none;
  }
`;
