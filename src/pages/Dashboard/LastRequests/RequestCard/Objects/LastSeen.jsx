import styled from "styled-components";
import timerIcon from "../../../../../assets/images/time.svg";

export const LastSeen = () => (
  <StyledLastSeen className="flex items-center">
    <img src={timerIcon} alt="" />
    переглянуто 9 хв тому
  </StyledLastSeen>
);

const StyledLastSeen = styled.div`
  color: rgba(255, 255, 255, 0.4);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  margin-bottom: 10px;
  img {
    margin-right: 4px;
    width: 12px;
    height: 12px;
  }
`;
