import { styled } from "styled-components";

export const Info = () => (
  <StyledInfo>
    <div className="flex items-center">
      <span className="orange">12</span> Запитiв
    </div>
    <div className="flex items-center">
      <span className="blue">3</span> Об'єкта
    </div>
  </StyledInfo>
);

const StyledInfo = styled.div`
  display: grid;
  grid-template-columns: max-content;
  gap: 6px;
  color: #fff;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%;
  letter-spacing: 0.22px;
  div {
    padding: 5px 8px 2px 7px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.1);
  }
  span {
    margin-right: 5px;
  }
  .orange {
    color: #ffaf50;
  }
  .blue {
    color: #44ebe1;
  }
`;
