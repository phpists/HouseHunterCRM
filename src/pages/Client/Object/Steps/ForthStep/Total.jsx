import { styled } from "styled-components";

export const Total = () => (
  <StyledTotal>
    <span className="title">Усього</span>
    <div className="value">23 000₴</div>
  </StyledTotal>
);

const StyledTotal = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 7px 10px 5px;
  border-radius: 9px;
  background: var(--card-bg-2);
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    letter-spacing: 0.3px;
    opacity: 0.4;
  }
  .value {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    letter-spacing: 0.3px;
  }
`;
