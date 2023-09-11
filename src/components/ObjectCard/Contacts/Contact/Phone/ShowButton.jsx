import styled from "styled-components";
import { Button } from "../../../../Button";

export const ShowButton = ({ onClick, className }) => (
  <StyledShowButton onClick={onClick} className={`${className}`}>
    <span>Показати телефон</span>
  </StyledShowButton>
);

const StyledShowButton = styled.button`
  border-radius: 8px;
  padding: 9px 18px 6px 18px;
  background: rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  transition: all 0.3s;
  height: 38px;
  &:hover {
    background: rgba(255, 255, 255, 0.38);
    color: rgba(255, 255, 255, 1);
  }
`;
