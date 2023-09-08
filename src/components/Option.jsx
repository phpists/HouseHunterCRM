import { styled } from "styled-components";
import checkIcon from "../assets/images/circle-green-check.svg";
import { useState } from "react";

export const Option = ({ title, onChange, active, className, noSelect }) => {
  const [a, setA] = useState(false);

  return (
    <StyledOption
      className={`flex items-center justify-between hover-effect-to-right ${className}`}
      onClick={() => setA(noSelect ? false : !a)}
      active={a}
    >
      <span>{title}</span>
      <img src={checkIcon} alt="" />
    </StyledOption>
  );
};
const StyledOption = styled.div`
  padding: 8px 17px 6px 11px;
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.2);
  background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.1) 50%
    )
    right;
  background-size: 210%;
  transition: 0.3s ease-out;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  &:hover {
    background-position: left;
  }
  img {
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }

  ${({ active }) =>
    active &&
    `
    color: #50F835;
    background: rgba(280, 248, 53, 0.1);
    img {
        opacity: 1;
        visibility: visible;
    }
  `}
`;
