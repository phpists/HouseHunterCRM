import { styled } from "styled-components";
import { Calendar } from "../../Calendar/Calendar";
import { useState } from "react";
import { ReactComponent as CalendarIcon } from "../../../assets/images/calendar-card.svg";
import { handleFormatDate } from "../../..//utilits";

export const StatusDate = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleChangeDate = (val) => onChange(val.getTime());

  return (
    <>
      <StyledDate
        className={`flex items-center justify-between ${open && "active"} ${
          value && "notEmpty"
        }`}
      >
        <div></div>
        <div className="text-data" onClick={() => setOpen(!open)}>
          <div className="title">
            {value ? handleFormatDate(new Date(value), true) : "Оберіть дату"}
          </div>
          <div className="subtitle">Рекламується з </div>
        </div>
        <CalendarIcon
          onClick={() => setOpen(!open)}
          //   className="calendar-icon"
        />
        <div className="dropdown">
          <Calendar
            value={value ? new Date(value) : undefined}
            onChange={handleChangeDate}
            onClose={() => setOpen(false)}
            onReset={() => onChange("0")}
            changeOnlyOnMonth
          />
        </div>
      </StyledDate>
      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}></div>
      )}
    </>
  );
};

const StyledDate = styled.button`
  width: 100%;
  cursor: pointer;
  position: relative;
  padding: 5px 15px 5px 10px;
  transition: all 0.3s;
  border-radius: 8px;
  min-width: max-content;
  background: #ffffff0d;
  height: 38px;
  .modal-overlay {
  }
  .text-data {
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0);
    margin-right: 26px;
  }
  .title {
    font-size: 15px;
    line-height: 1;
    letter-spacing: 0.02em;
    font-weight: var(--font-weight-200);
    color: #ff9f2e;
    margin-bottom: 0.5px;
  }
  .subtitle {
    color: var(--main-color);
    text-align: left;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  .calendar-wrapper {
    border-radius: 0 0 6px 6px;
    border: none;
    width: 340px;
  }
  .dropdown {
    position: absolute;
    top: calc(100% + 9px);
    border-radius: 9px;
    border: 1px solid var(--bg-20);
    background: var(--card-bg);
    z-index: 103;
    visibility: hidden;
    opacity: 0;
    width: 340px;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
  }

  .calendar-icon {
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
  &:hover {
    color: var(--main-color);
    background: rgba(255, 159, 46, 0.4);
    opacity: 0.5;
  }

  &.active,
  &.notEmpty {
    color: var(--main-color);
    background: rgba(255, 159, 46, 0.4);
    opacity: 1 !important;
  }

  &.active {
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
    border-radius: 9px;
    /* background:  var(--card-bg-2); */
    .calendar-icon g {
      opacity: 1;
    }
  }
  @media (max-width: 1300px) {
  }
  @media (max-width: 800px) {
    padding: 6px 10px;
    border-radius: 9px;
    background: var(--card-bg-2);
    width: 50%;
    .title {
      font-size: 14px;
    }
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;
