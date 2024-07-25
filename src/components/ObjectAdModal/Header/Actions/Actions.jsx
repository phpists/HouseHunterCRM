import styled from "styled-components";
import { SubmitButton } from "./SubmitButton";
import { CancelButton } from "./CancelButton";

export const Actions = ({ onSubmit, loading, disabled }) => (
  <StyledActions className="flex items-center">
    <SubmitButton onClick={onSubmit} loading={loading} disabled={disabled} />
    {/* <CancelButton disabled={loading} /> */}
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
