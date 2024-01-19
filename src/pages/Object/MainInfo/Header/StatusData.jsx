import { styled } from "styled-components";
import { Calendar } from "../../../../components/Calendar/Calendar";
import { useState } from "react";
import { ReactComponent as CalendarIcon } from "../../../../assets/images/calendar-card.svg";
import { handleFormatDate } from "../../../../utilits";

export const StatusData = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleChangeDate = (val) => onChange(val.getTime());

  return (
    <StyledDate
      className={`flex items-center justify-between ${open && "active"}`}
    >
      <div className="text-data" onClick={() => setOpen(!open)}>
        <div className="title">{handleFormatDate(new Date(value), true)}</div>
        <div className="subtitle">звільняється з </div>
      </div>
      <CalendarIcon onClick={() => setOpen(!open)} className="calendar-icon" />
      <div className="dropdown">
        <Calendar value={new Date(value)} onChange={handleChangeDate} />
      </div>
    </StyledDate>
  );
};

const StyledDate = styled.button`
  width: 100%;
  margin: 0 3px;
  cursor: pointer;
  position: relative;
  padding: 7px 13.5px 6px 10px;
  transition: all 0.3s;
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
    color: #fff;
    text-align: center;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
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
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: #3d3d3d;
    z-index: 10;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
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
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.05);
  }
  &.active {
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.05);
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
    background: rgba(255, 255, 255, 0.05);
    margin: 0;
    .title {
      font-size: 14px;
    }
  }
`;
