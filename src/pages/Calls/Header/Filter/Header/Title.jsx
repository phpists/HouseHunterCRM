import { styled } from "styled-components";

export const Title = () => (
  <StyledTitle className="flex items-center">Пошук</StyledTitle>
);

const StyledTitle = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  span {
    color: rgba(255, 255, 255, 0.3);
    margin: 0 5px;
  }
`;
