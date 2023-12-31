import { styled } from "styled-components";

export const Date = () => <StyledDate>Додана 25.07.2023</StyledDate>;

const StyledDate = styled.h3`
  color: #fff;
  /* Aditional text */
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
