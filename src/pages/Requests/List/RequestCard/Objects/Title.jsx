import styled from "styled-components";

export const Title = ({ count = 0 }) => (
  <StyledTitle className="clickable">
    {Number(count) > 1000 ? "+1000" : count} об'єктів
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  margin-right: 10px;
`;
