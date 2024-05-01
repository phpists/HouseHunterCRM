import styled from "styled-components";

export const SectionTitle = ({ title }) => (
  <StyledSectionTitle>{title}</StyledSectionTitle>
);

const StyledSectionTitle = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  text-transform: uppercase;
  margin-bottom: 14px;
  opacity: 0.4;
  text-align: left;
`;
