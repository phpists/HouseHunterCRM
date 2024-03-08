import styled from "styled-components";

export const Name = ({ name }) => (
  <StyledName className="notClickable" title={name}>
    {name}
  </StyledName>
);

const StyledName = styled.div`
  color: #fff;
  text-align: left;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  margin-right: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100px;
`;
