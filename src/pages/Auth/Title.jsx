import { styled } from "styled-components";

export const Title = ({ title, className }) => (
  <StyledTitle className={`${className}`}>{title}</StyledTitle>
);

const StyledTitle = styled.h2`
  color: var(--main-color);
  text-align: center;
  font-family: Overpass;
  font-size: 26px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%;
  letter-spacing: 0.52px;
`;
