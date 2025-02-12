import styled from "styled-components";

export const Title = () => (
  <StyledTitle className="steps-title">Пам’ятка для початку роботи</StyledTitle>
);

const StyledTitle = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: normal;
  letter-spacing: 0.4px;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;
