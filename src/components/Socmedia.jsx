import { styled } from "styled-components";
import viberIcon from "../assets/images/viber.svg";
import viberBlackIcon from "../assets/images/viber-black.svg";
import telegramIcon from "../assets/images/telegram.svg";
import telegramBlackIcon from "../assets/images/telegram-black.svg";
import { ReactComponent as CheckIcon } from "../assets/images/circle-green-check.svg";
import { ReactComponent as ArrowIcon } from "../assets/images/socmedia-arrow.svg";

const TYPES = {
  viber: { icon: viberIcon, iconDark: viberBlackIcon, color: "#7360F2" },
  telegram: {
    icon: telegramIcon,
    iconDark: telegramBlackIcon,
    color: "#3D8ECC",
  },
};

export const Socmedia = ({
  type,
  active,
  onClick,
  className,
  open,
  readOnly,
  phone,
  activeColor,
}) => {
  const phoneValue =
    type === "viber" ? `viber://chat?number=${phone}` : `https://t.me/${phone}`;
  return (
    <StyledSocmedia
      className={`flex items-center justify-between socmediaWrapper ${className} ${
        active && "active"
      } ${phone && "phone"}`}
      onClick={onClick}
      color={activeColor ?? TYPES[type].color}
      readOnly={readOnly}
      href={phone ? phoneValue : undefined}
      target={phone && type === "telegram" ? "_blank" : undefined}
    >
      <img src={TYPES[type].icon} alt="" className="socmedia-light" />
      <img src={TYPES[type].iconDark} alt="" className="socmedia-dark" />
      {phone ? null : (
        <>
          {" "}
          <div className="divider" />
          {open ? <ArrowIcon /> : <CheckIcon />}
        </>
      )}
    </StyledSocmedia>
  );
};

const StyledSocmedia = styled.a`
  padding: 2px;
  border-radius: 6px;
  width: 48px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.3s;
  .socmedia-dark {
    display: none;
  }
  img {
    transition: all 0.3s;
    transform: translateX(50%);
  }
  .divider {
    width: 1px;
    height: 18px;
    background: var(--bg-20);
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
    ${({ readOnly }) =>
      !readOnly &&
      ` background: rgba(255, 255, 255, 0.3);
    .divider,
    path {
      opacity: 1;
    }
    img {
      transform: translateX(0);
    }
    `}
  }
  &.active {
    background: ${({ color }) => color} !important;
    .white-fill-svg {
      fill: #fff !important;
    }
    .white-stroke-svg {
      stroke: #fff !important;
    }
    .socmedia-dark {
      display: none !important;
    }
    .socmedia-light {
      display: block !important;
    }
    .divider {
      background: rgba(255, 255, 255, 0.2) !important;
    }
  }
  &.phone {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background: var(--card-bg-3);
    padding: 6px;
    border-radius: 6px;
    img {
      transform: translate(0, 0);
    }
  }
`;
