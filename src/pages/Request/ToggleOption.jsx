import { useState } from "react";
import { styled } from "styled-components";
import { Toggle } from "../../components/Toggle";

export const ToggleOption = ({ label, className }) => {
  const [active, setActive] = useState(false);

  return (
    <StyledToggleOption className="flex items-center justify-between">
      <div className="label">{label}</div>
      <Toggle
        value={active}
        onChange={() => setActive(!active)}
        className={active ? "toggle-wrapper-active" : null}
      />
    </StyledToggleOption>
  );
};

const StyledToggleOption = styled.div`
  padding: 8px 10px;
  transition: all 0.3s;
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  .toggle-wrapper-active {
    background: #5d63ff;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;
