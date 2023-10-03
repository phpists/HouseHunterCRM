import { styled } from "styled-components";

export const Title = () => <StyledTitle>3 покази на сьгодні</StyledTitle>;

const StyledTitle = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  @media (max-width: 800px) {
    display: none;
  }
`;
