import styled from "styled-components";

export const Title = ({ count }) => (
  <StyledTitle>{Number(count) > 1000 ? "+1000" : count} об'єктів</StyledTitle>
);

const StyledTitle = styled.div`
  color: var(--main-color);
  /* Aditional text */
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  margin-bottom: 4px;
  white-space: nowrap;
`;
