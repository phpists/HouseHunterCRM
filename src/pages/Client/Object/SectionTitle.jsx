import { styled } from "styled-components";

export const SectionTitle = ({ title }) => (
  <StyledSectionTitle>{title}</StyledSectionTitle>
);

const StyledSectionTitle = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  text-transform: uppercase;
  opacity: 0.4;
  margin-bottom: 4px;
`;
