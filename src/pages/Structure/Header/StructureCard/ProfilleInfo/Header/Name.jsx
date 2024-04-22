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
  @media (min-width: 1400px) {
    width: 150px;
    max-width: 100%;
    flex-shrink: 0;
  }
  @media (min-width: 1600px) {
    width: 180px;
    max-width: 100%;
    flex-shrink: 0;
  }
`;
