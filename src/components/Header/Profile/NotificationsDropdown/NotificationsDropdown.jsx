import styled from "styled-components";
import { Card } from "./Card/Card";
import { useEffect, useState } from "react";
import { useAppSelect } from "../../../../hooks/redux";
import { useLocation } from "react-router-dom";

export const NotificationsDropdown = ({
  data,
  open,
  closed,
  onClose,
  onToggleOpen,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const { search } = useLocation();

  return (
    <StyledNotificationsDropdown
      open={open}
      onClick={() => onToggleOpen(false)}
    >
      {(data?.calls || data?.telegramMessege || data?.xCorpNotify) && (
        <Card
          type="calls"
          messages={[data?.calls, data?.telegramMessege, data?.xCorpNotify]}
          onClose={() => onClose("calls")}
          links={[
            search === "?view=true"
              ? "/calls?view=refresh"
              : "/calls?view=true",
            "/calls?telegram=true",
            "/calls?site=true",
          ]}
        />
      )}
      {data?.chatMessege && (
        <Card
          type="requests"
          messages={[data?.chatMessege]}
          onClose={() => onClose("chatMessege")}
          links={["/requests?showUnreadMessege=true"]}
        />
      )}
      {data?.requestDtDeadline && (
        <Card
          type="requests"
          messages={[data?.requestDtDeadline]}
          links={[
            search === "?showDeadline=true"
              ? "/requests?showDeadline=refresh"
              : "/requests?showDeadline=true",
          ]}
          onClose={() => onClose("requestDtDeadline")}
        />
      )}
      {data?.objectDeadline && (
        <Card
          type="objects"
          messages={[data?.objectDeadline]}
          links={["/objects?showDeadline=true"]}
          onClose={() => onClose("objectDeadline")}
        />
      )}
      {data?.needs_moderation_after_adding_from_street_base && (
        <Card
          type="objects"
          messages={["Є автомобілі перенесені з StreetBase"]}
          links={[
            search === "?moderationAfterStreetBase=true"
              ? "/objects?moderationAfterStreetBase=refresh"
              : "/objects?moderationAfterStreetBase=true",
          ]}
          onClose={() =>
            onClose("needs_moderation_after_adding_from_street_base")
          }
        />
      )}
      {data?.objectLiquidity && (
        <Card
          type="objects"
          messages={[data?.objectLiquidity]}
          links={["/objects?showLiquidity=true"]}
          onClose={() => onClose("objectLiquidity")}
        />
      )}
      {data?.birthday?.length > 0 && (
        <Card
          type="clients"
          messages={data?.birthday}
          info
          onClose={() => onClose("birthday")}
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
  background: var(--second-bg);
  z-index: 1000;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 2px;
  max-height: 273px;
  overflow: auto;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  opacity: ${({ open }) => (open ? "1" : "0")};
  @media (max-width: 1200px) {
    width: 320px;
    right: 0;
    left: unset;
  }
`;
