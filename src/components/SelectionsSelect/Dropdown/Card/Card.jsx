import styled from "styled-components";
import { Name } from "./Name";
import { Client } from "./Client";

export const Card = ({ title, userName, phone, active, onClick }) => (
  <StyledCard className={`${active && "active"}`} onClick={onClick}>
    <Name name={title} />
    <Client name={userName} phone={phone} />
  </StyledCard>
);

const StyledCard = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: var(--selection-bg);
  width: 100%;
  cursor: pointer;
  transition: all 0.3s;
  &:hover,
  &.active {
    background: var(--selection-bg-hover);
  }
`;
