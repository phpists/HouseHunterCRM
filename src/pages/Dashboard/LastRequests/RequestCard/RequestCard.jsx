import styled from "styled-components";
import { Client } from "./Client/Client";
import { Price } from "./Price/Price";
import { Objects } from "./Objects/Objects";

export const RequestCard = ({
  data,
  id,
  onOpenChat,
  onToggleFavorite,
  onDelete,
}) => (
  <StyledRequestCard>
    <Client data={data} id={id} />
    <Price data={data} id={id} />
    <Objects
      data={data}
      id={data?.id_group}
      onOpenChat={onOpenChat}
      onToggleFavorite={onToggleFavorite}
      onDelete={onDelete}
    />
  </StyledRequestCard>
);

const StyledRequestCard = styled.div`
  padding: 20px;
  border-radius: 9px;
  background: var(--card-bg);
  @media (max-width: 1500px) {
    padding: 10px;
  }
`;
