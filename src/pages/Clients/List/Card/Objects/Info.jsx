import { styled } from "styled-components";

export const Info = ({ requestsCount, objectsCount }) => (
  <StyledInfo>
    <div className="flex items-center">
      <span className="green">{requestsCount}</span> Запитів
    </div>
    <div className="flex items-center">
      <span className="purple">{objectsCount}</span> Автомобілів
    </div>
  </StyledInfo>
);

const StyledInfo = styled.div`
  display: grid;
  grid-template-columns: max-content;
  gap: 6px;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%;
  letter-spacing: 0.22px;
  div {
    padding: 5px 8px 2px 7px;
    border-radius: 3px;
    background: var(--card-bg-2);
  }
  span {
    margin-right: 5px;
  }
  .purple {
    color: #c765eb;
  }
  .green {
    color: #2df47d;
  }
`;
