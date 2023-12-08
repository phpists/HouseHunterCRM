import styled from "styled-components";
import { StatusCard } from "../Biling/StatusCard";

export const MobileBilling = ({ data }) => (
  <StyledMobileBilling>
    <StatusCard
      status={data?.active === "1"}
      title={data?.active === "1" ? "Дозволено" : "Заборонено"}
      subtitle="Вхід"
    />
    <StatusCard
      status={data?.active === "1"}
      title={`Сплачено до ${data?.billing_to}`}
      subtitle="Білінг"
    />
  </StyledMobileBilling>
);

const StyledMobileBilling = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  @media (min-width: 850px) {
    display: none;
  }
`;
