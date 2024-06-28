import { styled } from "styled-components";

export const Title = () => <StyledTitle>Обрати</StyledTitle>;

const StyledTitle = styled.div`
  margin-right: 11px;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  opacity: 0.4;
  padding: 4px 0 2px;
`;
