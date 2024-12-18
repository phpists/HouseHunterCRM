import { styled } from "styled-components";

export const Name = ({ isScrolled }) => (
  <StyledName isScrolled={isScrolled}>Віталій Дуда</StyledName>
);

const StyledName = styled.div`
  color: var(--main-color);
  text-align: center;
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  margin-bottom: 5px;
  ${({ isScrolled }) => isScrolled && "margin: 0 10px 0;"}
`;
