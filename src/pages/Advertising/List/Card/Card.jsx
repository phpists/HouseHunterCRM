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
  publicateDate,
  status,
  olxInfo,
  title,
  rubricId,
  img,
  onDelete,
  urlResource,
  resource,
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
      <Object
        publicateDate={publicateDate}
        status={status}
        img={img}
        title={title}
        rubricId={rubricId}
      />
      <Divider className="object-divider" />
      <div className="flex items-center  mobile-footer">
        <div className="flex items-center mobile-footer-main ">
          <Platform
            title={
              olxInfo?.data?.name ??
              olxInfo?.data?.phone ??
              olxInfo?.data?.email ??
              olxInfo?.data?.id
            }
            resource={resource}
          />
          {/* <Divider />
          <Agent /> */}
          <Divider className="agent-divider" />
        </div>
        <div className="flex items-center w-full ">
          <Comment />
          <Divider />
          <MoreButton
            noFavorite
            onDelete={onDelete}
            urlResource={urlResource}
          />
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
  .mobile-footer,
  .mobile-footer-main {
    min-width: max-content;
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    .object-divider {
      display: none;
    }
    .mobile-footer {
      width: 100%;
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
