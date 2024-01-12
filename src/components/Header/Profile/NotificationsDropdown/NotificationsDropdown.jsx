import styled from "styled-components";
import { Card } from "./Card/Card";

export const NotificationsDropdown = ({ data }) => {
  return (
    <StyledNotificationsDropdown className="hide-scroll">
      {data?.birthday?.length > 0 && (
        <Card type="clients" messages={[data?.birthday[0]]} info />
      )}
      {data?.objectDeadline && (
        <Card
          type="objects"
          messages={[data?.objectDeadline]}
          link="/objects?showDeadline=true"
        />
      )}
      {data?.objectLiquidity && (
        <Card
          type="objects"
          messages={[data?.objectLiquidity]}
          link="/objects?showLiquidity=true"
        />
      )}
      {data?.requestDtDeadline && (
        <Card
          type="requests"
          messages={[data?.requestDtDeadline]}
          link="/requests?showDeadline=true"
        />
      )}
      {data?.calls && (
        <Card type="calls" messages={[data?.calls]} link="/calls?view=true" />
      )}
      {data?.chatMessege && (
        <Card
          type="requests"
          messages={[data?.chatMessege]}
          link="/requests?showUnreadMessege=true"
        />
      )}
    </StyledNotificationsDropdown>
  );
};

const StyledNotificationsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4.5px);
  width: 100%;
  left: 0;
  padding: 10px;
  border-radius: 9px;
  background: #474747;
  z-index: 1000;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 2px;
  max-height: 273px;
  overflow: auto;
  @media (max-width: 1200px) {
    width: 320px;
    right: 0;
    left: unset;
  }
`;
