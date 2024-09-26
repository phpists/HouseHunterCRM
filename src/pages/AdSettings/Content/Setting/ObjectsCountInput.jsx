import styled from "styled-components";
import { InputLabel } from "./InputLabel";
import { NumberInput } from "./NumberInput";

export const ObjectsCountInput = () => (
  <StyledObjectsCountInput className="flex items-center justify-between">
    <InputLabel label="Обмежити кількість опублікованих об’єктів" />
    <div className="flex items-center inputs">
      <NumberInput label="Від" />
      <NumberInput label="До" />
    </div>
  </StyledObjectsCountInput>
);

const StyledObjectsCountInput = styled.div`
  padding: 0 10px;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: start;
    gap: 10px;
    .inputs {
      gap: 10px;
    }
  }
`;
