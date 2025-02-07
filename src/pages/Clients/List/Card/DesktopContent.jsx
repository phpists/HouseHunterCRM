import styled from "styled-components";
import { MainInfo } from "./MainInfo/MainInfo";
import { Phones } from "../../../../components/Phones/Phones";
import { Divider } from "./Divider";
import { PhoneInfo } from "./PhoneInfo";
import { Objects } from "./Objects/Objects";
import { Arrow } from "./Arrow";
import { Comment } from "../../../../components/Comment";
import { MoreButton } from "../../../../components/MoreButton/MoreButton";

export const DesktopContent = ({
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
  onEditComment,
  isDeleted,
  onRestore,
  onDeleteFinally,
  deleteDate,
  onOpenDeleteReason,
}) => (
  <StyledDesktopContent className="flex items-center justify-between hide-scroll card">
    <MainInfo
      name={name}
      id={id}
      dateCreate={dateCreate}
      isDeleted={isDeleted}
      deleteDate={deleteDate}
    />
    <Phones
      phones={phones?.map(({ phone, viber, telegram }) => ({
        phone,
        viber,
        telegram,
      }))}
      classNameContent="desktop-phones"
    />
    <Divider />
    <Comment
      comment={comment}
      className="desktop-comment"
      id={id}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onEditComment={onEditComment}
    />
    <Divider />
    <PhoneInfo agent={agent} agentPhone={agentPhone} />
    <Divider />
    <Objects requestsCount={requestsCount} objectsCount={objectsCount} />
    <div className="flex items-center">
      <MoreButton
        onDelete={onDelete}
        noDelete={!isDelete}
        onFavorite={onAddToFavorite}
        favorite={favorite}
        onSend={onSend}
        isDeleted={isDeleted}
        onRestore={onRestore}
        onDeleteFinally={onDeleteFinally}
        onOpenDeleteReason={onOpenDeleteReason}
      />
      <Arrow id={id} />{" "}
    </div>
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  min-width: max-content;
  position: relative;
  &:hover {
    .arrow svg {
      transform: rotate(0deg);
      opacity: 1;
    }
  }
  .more {
    opacity: 1;
    transform: translateX(0px);
  }
  @media (max-width: 1399.5px) {
    display: none;
  }
  .desktop-phones {
    width: 130px;
  }
  .desktop-comment {
    width: 180px;
    .value {
      width: 130px;
    }
  }
`;
