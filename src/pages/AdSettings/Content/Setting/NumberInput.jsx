import styled from "styled-components";

export const NumberInput = ({ label }) => (
  <StyledNumberInput className="flex items-center justify-between">
    <span>{label}</span> <input type="number" />
  </StyledNumberInput>
);

const StyledNumberInput = styled.div`
  gap: 5px;
  padding: 4px 10px 4px 7px;
  height: 22px;
  border-radius: 7px;
  margin-left: 10px;
  min-width: 113px;
  background: var(--range-input-bg);
  span {
    font-size: 11px;
    font-weight: var(--font-weight-200);
    line-height: 14.98px;
    letter-spacing: 0.02em;
    text-align: left;
    opacity: var(--opacity-light);
  }
  input {
    text-align: right;
    font-size: 14px;
    font-weight: var(--font-weight-200);
    line-height: 16.52px;
    letter-spacing: 0.02em;
    text-align: right;
    opacity: var(--opacity-light);
    width: 50px;
  }
  @media (max-width: 800px) {
    margin: 0;
  }
`;
