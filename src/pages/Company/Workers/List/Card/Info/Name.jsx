import { styled } from "styled-components";

export const Name = ({ isSelected, name }) => (
  <StyledName isSelected={isSelected} title={name}>
    {name}
  </StyledName>
);

const StyledName = styled.div`
  color: ${({ isSelected }) => (isSelected ? "#50F835" : "#fff")};
  font-family: Overpass;
  font-size: 17px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 20.06px */
  letter-spacing: 0.34px;
  margin-right: 12px;
`;
