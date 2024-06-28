import { styled } from "styled-components";

export const Date = ({ date }) => <StyledDate>Додана {date}</StyledDate>;

const StyledDate = styled.h3`
  color: var(--main-color);
  /* Aditional text */
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
