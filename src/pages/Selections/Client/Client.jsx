import styled from "styled-components";
import smallAvatar from "../../../assets/images/small-avarar-orange.svg";
import { Id } from "./Id";
import { Phones } from "../../../components/Phones/Phones";
import { Comment } from "./Comment/Comment";
import { ReactComponent as ArrowIcon } from "../../../assets/images/clients-arrow.svg";
import { useGetPhonesCodesQuery } from "../../../store/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useActions } from "../../../hooks/actions";

export const Client = ({ clientData, className }) => {
  const { data } = useGetPhonesCodesQuery();
  const navigate = useNavigate();
  const { saveSelectionName } = useActions();

  const handleGoToClient = (e) =>
    e.target.classList.contains("openClient") &&
    navigate(`/client/${clientData?.client?.id_client}`);

  useEffect(() => {
    saveSelectionName(clientData?.name_group);
  }, [clientData]);

  return (
    <StyledClient
      className={`flex items-center justify-between openClient ${className}`}
      onClick={handleGoToClient}
    >
      <div className="flex items-center user-info openClient mr-2">
        <img src={smallAvatar} alt="" className="small-avatar openClient" />
        <div className="name openClient">{clientData?.client?.name ?? "-"}</div>
        <Id id={clientData?.client?.id_client} />
      </div>
      <Phones
        classNameContent="phone-wrapp"
        phones={clientData?.client?.phones?.map(
          ({ id_phone_code, phone, code, telegram, viber }) => ({
            phone: `${
              code ?? data?.find(({ id }) => id === id_phone_code)?.code ?? ""
            }${phone}`,
            telegram,
            viber,
          })
        )}
      />
      <div className="divider openClient"></div>
      <Comment comment={clientData?.comment_group} />
      <div className="divider openClient"></div>
      <ArrowIcon className="arrow-more openClient" />
    </StyledClient>
  );
};

const StyledClient = styled.div`
  padding: 10px;
  background: var(--card-bg);
  margin-bottom: 10px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: max-content max-content max-content 1fr max-content max-content;
  width: 100%;
  cursor: pointer;
  .arrow-more {
    transform: rotate(-45deg);
    opacity: 0.4;
    transition: all 0.3s;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    path {
      fill: #fff;
    }
  }
  &:hover {
    background: var(--hover-card);
    .arrow-more {
      opacity: 1;
      transform: rotate(0deg);
    }
  }
  .small-avatar {
    margin-right: 15px;
    height: 30px;
    width: 30px;
  }
  .name {
    margin-right: 10px;
    font-family: Overpass, sans-serif;
    font-size: 14px;
    font-weight: var(--font-weight-200);
    line-height: 17px;
    letter-spacing: 0.02em;
    text-align: left;
    white-space: nowrap;
    max-width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .divider {
    height: 36px;
    width: 1px;
    background: #ffffff1a;
    margin: 0 20px;
    flex-shrink: 0;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    position: relative;
    display: none;
    .divider {
      width: 100%;
      height: 1px;
      margin: 10px 0;
    }
    .arrow-more {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .user-info {
      margin-bottom: 10px;
    }
  }
`;
