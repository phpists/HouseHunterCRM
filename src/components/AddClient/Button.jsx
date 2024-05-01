import styled from "styled-components";
import { Loader } from "../Loader";

export const Button = ({ onClick, disabled, loading }) => (
  <StyledButton onClick={onClick} disabled={disabled}>
    {loading ? <Loader white /> : "Cтворити"}
  </StyledButton>
);

const StyledButton = styled.button`
  border-radius: 8px;
  background: var(--blue);
  padding: 9px 18px 10px 18px;
  color: #fff;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 1; /* 17.7px */
  letter-spacing: 0.3px;
  transition: all 0.3s;
  width: 100%;
  height: 38px;
  &:hover {
    background: #5d63ff;
  }
`;
