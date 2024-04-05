import { styled } from "styled-components";
import { ReactComponent as OptionsIcon } from "../../assets/images/options.svg";

export const Button = ({ onChangeFocus }) => (
  <StyledButton
    className="flex items-center justify-center more-btn noClickable"
    onFocus={() => onChangeFocus(true)}
    onBlur={() => onChangeFocus(false)}
    onClick={(e) => e.currentTarget.focus()}
  >
    <OptionsIcon className="noClickable" />
  </StyledButton>
);

const StyledButton = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1.4px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s;
  position: relative;
  z-index: 0;
  svg {
    flex-shrink: 0;
  }
  g {
    transition: all 0.3s;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    g {
      opacity: 1;
    }
  }
  @media (max-width: 1399.5px) {
    width: 18px;
    height: 18px;
    border: none;
  }
`;
