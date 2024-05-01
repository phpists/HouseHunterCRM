import { useState } from "react";
import styled from "styled-components";
import { Toggle } from "../../../../../../../../components/Toggle";

export const ToggleOption = ({ title, subtitle }) => {
  const [active, setActive] = useState(false);

  return (
    <StyledToggleOption className="flex items-center justify-between">
      <div>
        <div className="title">{title}</div>
        <div className="subtitle">{subtitle}</div>
      </div>
      <Toggle value={active} onChange={() => setActive(!active)} />
    </StyledToggleOption>
  );
};

const StyledToggleOption = styled.div`
  padding: 8px 10px;
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    margin-bottom: 2px;
    max-width: 269px;
  }
  .subtitle {
    color: var(--main-color);
    /* Aditional text */
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    max-width: 269px;
  }
`;
