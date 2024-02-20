import styled from "styled-components";
import emptyAvatar from "../../../../../assets/images/small-avatar.svg";

export const Info = ({ firstName, lastName, idClient, avatar }) => (
  <StyledInfo
    className="flex items-center clickable"
    avatar={avatar?.length === 0 ? emptyAvatar : avatar}
  >
    <div className="avatar clickable" />
    <div>
      <div className="name clickable">
        {firstName ?? ""} {lastName ?? ""}
      </div>
      <div className="id clickable">
        ID клієнта: {idClient?.substring(0, 20)}...
      </div>
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
    flex-shrink: 0;
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
    @media (min-width: 1400px) {
      width: 150px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    @media (min-width: 1500px) {
      width: 200px;
    }
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
    white-space: nowrap;
    @media (min-width: 1400px) {
      width: 150px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    @media (min-width: 1500px) {
      width: 200px;
    }
  }
  @media (max-width: 1399.9px) {
    margin-bottom: 0;
  }
  @media (max-width: 700px) {
    margin-bottom: 15px;
  }
`;
