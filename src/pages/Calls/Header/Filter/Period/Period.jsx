import styled from "styled-components";
import { DateCard } from "./DateCard";
import { Calendar } from "../../../../../components/Calendar/Calendar";
import { useState } from "react";
import { handleFormatDate } from "../../../../../utilits";

export const Period = ({ filters, onChangeFilter }) => {
  const [changeDate, setChangeDate] = useState(false);

  const handleChangeValue = (val) => {
    const date = Math.floor(new Date(val).getTime() / 1000);
    onChangeFilter(changeDate === 1 ? "date_from" : "date_to", date);
  };

  return (
    <StyledPeriod>
      <DateCard
        date={handleFormatDate(new Date(filters?.date_from * 1000), true)}
        label="Період з"
        active={changeDate === 1}
        onClick={() => setChangeDate(changeDate === 1 ? null : 1)}
      />
      <DateCard
        date={handleFormatDate(new Date(filters?.date_to * 1000), true)}
        label="Період до"
        active={changeDate === 2}
        onClick={() => setChangeDate(changeDate === 2 ? null : 2)}
      />
      {changeDate && (
        <>
          <Calendar
            value={
              new Date(
                (changeDate === 1 ? filters?.date_from : filters?.date_to) *
                  1000
              )
            }
            onChange={handleChangeValue}
          />
          <div
            className="modal-overlay"
            onClick={() => setChangeDate(null)}
          ></div>
        </>
      )}
    </StyledPeriod>
  );
};

const StyledPeriod = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  position: relative;
  .calendar-wrapper {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    z-index: 100;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(18.5px);
  }
`;
