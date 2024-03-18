import { useState } from "react";
import { styled } from "styled-components";
import ReactCalendar from "react-calendar";
import { Header } from "./Header";

export const Calendar = ({
  value = new Date(),
  onChange = () => null,
  onClose,
  onReset,
  changeOnlyOnMonth,
}) => {
  const [loading, setLoading] = useState(false);

  const handleChangeMonth = (count) => {
    setLoading(true);
    onChange(new Date(value.setMonth(value.getMonth() + count)));
    setTimeout(() => setLoading(false), 100);
  };

  const handleChangeYear = (year) => {
    setLoading(true);
    onChange(new Date(value.setYear(year)));
    setTimeout(() => setLoading(false), 100);
  };

  const handleChangeCalendar = (val) => {
    if (new Date(val)?.getTime() === new Date(value)?.getTime() && onReset) {
      onReset && onReset();
    } else {
      onChange(val);
    }

    onClose && onClose();
  };

  return (
    <StyledCalendar className="calendar-wrapper">
      <Header
        value={value ?? new Date()}
        onChangeMonth={handleChangeMonth}
        onChangeYear={handleChangeYear}
        onClose={onClose}
      />
      {!loading && (
        <ReactCalendar
          onChange={handleChangeCalendar}
          value={value}
          maxDetail="month"
          defaultView="month"
        />
      )}
    </StyledCalendar>
  );
};

const StyledCalendar = styled.div`
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.1);
  padding-bottom: 12px;
  min-height: 301px;
  .react-calendar__navigation {
    display: none;
  }
  .react-calendar__month-view__weekdays__weekday {
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    abbr {
      text-decoration: none !important;
    }
  }
  .react-calendar__month-view__days__day {
    color: #fff;
    text-align: center;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 34px;
    width: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .react-calendar__tile--active {
    border-radius: 40px;
    background: #5c496f;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: rgba(255, 255, 255, 0.4);
  }
`;
