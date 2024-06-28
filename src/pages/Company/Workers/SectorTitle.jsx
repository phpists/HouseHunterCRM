import { styled } from "styled-components";

export const SectorTitle = ({ title }) => (
  <StyledSectorTitle>{title}</StyledSectorTitle>
);

const StyledSectorTitle = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%;
  letter-spacing: 0.28px;
  text-transform: uppercase;
  opacity: 0.4;
  margin-bottom: 4px;
`;
