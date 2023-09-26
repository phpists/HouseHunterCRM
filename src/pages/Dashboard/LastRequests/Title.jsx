import styled from "styled-components";

export const Title = () => <StyledTitle>Мої останні запити</StyledTitle>;

const StyledTitle = styled.div`
  margin-bottom: 20px;
  color: #fff;
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
`;
