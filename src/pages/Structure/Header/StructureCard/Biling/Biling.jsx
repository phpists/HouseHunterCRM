import styled from "styled-components";
import { StatusCard } from "./StatusCard";
import { Divider } from "./Divider";
import { BossCard } from "./BossCard/BossCard";
import { Structure } from "./Structure/Structure";
import { handleCheckBilling } from "../../../../../utilits";

export const Biling = ({ open, onClick, data, user }) => (
  <StyledBiling open={open} onClick={onClick} className="hide-scroll">
    {!data?.isCurrentUser && (
      <>
        <StatusCard
          status={data?.active === "1" || user}
          title={data?.active === "1" || user ? "Дозволено" : "Заборонено"}
          subtitle="Вхід"
        />
        <Divider />
      </>
    )}

    <StatusCard
      status={handleCheckBilling(data?.billing_to)}
      title={
        handleCheckBilling(data?.billing_to)
          ? `Сплачено до ${data?.billing_to}`
          : "Не сплачено"
      }
      subtitle="Білінг"
    />

    {data?.name_parent?.length > 0 ? (
      <>
        {data?.level !== 1 && <Divider />}
        <BossCard data={data} />
      </>
    ) : null}
    <Divider />
    <Structure data={data?.structure_worker} />
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
