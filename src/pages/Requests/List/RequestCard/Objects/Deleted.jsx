import styled from "styled-components";
import { handleFormatDate } from "../../../../../utilits";

export const Deleted = ({ date }) => (
  <StyledDeleted>
    Видалений{date !== "0" ? "," : ""}
    {date !== "0" ? (
      <span>
        остаточне видалення {handleFormatDate(Number(date) * 1000, true)}
      </span>
    ) : null}
  </StyledDeleted>
);

const StyledDeleted = styled.div`
  font-family: Overpass;
  font-size: 14px;
  font-weight: var(--font-weight-light);
  line-height: 17px;
  letter-spacing: 0em;
  color: #f94343;
  margin-bottom: 12px;
  span {
    margin-left: 5px;
    max-width: 120px;
    font-size: 11px;
    opacity: 0.9;
  }
`;
