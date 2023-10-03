import { styled } from "styled-components";
import { useState } from "react";
import { Toggle } from "../../../../components/Toggle";

export const Dropdown = ({ open }) => {
  const [stopShow, setStopShow] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [noActual, setNotActual] = useState(false);

  return (
    <StyledDropdown open={open}>
      <div className="flex items-center justify-between toggle-wrapper">
        <span>Призупинити показ</span>
        <Toggle
          value={stopShow}
          onChange={() => setStopShow(!stopShow)}
          className={stopShow ? "toggle--active " : "toggle"}
        />
      </div>
      <div className="flex items-center justify-between toggle-wrapper">
        <span>Пуста підбірка</span>
        <Toggle
          value={empty}
          onChange={() => setEmpty(!empty)}
          className={empty ? "toggle--active " : "toggle"}
        />
      </div>
      <div className="flex items-center justify-between toggle-wrapper">
        <span>Неактуально</span>
        <Toggle
          value={noActual}
          onChange={() => setNotActual(!noActual)}
          className={noActual ? "toggle--active " : "toggle"}
        />
      </div>
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 320px;
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 6;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  backdrop-filter: blur(18.5px);
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  .toggle-wrapper {
    padding: 8px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    gap: 10px;
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
  @media (min-width: 800px) {
    display: none;
  }
`;
