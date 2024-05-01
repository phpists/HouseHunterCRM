import { styled } from "styled-components";

export const CardTitle = ({ title }) => (
  <StyledCardTitle>{title}</StyledCardTitle>
);

const StyledCardTitle = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  text-transform: uppercase;
  opacity: 0.4;
  margin-bottom: 15px;
`;
