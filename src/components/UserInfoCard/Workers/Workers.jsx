import styled from "styled-components";
import { WorkersList } from "./WorkersList/WorkersList";
import { Divider } from "./Divider";

export const Workers = () => {
  return (
    <StyledWorkers>
      <WorkersList />
      <Divider />
      <WorkersList />
    </StyledWorkers>
  );
};

const StyledWorkers = styled.div`
  padding: 6px 17px 6px 6px;
  border-radius: 14px;
  background: var(--bg-10);
  margin-bottom: 15px;
`;
