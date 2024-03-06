import styled from "styled-components";
import clockIcon from "../../../../../assets/images/clock.svg";
import { handleFormatDate } from "../../../../../utilits";

export const SeenTime = ({ date }) => (
  <StyledSeenTime className="flex items-center clickable">
    <img src={clockIcon} alt="" />
    {!date || date === "0"
      ? "не переглянуто"
      : `переглянуто ${handleFormatDate(Number(date) * 1000)}`}
  </StyledSeenTime>
);

const StyledSeenTime = styled.div`
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
  margin-bottom: 16px;
  img {
    height: 12px;
    width: 12px;
    margin-right: 4px;
  }
`;
