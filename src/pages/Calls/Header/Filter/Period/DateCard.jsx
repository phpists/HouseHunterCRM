import styled from "styled-components";
import { ReactComponent as CalendarIcon } from "../../../../../assets/images/calendar.svg";

export const DateCard = ({ date, label, onClick, active }) => (
  <StyledDateCard
    className={`flex items-center justify-between ${active && "active"}`}
    onClick={onClick}
  >
    <div>
      <div className="date">{date}</div>
      <div className="label">{label}</div>
    </div>
    <button className="flex items-center justify-center">
      <CalendarIcon />
    </button>
  </StyledDateCard>
);

const StyledDateCard = styled.div`
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 9px;
  transition: all 0.3s;
  position: relative;
  .date {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
  }
  .label {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }

  button {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 8px;
    transition: all 0.3s;
    opacity: 0;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      g {
        opacity: 1;
      }
    }
  }

  &:hover,
  &.active {
    background: rgba(255, 255, 255, 0.1);
    button {
      opacity: 1;
    }
  }
`;
