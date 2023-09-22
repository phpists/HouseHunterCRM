import styled from "styled-components";
import { DateCard } from "./DateCard";
import { Calendar } from "../../../../../components/Calendar/Calendar";
import { useState } from "react";

export const Period = () => {
  const [changeDate, setChangeDate] = useState(false);

  return (
    <StyledPeriod>
      <DateCard
        date="04.09.2023"
        label="Період з"
        active={changeDate === 1}
        onClick={() => setChangeDate(changeDate === 1 ? null : 1)}
      />
      <DateCard
        date="04.09.2023"
        label="Період до"
        active={changeDate === 2}
        onClick={() => setChangeDate(changeDate === 2 ? null : 2)}
      />
      {changeDate && <Calendar />}
    </StyledPeriod>
  );
};

const StyledPeriod = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  position: relative;
  .calendar-wrapper {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    z-index: 10;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(18.5px);
  }
`;
