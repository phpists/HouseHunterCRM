import styled from "styled-components";
import emptyAvatar from "../../../../../assets/images/small-avatar.svg";
import { Id } from "./Id";
import { handleFormatDate } from "../../../../../utilits";

export const Info = ({ firstName, lastName, idClient, avatar, dateCreate }) => (
  <StyledInfo
    className="flex items-center clickable"
    avatar={avatar?.length === 0 || !avatar ? emptyAvatar : avatar}
  >
    <div className="avatar clickable" />
    <div>
      <div className="flex items-center">
        <div
          className="name clickable"
          title={`${firstName ?? ""} ${lastName ?? ""}`}
        >
          {firstName ?? ""} {lastName ?? ""}
        </div>
        <div className=" clickable">
          <Id id={idClient} />
        </div>
      </div>
      <div className="name date">
        Створено {handleFormatDate(Number(dateCreate) * 1000, true)}
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
    @media (min-width: 1400px) {
      width: 130px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    @media (min-width: 1500px) {
      width: 180px;
    }
  }
  .date {
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  @media (max-width: 1399.9px) {
    margin-bottom: 0;
  }
  @media (max-width: 700px) {
    margin-bottom: 15px;
  }
`;
