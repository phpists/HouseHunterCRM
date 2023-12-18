import styled from "styled-components";
import phoneIcon from "../../../../../../assets/images/small-phone.svg";

export const Count = () => (
  <StyledCount>
    <div>-</div>
    <img src={phoneIcon} alt="" />
  </StyledCount>
);

const StyledCount = styled.div`
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  img {
    margin-top: 6px;
  }
`;
