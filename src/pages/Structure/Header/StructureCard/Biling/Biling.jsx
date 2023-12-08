import styled from "styled-components";
import { StatusCard } from "./StatusCard";
import { Divider } from "./Divider";
import { BossCard } from "./BossCard/BossCard";
import { Structure } from "./Structure/Structure";

export const Biling = ({ open, onClick, data }) => (
  <StyledBiling open={open} onClick={onClick}>
    <StatusCard
      status={data?.active === "1"}
      title={data?.active === "1" ? "Дозволено" : "Заборонено"}
      subtitle="Вхід"
    />
    <Divider />
    <StatusCard
      status={data?.active === "1"}
      title={`Сплачено до ${data?.billing_to}`}
      subtitle="Білінг"
    />
    {data?.name_parent?.length > 0 ? (
      <>
        <Divider />
        <BossCard data={data} />
      </>
    ) : null}
    <Divider />
    <Structure />
  </StyledBiling>
);

const StyledBiling = styled.div`
  width: ${({ open }) => (open ? "224px" : "0px")};
  transition: all 0.3s;
  overflow-x: hidden;
  margin-right: ${({ open }) => (open ? "10px" : "0px")};
  @media (max-width: 1399.9px) {
    width: 100%;
  }
  @media (max-width: 850px) {
    display: none;
  }
  @media (min-width: 1400px) {
    width: ${({ open }) => (open ? "200px" : "0px")};
  }
  @media (min-width: 1600px) {
    width: ${({ open }) => (open ? "224px" : "0px")};
  }
`;
