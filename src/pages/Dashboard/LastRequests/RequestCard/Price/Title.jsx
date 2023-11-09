import styled from "styled-components";

export const Title = ({ price }) => <StyledTitle>до {price}$</StyledTitle>;

const StyledTitle = styled.div`
  color: #81fb21;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.28px;
`;
