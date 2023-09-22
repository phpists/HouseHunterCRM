import styled from "styled-components";

export const Title = () => (
  <StyledTitle className="clickable">Статус</StyledTitle>
);

const StyledTitle = styled.div`
  color: #fff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
