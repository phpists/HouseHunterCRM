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
  color: var(--second-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  width: 100%;
  text-align: left;
  position: relative;
  &:hover,
  &:focus {
    background: var(--card-bg-2);
    color: var(--main-color);
  }
  &:focus > .dropdown {
    opacity: 1;
    visibility: visible;
  }
`;
