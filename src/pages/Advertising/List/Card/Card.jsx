import { styled } from "styled-components";
import { Object } from "./Object/Object";
import { Divider } from "./Divider";
import { Platform } from "./Platform";
import { Agent } from "./Agent/Agent";
import { Comment } from "./Comment";
import { MoreButton } from "../../../../components/MoreButton/MoreButton";

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
      <Object />
      <Divider className="object-divider" />
      <div className="flex items-center w-full mobile-footer">
        <div className="flex items-center w-full ">
          <Platform />
          <Divider />
          <Agent />
          <Divider className="agent-divider" />
        </div>
        <div className="flex items-center w-full ">
          <Comment />
          <Divider />
          <MoreButton />
        </div>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
  background: var(--card-bg-5);
  transition: all 0.3s;
  cursor: pointer;
  overflow-x: hidden;
  position: relative;
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
  .divider {
    display: none !important;
  }
  .more {
    opacity: 1;
    transform: translateX(0px);
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    .object-divider {
      display: none;
    }
  }
  @media (max-width: 700px) {
    .agent-divider {
      display: none;
    }
    .mobile-footer {
      flex-direction: column;
    }
  }
`;
