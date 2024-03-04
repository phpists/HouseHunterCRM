import styled from "styled-components";
import { MainInfo } from "../MainInfo/MainInfo";
import { Phones } from "../../../../../components/Phones/Phones";
import { PhoneInfo } from "../PhoneInfo";
import { Objects } from "../Objects/Objects";
import { Comment } from "../../../../../components/Comment";
import { ActionsButtons } from "./ActionsButtons";

export const MobileContent = ({
  name,
  id,
  dateCreate,
  phones,
  requestsCount,
  objectsCount,
  comment,
  onDelete,
  isDelete,
  onAddToFavorite,
  favorite,
  agent,
  agentPhone,
  onSend,
  firstName,
  lastName,
  email,
}) => (
  <StyledMobileContent className="flex items-center hide-scroll card">
    <div className="w-full">
      <div className="w-full header-content">
        <div className="w-full row-wrapper">
          <div className="flex items-center main-info-wrapper">
            <div className="flex items-center justify-between w-full">
              <MainInfo name={name} id={id} dateCreate={dateCreate} />
              <ActionsButtons className="mobile-actions" id={id} />
            </div>
            <Phones
              className="mobile-phones-wrapper"
              classNameContent="mobile-phones-content-wrapper"
              phones={phones?.map(({ phone, viber, telegram }) => ({
                phone,
                viber,
                telegram,
              }))}
            />
          </div>
          <PhoneInfo agent={agent} agentPhone={agentPhone} />
        </div>
      </div>
      <div className=" w-full row-wrapper">
        <Objects requestsCount={requestsCount} objectsCount={objectsCount} />
        <Comment
          comment={comment}
          id={id}
          firstName={firstName}
          lastName={lastName}
          email={email}
          className="commet-value"
        />
      </div>
    </div>
    <ActionsButtons
      className="laptop-actions"
      id={id}
      onDelete={onDelete}
      noDelete={!isDelete}
      onAddToFavorite={onAddToFavorite}
      favorite={favorite}
      onSend={onSend}
    />
  </StyledMobileContent>
);

const StyledMobileContent = styled.div`
  width: 100%;
  /* overflow: hidden; */
  &:hover {
    .arrow svg {
      transform: rotate(0deg);
      opacity: 1;
    }
    .more {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  .row-wrapper {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 8px;
    align-items: center;
  }

  .mobile-phones-content-wrapper {
    width: 30svw;
  }

  .header-content {
    margin-bottom: 8px;
  }

  .mobile-actions {
    display: none;
  }

  .commet-value {
    .value {
      width: 130px;
    }
  }
  @media (min-width: 1400px) {
    display: none;
  }

  @media (max-width: 1000px) {
    .mobile-phones-content-wrapper {
      width: 20svw;
      min-width: 200px;
    }
  }
  @media (max-width: 850px) {
    .row-wrapper {
      grid-template-columns: 1fr;
      gap: 6px;
    }
    .main-info-wrapper {
      flex-direction: column;
      align-items: start;
    }
    .laptop-actions {
      display: none;
    }
    .mobile-actions {
      display: flex;
    }
    .mobile-phones-content-wrapper {
      width: calc(100svw - 150px);
    }
  }
`;
