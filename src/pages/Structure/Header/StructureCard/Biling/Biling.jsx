import styled from "styled-components";
import { StatusCard } from "./StatusCard";
import { Divider } from "./Divider";
import { BossCard } from "./BossCard/BossCard";
import { Structure } from "./Structure/Structure";

export const Biling = ({ open, onClick }) => (
  <StyledBiling open={open} onClick={onClick}>
    <StatusCard status={true} title="Дозволено" subtitle="Вхід" />
    <Divider />
    <StatusCard
      status={true}
      title="Сплачено до 28.07.2023"
      subtitle="Білінг"
    />
    <Divider />
    <BossCard />
    <Divider />
    <Structure />
  </StyledBiling>
);

const StyledBiling = styled.div`
  width: ${({ open }) => (open ? "224px" : "0px")};
  transition: all 0.3s;
  overflow-x: hidden;
  margin-right: ${({ open }) => (open ? "10px" : "0px")};
  @media (max-width: 1660px) {
    width: 100%;
  }
  @media (max-width: 850px) {
    display: none;
  }
`;
