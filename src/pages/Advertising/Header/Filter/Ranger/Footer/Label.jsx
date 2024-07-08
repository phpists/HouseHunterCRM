import { styled } from "styled-components";

export const Label = ({ label }) => <StyledLabel>{label}</StyledLabel>;

const StyledLabel = styled.div`
  color: var(--main-color);
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
