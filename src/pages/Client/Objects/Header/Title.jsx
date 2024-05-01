import { styled } from "styled-components";

export const Title = ({ requestsCount, objectsCount }) => (
  <StyledTitle className="flex items-center">
    <div className="number purple">{objectsCount}</div>
    <span>/</span>
    Об’єкти
    <span className="end">та</span>
    <div className="number green">{requestsCount}</div>
    <span>/</span>
    Запити
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: var(--second-color);
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%;
  letter-spacing: 0.4px;
  .number {
  }
  span {
    color: var(--bg-20);
  }
  .purple {
    color: #b61feb;
    font-weight: var(--font-weight-light);
  }
  .green {
    color: #2df47d;
    font-weight: var(--font-weight-light);
  }
  .end {
    margin: 0 5px;
  }
`;
