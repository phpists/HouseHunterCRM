import styled from "styled-components";
import { Client } from "./Client/Client";
import { Price } from "./Price/Price";
import { Objects } from "./Objects/Objects";

export const RequestCard = ({ data, id }) => (
  <StyledRequestCard>
    <Client data={data} id={id} />
    <Price data={data} id={id} />
    <Objects />
  </StyledRequestCard>
);

const StyledRequestCard = styled.div`
  padding: 20px;
  border-radius: 9px;
  background: #3d3d3d;
  @media (max-width: 1100px) {
    padding: 10px;
  }
`;
