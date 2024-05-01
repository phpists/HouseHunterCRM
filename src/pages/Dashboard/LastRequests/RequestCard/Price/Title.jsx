import styled from "styled-components";

export const Title = ({ price }) => <StyledTitle> {price}</StyledTitle>;

const StyledTitle = styled.div`
  color: var(--green);
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.28px;
`;
