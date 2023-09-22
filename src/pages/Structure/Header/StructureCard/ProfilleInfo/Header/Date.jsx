import styled from "styled-components";

export const Date = () => (
  <StyledDate className="notClickable">
    Зареєстровано: 13.10.2022 13:19
  </StyledDate>
);

const StyledDate = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 12.98px */
  letter-spacing: 0.22px;
  opacity: 0.4;
`;