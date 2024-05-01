import styled from "styled-components";
import emptyAvatar from "../../../../../assets/images/small-avatar.svg";
import { Id } from "./Id";
import { handleFormatDate } from "../../../../../utilits";
import { useNavigate } from "react-router-dom";

export const Info = ({ firstName, lastName, idClient, avatar, dateCreate }) => {
  const navigate = useNavigate();

  const handleOpenClient = (e) => {
    if (!e.target.classList?.contains("id")) {
      navigate(`/client/${idClient}`);
    }
  };

  return (
    <StyledInfo
      className="flex items-center"
      avatar={avatar?.length === 0 || !avatar ? emptyAvatar : avatar}
      onClick={handleOpenClient}
    >
      <div className="avatar" />
      <div>
        <div className="clientCard flex items-center">
          <div className="name" title={`${firstName ?? ""} ${lastName ?? ""}`}>
            {firstName ?? ""} {lastName ?? ""}
          </div>
          <div className="id">
            <Id id={idClient} />
          </div>
        </div>
        <div className="name date labelItem">
          Створено {handleFormatDate(Number(dateCreate) * 1000, true)}
        </div>
      </div>
    </StyledInfo>
  );
};

const StyledInfo = styled.div`
  margin-bottom: 8px;
  padding: 1px;
  border-radius: 9px;
  padding: 3px 5px;
  transition: all 0.3s;
  &:hover {
    border-radius: 9px;
    background: var(--card-bg-2);
  }
  .avatar {
    margin-right: 8px;
    height: 35px;
    width: 35px;
    border-radius: 100%;
    background: url(${({ avatar }) => avatar}) center/cover no-repeat;
    flex-shrink: 0;
  }
  .name {
    color: var(--main-color);
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
    font-weight: var(--font-weight-light);
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
