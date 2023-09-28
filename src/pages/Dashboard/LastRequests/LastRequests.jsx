import styled from "styled-components";
import { Title } from "./Title";
import { RequestCard } from "./RequestCard/RequestCard";

export const LastRequests = () => (
  <StyledLastRequests>
    <Title />
    <div className="list hide-scroll">
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />
    </div>
  </StyledLastRequests>
);

const StyledLastRequests = styled.div`
  padding: 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  .list {
    min-height: 200px;
    height: calc(100svh - 230px);
    max-height: 620px;
    overflow: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: 10px;
  }
  @media (max-width: 1100px) {
    .list {
      max-height: max-content;
      height: max-content;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 800px) {
    .list {
      grid-template-columns: 1fr;
    }
  }
`;
