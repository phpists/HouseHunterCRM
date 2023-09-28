import styled from "styled-components";
import { Card } from "./Card/Card";

export const NotificationsDropdown = () => {
  return (
    <StyledNotificationsDropdown className="hide-scroll">
      <Card type="calls" messages={["У вас є пропущені дзвінки"]} />
      <Card type="clients" messages={["Вам передано клієнта "]} />
      <Card type="requests" messages={["У вас є протермінований запит"]} />
      <Card
        type="objects"
        messages={[
          "Вам делеговано об'єкт",
          "У вас є протермінований об'єкт",
          "У вас є об'єкти з Streat Base",
        ]}
      />
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
  @media (max-width: 800px) {
    width: 320px;
    right: 0;
    left: unset;
  }
`;
