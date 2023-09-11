import styled from "styled-components";
import dotsIcon from "../../../assets/images/options.svg";

export const Button = () => (
  <StyledButton className="flex items-center justify-center">
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
`;
