import styled from "styled-components";
import clockIcon from "../../../../../../assets/images/clock.svg";

export const LastTime = ({ date }) => (
  <StyledLastTime className="flex items-center notClickable">
    <img src={clockIcon} alt="" className="notClickable" />
    Остання активність {date?.substring(0, 10)}
  </StyledLastTime>
);

const StyledLastTime = styled.div`
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
  margin-bottom: 8px;
  width: max-content;
  width: max-content;
  white-space: nowrap;
  img {
    margin-right: 4px;
    height: 12px;
    width: 12px;
  }
`;
