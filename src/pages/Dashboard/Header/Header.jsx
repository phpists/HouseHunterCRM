import styled from "styled-components";
import { StepButton } from "./StepButton";
import { InfoButton } from "../InfoButton";

export const Header = () => (
  <StyledHeader>
    <StepButton />
    <InfoButton className="info-btn" />
  </StyledHeader>
);

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (min-width: 1100px) {
    display: none;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    .info-btn {
      display: none;
    }
  }
`;
