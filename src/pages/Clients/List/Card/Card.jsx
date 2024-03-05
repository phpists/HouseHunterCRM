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
}) => {
  const handleClick = (e) => {
    e.target.classList.contains("card") && onSelect();
  };

  return (
    <StyledCard
      className="hide-scroll card"
      onClick={handleClick}
      selected={selected}
    >
      <DesktopContent
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
      />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 14px;
  border-radius: 15px;
  background: #3d3d3d;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: #484848;
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
