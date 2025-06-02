import styled from "styled-components";
import { Card } from "./Card";
import { useAppSelect } from "../../hooks/redux";

export const Notifications = () => {
  const { notifications } = useAppSelect((state) => state.auth);

  return (
    <StyledNotifications>
      {[...notifications]
        ?.sort((a, b) => b?.date - a?.date)
        ?.map((data) => (
          <Card key={data?.id_hash} data={data} />
        ))}
    </StyledNotifications>
  );
};

const StyledNotifications = styled.div`
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 15px 20px;
  height: calc(100vh - 125px);
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 10px;
`;
