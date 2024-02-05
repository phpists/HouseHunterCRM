import { styled } from "styled-components";

export const Title = ({ count }) => (
  <StyledTitle>{count < 0 ? 0 : count} Працівників</StyledTitle>
);

const StyledTitle = styled.h3`
  color: #fff;
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
`;
