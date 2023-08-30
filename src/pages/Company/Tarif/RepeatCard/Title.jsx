import { styled } from "styled-components";

export const Title = () => <StyledTitle>+1 місяць</StyledTitle>;

const StyledTitle = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  margin-bottom: 1px;
`;
