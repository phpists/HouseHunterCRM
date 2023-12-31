import styled from "styled-components";
import { Arrow } from "../Arrow";
import { MoreButton } from "../../../../../components/MoreButton/MoreButton";

export const ActionsButtons = ({ className, id, onDelete, noDelete }) => (
  <StyledActionsButtons className={`flex flex-col items-center ${className}`}>
    <Arrow id={id} />
    <MoreButton
      className="more-btn"
      noFavorite
      onDelete={onDelete}
      noDelete={noDelete}
    />
  </StyledActionsButtons>
);

const StyledActionsButtons = styled.div`
  width: 24px;
  margin: -48px 0 0 10px;
  flex-shrink: 0;
  @media (max-width: 850px) {
    flex-direction: row;
    margin: 0 0 0 10px;
    width: auto;
    .more {
      display: none !important;
    }
  }
  @media (max-width: 1399.9px) {
    .more-btn {
      opacity: 1;
      transform: translateX(0);
      .dropdown {
        top: 0 !important;
      }
    }
  }
`;
