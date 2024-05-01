import { styled } from "styled-components";

export const Name = ({ isSelected, name }) => (
  <StyledName isSelected={isSelected} title={name}>
    {name}
  </StyledName>
);

const StyledName = styled.div`
  color: ${({ isSelected }) =>
    isSelected ? "var(--green-light-2)" : "var(--main-color)"};
  font-family: Overpass;
  font-size: 17px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 20.06px */
  letter-spacing: 0.34px;
  margin-right: 12px;
`;
