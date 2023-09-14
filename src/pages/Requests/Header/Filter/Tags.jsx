import styled from "styled-components";
import { CheckOption } from "../../../../components/CheckOption";

export const Tags = () => (
  <StyledTags>
    <CheckOption label="Тег" />
    <CheckOption label="Тег" />
    <CheckOption label="Тег" />
    <CheckOption label="Тег" />
  </StyledTags>
);

const StyledTags = styled.div`
  padding: 8px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 25px;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 6px;
`;
