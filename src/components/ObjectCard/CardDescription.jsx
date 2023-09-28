import styled from "styled-components";

export const CardDescription = () => (
  <StyledCardDescription className="clickable hide-scroll">
    Оренда 1- кімнатної квартири кухня студія по вул. Шота Руставеллі. В
    квартирі є вся необхідна техніка та меблі, гарна, затишна. Розглядають всіх
    порядних орендарів, без дітей та домашніх улюбленців. Оренда 1- кімнатної
    квартири кухня студія по вул. Шота Руставеллі. В квартирі є вся необхідна
    техніка та меблі, гарна, затишна. Розглядають всіх порядних орендарів, без
    дітей та домашніх улюбленців.
  </StyledCardDescription>
);

const StyledCardDescription = styled.div`
  overflow: hidden;
  color: #fff;
  text-overflow: ellipsis;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  opacity: 0.4;
  @media (max-width: 800px) {
    font-size: 14px;
    max-height: 153px;
    overflow: auto;
    margin: 10px 0 15px;
  }
`;
