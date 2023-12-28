import styled from "styled-components";

export const Title = ({ count }) => (
  <StyledTitle>{Number(count) > 99 ? "+99" : count} об'єктів</StyledTitle>
);

const StyledTitle = styled.div`
  color: #fff;
  /* Aditional text */
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  margin-bottom: 4px;
  white-space: nowrap;
`;
