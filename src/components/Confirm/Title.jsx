import styled from "styled-components";

export const Title = ({ title }) => <StyledTitle>{title}</StyledTitle>;

const StyledTitle = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 18px;
  font-style: normal;
  font-weight: 200;
  line-height: normal;
  letter-spacing: 0.36px;
  text-align: center;
`;
