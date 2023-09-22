import styled from "styled-components";
import phoneIcon from "../../../../../assets/images/small-phone.svg";

export const PhoneCalls = () => (
  <StyledPhoneCalls>
    <div className="flex items-center title">
      <img src={phoneIcon} alt="" />
      10
    </div>
    <div className="subtitle">Викликів</div>
  </StyledPhoneCalls>
);

const StyledPhoneCalls = styled.div`
  width: 100px;
  padding: 10px;
  border-radius: 9px;
  background: rgba(50, 50, 50, 0.8);
  height: max-content;
  height: 60px;
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
    margin-bottom: 2px;
    img {
      margin-right: 6px;
    }
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
