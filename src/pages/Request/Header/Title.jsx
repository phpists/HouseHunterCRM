import styled from "styled-components";

export const Title = () => (
  <StyledTitle>Запит на створення автомобіля оренди</StyledTitle>
);

const StyledTitle = styled.div`
  color: var(--dark-90);
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: normal;
  letter-spacing: 0.36px;
  @media (max-width: 800px) {
    display: none;
  }
`;
