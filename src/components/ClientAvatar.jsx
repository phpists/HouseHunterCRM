import { styled } from "styled-components";
import client1Icon from "../assets/images/client1.svg";
import client2Icon from "../assets/images/client2.svg";
import client3Icon from "../assets/images/client3.svg";
import client4Icon from "../assets/images/client4.svg";

const TYPES = {
  1: {
    icon: client1Icon,
    background: "linear-gradient(155deg, #F32D2D 0%, #F38C2D 100%);",
  },
  2: {
    icon: client2Icon,
    background: "linear-gradient(155deg, #2D59F3 0%, #D82DF3 100%);",
  },
  3: {
    icon: client3Icon,
    background: "linear-gradient(155deg, #2D4DF3 0%, #2DF365 100%);",
  },
  4: {
    icon: client4Icon,
    background: "linear-gradient(155deg, #F32D51 0%, #C02DF3 100%);",
  },
};

export const ClientAvatar = ({ type, className }) => (
  <StyledClientAvatar
    className={`flex items-center justify-center ${className}`}
    background={TYPES[type].background}
  >
    <img src={TYPES[type].icon} alt="" />
  </StyledClientAvatar>
);

const StyledClientAvatar = styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border-radius: 100%;
  background: ${({ background }) => background};
  border: 1px solid #fff;
  padding: 12px;
  img {
    height: 100%;
  }
`;
