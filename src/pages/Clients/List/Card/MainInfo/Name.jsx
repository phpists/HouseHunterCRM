import { styled } from "styled-components";

export const Name = ({ name }) => <StyledName>{name}</StyledName>;

const StyledName = styled.div`
  margin-right: 10px;
  color: #fff;
  font-family: Overpass;
  font-size: 17px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 20.06px */
  letter-spacing: 0.34px;
  white-space: nowrap;
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
