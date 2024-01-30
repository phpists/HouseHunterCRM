import styled from "styled-components";
import dotsIcon from "../../../assets/images/options.svg";

export const Button = ({ onChangeFocus }) => (
  <StyledButton
    className="flex items-center justify-center"
    onFocus={() => onChangeFocus(true)}
    onBlur={() => onChangeFocus(false)}
  >
    <img src={dotsIcon} alt="" />
  </StyledButton>
);

const StyledButton = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1.4px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(18.5px);

  @media (max-width: 1400px) {
    border: none;
    width: 18px;
    height: 18px;
    backdrop-filter: none;
  }
`;
