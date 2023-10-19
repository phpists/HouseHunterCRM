import { styled } from "styled-components";

export const Name = ({ name }) => <StyledName>{name}</StyledName>;

const StyledName = styled.div`
  color: #fff;
  text-align: left;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  max-width: 150px;
  white-space: nowrap;
`;
