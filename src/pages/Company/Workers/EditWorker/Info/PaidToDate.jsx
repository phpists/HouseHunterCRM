import { styled } from "styled-components";
import clockIcon from "../../../../../assets/images/clock.svg";

export const PaidToDate = () => (
  <StyledLPaidToDate className="flex items-center justify-between">
    <div>
      <div className="title">
        <span>Сплачено до </span>28.07.2023
      </div>
      <div className="subtitle">Білінг</div>
    </div>
    <img src={clockIcon} alt="" />
  </StyledLPaidToDate>
);

const StyledLPaidToDate = styled.div`
  padding: 7px 13px 6px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  .title {
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    color: #50f835;
    span {
      color: rgba(80, 248, 53, 0.6);
    }
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  img {
    opacity: 0;
    visibility: hidden;
    transform: translateX(-10px);
    transition: all 0.3s;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    img {
      opacity: 1;
      visibility: visible;
      transform: translateX(0px);
    }
  }
`;
