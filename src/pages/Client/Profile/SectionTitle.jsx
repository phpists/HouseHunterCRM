import { styled } from "styled-components";

export const SectionTitle = ({ title }) => (
  <StyledSectionTitle>{title}</StyledSectionTitle>
);

const StyledSectionTitle = styled.div`
  margin-bottom: 5px;
  color: #fff;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  text-transform: uppercase;
  opacity: 0.4;
  margin-left: 6px;
`;
