import { useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as Arrow } from "../../../../../../assets/images/arrow.svg";
import { Dropdown } from "./Dropdown";
import { Selected } from "./Selected";

export const SelectTask = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelected = () => {
    setOpen(false);
    setSelected(true);
  };

  return (
    <StyledSelectTask className={` ${open && "active"}`}>
      <div
        className="flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        {selected ? (
          <Selected />
        ) : (
          <>
            <div>
              <div className="title">Оберіть</div>
              <div className="subtitle">Запит</div>
            </div>
            <Arrow />
          </>
        )}
      </div>
      {open && <Dropdown onSelect={handleSelected} />}
    </StyledSelectTask>
  );
};

const StyledSelectTask = styled.div`
  padding: 7px 14px 6px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: 0.6;
    transition: all 0.3s;
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    transition: all 0.3s;
  }
  svg {
    transform: rotate(-45deg);
    transition: all 0.3s;
  }

  path {
    fill: #fff;
    opacity: 0.4;
  }
  &:hover,
  &.active {
    background: rgba(255, 255, 255, 0.05);
    .title {
      opacity: 1;
    }
    svg {
      transform: rotate(0deg);
      path {
        opacity: 1;
      }
    }
  }

  &.active {
    border-radius: 9px 9px 0 0;
    svg {
      transform: rotate(45deg) !important;
    }
  }
`;
