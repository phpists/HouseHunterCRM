import styled from "styled-components";

export const Rent = ({ category }) => <StyledRent>{category}</StyledRent>;

const StyledRent = styled.div`
  margin-bottom: 2px;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  letter-spacing: 0.28px;
`;
