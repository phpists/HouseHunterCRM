import styled from "styled-components";
import { Title } from "./Title";
import { Description } from "./Description";
import { Status } from "./Status";

export const Info = () => (
  <StyledInfo>
    <div>
      <Title />
      <Description text="Оренда квартири" />
    </div>
    <div>
      <Status status="active" />
      <Description text="з 05.06.2024" />
    </div>
  </StyledInfo>
);

const StyledInfo = styled.div`
  background: var(--dark-card-bg);
  padding: 10px;
  border-radius: 9px;
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 20px;
  width: 100%;
`;
