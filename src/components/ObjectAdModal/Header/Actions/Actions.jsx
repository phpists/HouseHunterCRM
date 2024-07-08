import styled from "styled-components";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";

export const Actions = () => (
  <StyledActions className="flex items-center">
    <SubmitButton />
    <CancelButton />
  </StyledActions>
);

const StyledActions = styled.div`
  gap: 10px;
  @media (max-width: 800px) {
    width: 100%;
    button {
      width: 50%;
    }
  }
  @media (max-width: 500px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;
