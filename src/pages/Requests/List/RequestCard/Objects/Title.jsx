import styled from "styled-components";

export const Title = () => (
  <StyledTitle className="clickable">645 об'єктів</StyledTitle>
);

const StyledTitle = styled.div`
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  margin-bottom: 4px;
`;
