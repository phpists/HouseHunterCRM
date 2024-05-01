import styled from "styled-components";
import { ReactComponent as CheckIcon } from "../../../../../../../assets/images/circle-green-check.svg";

export const Option = ({ title, active, onSelect, last }) => (
  <StyledOption
    active={active}
    onClick={onSelect}
    className="flex items-center justify-between notClickable "
    last={last}
  >
    <span className="notClickable"> {title}</span>
    <CheckIcon className="notClickable" />
  </StyledOption>
);

const StyledOption = styled.div`
  padding: 8px;
  border-bottom: ${({ last }) => (last ? "0px" : "1px")} solid var(--bg-10);
  color: var(--main-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  cursor: pointer;
  transition: all 0.3s;
  background: ${({ active }) =>
    active ? "rgba(80, 248, 53, 0.10)" : "rgba(255, 255, 255, 0.0)"};
  svg {
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: all 0.3s;
  }
  path {
    fill: ${({ active }) =>
      active ? "var(--green-light-2)" : "var(--main-color)"};
  }

  &:hover {
    background: ${({ active }) =>
      active ? "rgba(80, 248, 53, 0.10)" : "rgba(255, 255, 255, 0.10)"};
    svg {
      opacity: 1;
    }
  }
`;
