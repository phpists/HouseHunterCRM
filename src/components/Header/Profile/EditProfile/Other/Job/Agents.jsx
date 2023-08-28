import { styled } from "styled-components";

export const Agents = () => (
  <StyledAgents className="agents">
    <div className="title ">15</div>
    <div className="subtitle">Агентів</div>
  </StyledAgents>
);

const StyledAgents = styled.div`
  padding-left: 10px;
  border-left: 1px solid rgba(44, 44, 44, 0.2);
`;
