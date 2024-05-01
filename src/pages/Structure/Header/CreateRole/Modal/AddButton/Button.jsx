import styled from "styled-components";

export const Button = ({ onClick }) => (
  <StyledButton onClick={onClick}>Створити нову роль</StyledButton>
);

const StyledButton = styled.button`
  height: 43px;
  width: 100%;
  border-radius: 10px;
  background: var(--bg-10);
  color: var(--second-color);
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  border: 1.4px solid transparent;
  transition: all 0.3s;

  &:hover {
    color: var(--color-2);
    border: 1.4px solid #fff;
  }
`;
