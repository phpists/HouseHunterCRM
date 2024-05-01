import { styled } from "styled-components";

export const Label = ({ label }) => (
  <StyledLabel className="selectLabel-wrapper">
    <span className="label">{label}</span>
  </StyledLabel>
);

const StyledLabel = styled.div`
  position: relative;
  text-transform: capitalize;
  .label {
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
