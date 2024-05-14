import styled from "styled-components";
import icon from "../../../assets/images/dollar.svg";

export const Button = ({ onClick }) => (
  <StyledButton className="flex items-center justify-center" onClick={onClick}>
    <img src={icon} alt="" />
  </StyledButton>
);

const StyledButton = styled.button`
  height: 52px;
  width: 52px;
  background: #2ef5c61a;
  border: 1.4px solid #2ef5c633;
  border-radius: 8px;
  margin-right: 3px;
`;
