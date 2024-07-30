import styled from "styled-components";
import { Actions } from "./Actions/Actions";
import { StatusButton } from "./StatusButton";
import { StatusDate } from "./StatusDate";

export const Header = ({ onSubmit, loading, disabled }) => (
  <StyledHeader className="flex items-center justify-between">
    <div className="flex items-center status-btns">
      {/* <StatusButton type="actual" />
      <StatusDate /> */}
    </div>
    <Actions onSubmit={onSubmit} loading={loading} disabled={disabled} />
  </StyledHeader>
);

const StyledHeader = styled.div`
  /* margin-bottom: 40px; */
  @media (max-width: 800px) {
    flex-direction: column;
    gap: 10px;
    .status-btns {
      width: 100%;
      gap: 10px;
    }
  }
  @media (max-width: 500px) {
    .status-btns {
      flex-direction: column;
    }
  }
`;
