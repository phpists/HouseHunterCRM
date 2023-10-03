import styled from "styled-components";
import { StatusCard } from "../Biling/StatusCard";

export const MobileBilling = () => (
  <StyledMobileBilling>
    <StatusCard status={1} title="Дозволено" subtitle="Вхід" />
    <StatusCard status={1} title="Сплачено до 28.07.2023" subtitle="Білінг" />
  </StyledMobileBilling>
);

const StyledMobileBilling = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  @media (min-width: 850px) {
    display: none;
  }
`;
