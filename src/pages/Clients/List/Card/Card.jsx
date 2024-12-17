import { styled } from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent/MobileContent";

export const Card = ({
  selected,
  onSelect,
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
}) => {
  const handleClick = (e) => {
    e.target.classList.contains("card") && onSelect();
  };

  return (
    <StyledCard
      className={`hide-scroll card list-card-wrapper ${selected && "selected"}`}
      onClick={handleClick}
      selected={selected}
    >
      <DesktopContent
        name={name}
        id={id}
        dateCreate={dateCreate}
        phones={phones}
        requestsCount={"0*"}
        objectsCount={"0*"}
        comment={comment}
        onDelete={onDelete}
        isDelete={isDelete}
        onAddToFavorite={onAddToFavorite}
        favorite={favorite}
        agent={agent}
        agentPhone={agentPhone}
        onSend={onSend}
        firstName={firstName}
        lastName={lastName}
        email={email}
        onEditComment={onEditComment}
        isDeleted={isDeleted}
        onRestore={onRestore}
        onDeleteFinally={onDeleteFinally}
        deleteDate={deleteDate}
        onOpenDeleteReason={onOpenDeleteReason}
      />
      <MobileContent
        name={name}
        id={id}
        dateCreate={dateCreate}
        phones={phones}
        requestsCount={requestsCount}
        objectsCount={objectsCount}
        comment={comment}
        onDelete={onDelete}
        isDelete={isDelete}
        onAddToFavorite={onAddToFavorite}
        favorite={favorite}
        agent={agent}
        agentPhone={agentPhone}
        onSend={onSend}
        firstName={firstName}
        lastName={lastName}
        email={email}
        onEditComment={onEditComment}
        isDeleted={isDeleted}
        onRestore={onRestore}
        onDeleteFinally={onDeleteFinally}
        deleteDate={deleteDate}
        onOpenDeleteReason={onOpenDeleteReason}
      />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 14px;
  border-radius: 15px;
  background: var(--card-bg-5);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: var(--hover-card);
  }
  ${({ selected }) => selected && "border: 1.4px solid #FFF;"}
  .commet-value, .desktop-comment {
    textarea {
      white-space: normal;
      max-height: 150px !important;
      overflow: visible;
    }
  }
`;
