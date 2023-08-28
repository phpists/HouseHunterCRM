import { styled } from "styled-components";
import background from "../../../../assets/images/tarif-bg.png";
import backgroundLine from "../../../../assets/images/tarif-line-background.png";
import arrowIcon from "../../../../assets/images/arrow-right-tarif.svg";

export const Banner = () => (
  <StyledBanner
    background={background}
    backgroundLine={backgroundLine}
    className="flex items-baseline banner"
  >
    <span>Тарифи</span> <div />
    <img src={arrowIcon} alt="" />
  </StyledBanner>
);

const StyledBanner = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  line-height: 118%; /* 35.4px */
  letter-spacing: 0.6px;
  text-transform: uppercase;
  background: url(${({ backgroundLine }) => backgroundLine});
  background-size: 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  cursor: pointer;
  div {
    height: 21px;
    width: 100%;
    background: url(${({ backgroundLine }) => backgroundLine}) center/cover
      no-repeat;
    margin-left: -6.7px;
    background-size: 150%;
    background-position-x: -131px;
  }
  img {
    position: absolute;
    top: 5px;
    right: 16px;
    transform: translateX(-5px);
    opacity: 0;
    transition: all 0.3s;
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 37px;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    width: 0%;
    right: 0;
    transition: all 0.3s;
  }
`;
