import { styled } from "styled-components";
import { Calendar } from "../../../../components/Calendar/Calendar";
import { useState } from "react";
import { ReactComponent as CalendarIcon } from "../../../../assets/images/calendar-card.svg";
import { handleFormatDate } from "../../../../utilits";

export const StatusData = ({ value, onChange }) => {
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
          <div className="subtitle">звільняється з </div>
        </div>
        <CalendarIcon
          onClick={() => setOpen(!open)}
          className="calendar-icon"
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
  margin: 0 3px;
  cursor: pointer;
  position: relative;
  padding: 7px 13.5px 6px 10px;
  transition: all 0.3s;
  border-radius: 9px;
  min-width: max-content;
  .modal-overlay {
    background: red;
  }
  .text-data {
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0);
    margin-right: 5px;
  }
  .title {
    color: #ff9f2e;
    text-align: center;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .subtitle {
    color: var(--main-color);
    text-align: center;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  .calendar-wrapper {
    border-radius: 0 0 6px 6px;
    border: none;
  }
  .dropdown {
    position: absolute;
    top: calc(100% + 9px);
    border-radius: 9px;
    border: 1px solid var(--bg-20);
    background: var(--card-bg);
    z-index: 10;
    visibility: hidden;
    opacity: 0;
    width: 328px;
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
    justify-content: center;
    .calendar-icon {
      display: none;
    }
  }
  @media (max-width: 800px) {
    padding: 6px 10px;
    border-radius: 9px;
    background: var(--card-bg-2);
    margin: 0;
    .title {
      font-size: 14px;
    }
  }
`;
