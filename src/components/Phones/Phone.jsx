import { styled } from "styled-components";
import phoneIcon from "../../assets/images/call.svg";

export const Phone = ({ showOnHoverIcon, className }) => (
  <StyledPhone className={`${className}`}>
    <div className="flex items-center">
      <div className="phone">+38 (097) 707 62 58</div>
      <img src={phoneIcon} alt="" />
    </div>
    <div className="subtitle">Телефон</div>
  </StyledPhone>
);

const StyledPhone = styled.div`
  color: #fff;
  transition: all 0.3s;
  background: #444;
  padding: 7px 8px 6px;
  border-radius: 6px 0px 0px 6px;
  .phone {
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
  }
  .subtitle {
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  img {
    margin-left: 15px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
  }
  &:hover {
    background: #535252;
    img {
      opacity: 1;
      visibility: visible;
    }
  }
`;
