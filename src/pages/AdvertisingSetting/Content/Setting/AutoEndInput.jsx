import styled from "styled-components";
import { InputLabel } from "./InputLabel";
import { NumberInput } from "./NumberInput";

export const AutoEndInput = () => (
  <StyledAutoEndInput className="flex items-center justify-between">
    <InputLabel label="Автоматично знімати з публікації через" />
    <div className="flex items-center">
      <NumberInput label="днів" />
    </div>
  </StyledAutoEndInput>
);

const StyledAutoEndInput = styled.div`
  padding: 0 10px;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: start;
    gap: 10px;
  }
`;
