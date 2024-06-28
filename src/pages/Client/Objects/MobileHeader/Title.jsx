import styled from "styled-components";

export const Title = () => <StyledTitle>Обрано запитів 0</StyledTitle>;

const StyledTitle = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%;
  letter-spacing: 0.36px;
`;
