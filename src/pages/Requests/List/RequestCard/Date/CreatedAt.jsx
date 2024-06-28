import styled from "styled-components";
import { ReactComponent as Clock } from "../../../../../assets/images/time.svg";
import { handleFormatDate } from "../../../../../utilits";

export const CreatedAt = ({ dateCreate }) => (
  <StyledCreatedAt className="flex item-center labelItem">
    <Clock />
    Створено {handleFormatDate(Number(dateCreate) * 1000)}
  </StyledCreatedAt>
);

const StyledCreatedAt = styled.div`
  font-family: Open Sans;
  font-size: 11px;
  font-weight: var(--font-weight-200);
  line-height: 14.98px;
  letter-spacing: 0.02em;
  text-align: left;
  opacity: 0.4;
  margin-bottom: 17px;
  svg {
    margin-right: 4px;
    height: 12px;
    width: 12px;
    flex-shrink: 0;
  }
`;
