import { styled } from "styled-components";
import { handleFormatDate } from "../../../../../utilits";

export const CreatedAt = ({ dateCreate }) => (
  <StyledCreatedAt>
    Створений {handleFormatDate(Number(dateCreate) * 1000)}
  </StyledCreatedAt>
);

const StyledCreatedAt = styled.div`
  margin-top: 2px;
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
