import { styled } from "styled-components";

export const Name = ({ name }) => <StyledName title={name}>{name}</StyledName>;

const StyledName = styled.div`
  margin-right: 10px;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 17px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 20.06px */
  letter-spacing: 0.34px;
  white-space: nowrap;
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
