import styled from "styled-components";
import clockIcon from "../../../../../../assets/images/clock-green.svg";
import { handleFormatDate } from "../../../../../../utilits";

export const Date = ({ date }) => (
  <StyledDate className="clickable">
    <div className="title flex items-cente clickabler">
      <img src={clockIcon} alt="" className="clickable" />
      до {date ? handleFormatDate(Number(date) * 1000, true) : "--.--.----"}
    </div>
    <div className="subtitle clickable">Термін запиту</div>
  </StyledDate>
);

const StyledDate = styled.div`
  .title {
    color: #fff;
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    margin-bottom: 4px;
    img {
      margin-right: 4px;
    }
  }
  .subtitle {
    color: rgba(255, 255, 255, 0.4);
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
  }
`;
