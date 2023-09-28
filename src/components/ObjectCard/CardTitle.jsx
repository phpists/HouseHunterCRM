import styled from "styled-components";

export const CardTitle = () => (
  <StyledCardTitle className="clickable">
    Оренда 1 кім квартири п. орлика Дрогобич
  </StyledCardTitle>
);

const StyledCardTitle = styled.div`
  color: #fff;
  /* H3 */
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  margin-bottom: 10px;
`;
