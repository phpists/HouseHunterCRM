import { styled } from "styled-components";
import { handleFormatDate } from "../../../../utilits";

export const Status = ({ status, date }) => (
  <StyledStatus
    color={date ? "#ff9f2e" : status ? "var(--green-light-2)" : "#FF1D1D"}
    bg={
      date
        ? "rgba(255, 159, 46, 0.4)"
        : status
        ? "rgba(80, 248, 53, 0.25)"
        : "rgba(255, 29, 29, 0.25)"
    }
  >
    <div className="title">
      {date
        ? handleFormatDate(Number(date) * 1000, true)
        : status
        ? "Актуально"
        : "Не актуально"}
    </div>
    <div className="subtitle">{date ? "Звільняється з " : "Статус"}</div>
  </StyledStatus>
);

const StyledStatus = styled.div`
  padding: 7px 10px 6px;
  border-radius: 9px;
  transition: all 0.3s;
  background: ${({ bg }) => bg};
  .title {
    color: ${({ color }) => color ?? "var(--main-color)"};
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .subtitle {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
