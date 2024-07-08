import styled from "styled-components";

export const Description = ({ text }) => (
  <StyledDescription>{text}</StyledDescription>
);

const StyledDescription = styled.div`
  font-size: 11px;
  font-weight: var(--font-weight-100);
  line-height: 14.98px;
  letter-spacing: 0.02em;
  text-align: left;
  opacity: var(--opacity-light);
`;
