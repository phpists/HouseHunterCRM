import { useState } from "react";
import { styled } from "styled-components";
import { Toggle } from "../../../../Toggle";

export const BusyStatus = () => {
  const [active, setActive] = useState(false);

  return (
    <StyledBusyStatus className="flex items-center justify-between">
      <div>
        <div className="title">Зайнятий</div>
        <div className="subtitle">Статус</div>
      </div>
      <Toggle value={active} onChange={() => setActive(!active)} />
    </StyledBusyStatus>
  );
};

const StyledBusyStatus = styled.div`
  border-radius: 6px;
  padding: 8px 16px 9px 11px;
  transition: all 0.3s;
  cursor: pointer;
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
  }
  .subtitle {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  &:hover {
    background: var(--active-bg);
    .title,
    .subtitle {
      color: #2c2c2c;
    }
  }
`;
