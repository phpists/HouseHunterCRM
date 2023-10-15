import styled from "styled-components";
import avatar from "../../../../../assets/images/small-avatar.svg";

export const Info = () => (
  <StyledInfo className="flex items-center clickable" avatar={avatar}>
    <div className="avatar clickable" />
    <div>
      <div className="name clickable">Віталій Дуда</div>
      <div className="id clickable">ID клієнта: 1246</div>
    </div>
  </StyledInfo>
);

const StyledInfo = styled.div`
  margin-bottom: 8px;
  .avatar {
    margin-right: 8px;
    height: 35px;
    width: 35px;
    border-radius: 100%;
    background: url(${({ avatar }) => avatar}) center/cover no-repeat;
  }
  .name {
    color: #fff;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    margin-bottom: 2px;
  }
  .id {
    color: #fff;
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
    opacity: 0.4;
  }
  @media (max-width: 1399.9px) {
    margin-bottom: 0;
  }
  @media (max-width: 700px) {
    margin-bottom: 15px;
  }
`;
