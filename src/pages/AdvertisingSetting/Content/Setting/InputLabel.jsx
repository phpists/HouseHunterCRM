import styled from "styled-components";

export const InputLabel = ({ label }) => (
  <StyledInputLabel>{label}</StyledInputLabel>
);

const StyledInputLabel = styled.div`
  font-size: 15px;
  font-weight: var(--font-weight-100);
  line-height: 17.7px;
  letter-spacing: 0.02em;
  text-align: left;
  @media (max-width: 800px) {
    font-size: 14px;
  }
`;
