import styled from "styled-components";

export const Subtitle = () => (
  <StyledSubtitle>
    чекайте повідомлення від <br /> модератору системи
  </StyledSubtitle>
);

const StyledSubtitle = styled.div`
  color: var(--white-color);
  text-align: center;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  letter-spacing: 0.28px;
  margin-top: 4px;
`;
