import { styled } from "styled-components";

export const Title = () => <StyledTitle>Про компанію</StyledTitle>;

const StyledTitle = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  margin-bottom: 4px;
`;
