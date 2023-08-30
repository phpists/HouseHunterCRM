import { styled } from "styled-components";

export const Title = () => (
  <StyledTitle className="flex items-center">
    <div className="number purple">2</div>
    <span>/</span>
    Об’єкти
    <span className="end">та</span>
    <div className="number green">5</div>
    <span>/</span>
    Запити
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%;
  letter-spacing: 0.4px;
  .number {
  }
  span {
    color: rgba(255, 255, 255, 0.2);
  }
  .purple {
    color: #b61feb;
  }
  .green {
    color: #2df47d;
  }
  .end {
    margin: 0 5px;
  }
`;
