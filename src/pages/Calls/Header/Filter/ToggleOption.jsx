import { styled } from "styled-components";
import { Toggle } from "../../../../components/Toggle";

export const ToggleOption = ({ label, className, value, onChange }) => (
  <StyledToggleOption
    className={`flex items-center justify-between ${className} ${
      value && "active"
    }`}
    onClick={onChange}
  >
    <span>{label}</span>
    <Toggle value={value} className={value ? "toggle-active" : ""} />
  </StyledToggleOption>
);

const StyledToggleOption = styled.div`
  padding: 7px 7px 7px 11px;
  border-radius: 6px;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  transition: all 0.3s;
  cursor: pointer;
  .toggle-active {
    background: var(--green-light-2);
  }
  &:hover {
    background: var(--bg-10);
  }
  &.active {
    color: var(--green-light-2);
  }
`;
