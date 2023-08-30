import { styled } from "styled-components";
import { Dropdown } from "./Dropdown";

export const Empty = ({ onSelect }) => (
  <StyledEmpty>
    Хто бере завдаток
    <Dropdown onSelect={onSelect} />
  </StyledEmpty>
);

const StyledEmpty = styled.button`
  padding: 7px 10px 5px;
  border-radius: 9px;
  transition: all 0.3s;
  color: rgba(255, 255, 255, 0.4);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  width: 100%;
  text-align: left;
  position: relative;
  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }
  &:focus > .dropdown {
    opacity: 1;
    visibility: visible;
  }
`;
