import { styled } from "styled-components";

export const Price = () => <StyledPrice>28 320₴</StyledPrice>;

const StyledPrice = styled.div`
  color: #81fb21;
  text-align: right;
  text-overflow: ellipsis;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
`;
