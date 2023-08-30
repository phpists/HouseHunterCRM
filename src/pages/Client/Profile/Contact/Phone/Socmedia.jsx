import { styled } from "styled-components";
import viberIcon from "../../../../../assets/images/viber.svg";
import telegramIcon from "../../../../../assets/images/telegram.svg";
import { ReactComponent as CheckIcon } from "../../../../../assets/images/circle-green-check.svg";

const TYPES = {
  viber: { icon: viberIcon, color: "#7360F2" },
  telegram: { icon: telegramIcon, color: "#3D8ECC" },
};

export const Socmedia = ({ type, active, onClick, className }) => (
  <StyledSocmedia
    className={`flex items-center justify-between ${className} ${
      active && "active"
    }`}
    onClick={onClick}
    color={TYPES[type].color}
  >
    <img src={TYPES[type].icon} alt="" />
    <div className="divider" />
    <CheckIcon />
  </StyledSocmedia>
);

const StyledSocmedia = styled.div`
  padding: 2px;
  border-radius: 6px;
  width: 48px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s;
  img {
    transition: all 0.3s;
    transform: translateX(50%);
  }
  .divider {
    width: 1px;
    height: 18px;
    background: rgba(255, 255, 255, 0.2);
  }
  path {
    fill: #fff;
    opacity: 0.4;
  }

  .divider,
  path {
    opacity: 0;
    transition: all 0.3s;
  }
  &:hover,
  &.active {
    background: rgba(255, 255, 255, 0.3);
    .divider,
    path {
      opacity: 1;
    }
    img {
      transform: translateX(0);
    }
  }
  &.active {
    background: ${({ color }) => color} !important;
  }
`;
