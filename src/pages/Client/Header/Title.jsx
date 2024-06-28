import { styled } from "styled-components";

export const Title = () => <StyledTitle>Повернутися</StyledTitle>;

const StyledTitle = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  @media (max-width: 800px) {
    display: none;
  }
`;
