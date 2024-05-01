import styled from "styled-components";

export const Name = ({ name }) => (
  <StyledName className="clickable">{name}</StyledName>
);

const StyledName = styled.div`
  margin-bottom: 2px;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
`;
