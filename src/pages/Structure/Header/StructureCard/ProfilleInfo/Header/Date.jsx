import styled from "styled-components";

export const Date = ({ date }) => (
  <StyledDate className="notClickable">Зареєстровано: {date}</StyledDate>
);

const StyledDate = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 12.98px */
  letter-spacing: 0.22px;
  opacity: 0.4;
`;
