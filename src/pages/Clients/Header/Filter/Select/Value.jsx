import { styled } from "styled-components";

export const Value = ({ value }) => <StyledValue>{value}</StyledValue>;

const StyledValue = styled.div`
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  margin-bottom: 1px;
`;
