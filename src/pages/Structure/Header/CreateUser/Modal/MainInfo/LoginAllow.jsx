import { useState } from "react";
import { styled } from "styled-components";
import { Toggle } from "../../../../../../components/Toggle";

export const LoginAllow = () => {
  const [isAllowed, setIsAllowed] = useState(false);

  return (
    <StyledLoginAllow
      isAllowed={isAllowed}
      className="flex items-center justify-between"
    >
      <div>
        <div className="title">{isAllowed ? "Дозволено" : "Заборонено"}</div>
        <div className="subtitle">Вхід</div>
      </div>
      <Toggle
        value={isAllowed}
        onChange={() => setIsAllowed(!isAllowed)}
        className={isAllowed ? "toggle-active" : "toggle"}
      />
    </StyledLoginAllow>
  );
};

const StyledLoginAllow = styled.div`
  padding: 8px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  text-align: left;
  &:hover {
    background: var(--card-bg-2);
  }
  .title {
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    margin-bottom: 2px;
    color: ${({ isAllowed }) =>
      isAllowed ? "var(--green-light-2)" : "#FF5151"};
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
  .toggle {
    background: var(--dark-card-bg);
  }
  .toggle-active {
    background: #35c511;
  }
`;
