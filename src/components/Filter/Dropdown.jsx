import { styled } from "styled-components";
import { Toggle } from "../Toggle";
import { useState } from "react";
import { Option } from "../Option";

export const Dropdown = ({ open }) => {
  const [loginAllow, setLoginAllow] = useState(false);
  const [paid, setPaid] = useState(false);
  const [rieltor, setRieltor] = useState(false);
  const [manager, setManager] = useState(false);
  const [boss, setBoss] = useState(false);

  return (
    <StyledDropdown open={open}>
      <div className="flex items-center justify-between toggle-wrapper">
        <span>Вхід дозволено</span>
        <Toggle
          value={loginAllow}
          onChange={() => setLoginAllow(!loginAllow)}
          className={loginAllow ? "toggle--active " : "toggle"}
        />
      </div>
      <div className="flex items-center justify-between toggle-wrapper">
        <span>Доступ оплачено</span>
        <Toggle
          value={paid}
          onChange={() => setPaid(!paid)}
          className={paid ? "toggle--active " : "toggle"}
        />
      </div>
      <Option
        title="Ріелтор"
        active={rieltor}
        onChange={() => setRieltor(!rieltor)}
      />
      <Option
        title="Менеджер"
        active={manager}
        onChange={() => setManager(!rieltor)}
      />
      <Option
        title="Керівник"
        active={boss}
        onChange={() => setBoss(!boss)}
        className="last-option"
      />
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 220px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18.5px);
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  z-index: 6;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  div {
  }
  .toggle-wrapper {
    padding: 6px 6px 7px 11px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .toggle {
    background: #323232;
  }
  .toggle--active {
    background: #35c511;
  }
  .last-option {
    border: none;
  }
  ${({ open }) =>
    open &&
    `
    opacity: 1;
    visibility: visible;
  `}
`;
