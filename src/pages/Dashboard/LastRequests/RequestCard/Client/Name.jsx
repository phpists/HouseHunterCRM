import styled from "styled-components";

export const Name = ({ name }) => <StyledName>{name}</StyledName>;

const StyledName = styled.div`
  color: #fff;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  margin-bottom: 2px;
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
