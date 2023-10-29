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
  color: rgba(255, 255, 255, 0.4);
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%;
  letter-spacing: 0.4px;
  .number {
  }
  span {
    color: rgba(255, 255, 255, 0.2);
  }
  .purple {
    color: #b61feb;
    font-weight: 300;
  }
  .green {
    color: #2df47d;
    font-weight: 300;
  }
  .end {
    margin: 0 5px;
  }
`;
