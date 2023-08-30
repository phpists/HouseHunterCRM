import { styled } from "styled-components";
import armIcon from "../../../../assets/images/arm-emoji.png";

export const PhoneInfo = () => (
  <StyledPhoneInfo className="flex items-start">
    <div>
      <div className="name">Мицавка Юрій</div>
      <div className="phone">+38 (067) 114 47 77</div>
    </div>
    <img src={armIcon} alt="" />
  </StyledPhoneInfo>
);

const StyledPhoneInfo = styled.div`
  padding: 7px 7px 6px 8px;
  border-radius: 6px;
  background: #4f4f4f;
  cursor: pointer;
  transition: all 0.3s;
  flex-shrink: 0;

  .name {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
  }
  .phone {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }

  img {
    margin-left: 29px;
  }
  &:hover {
    background: #656565;
  }
`;
