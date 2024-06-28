import { styled } from "styled-components";

export const Title = () => <StyledTitle>Юрій Олексійович</StyledTitle>;

const StyledTitle = styled.h3`
  color: var(--main-color);
  text-align: center;
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  margin-bottom: 33px;
`;
