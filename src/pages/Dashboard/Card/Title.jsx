import styled from "styled-components";

export const Title = ({ title }) => <StyledTitle>{title}</StyledTitle>;

const StyledTitle = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  margin-bottom: 2px;
`;
