import styled from "styled-components";

export const Name = () => (
  <StyledName className="notClickable">Віталій Дуда</StyledName>
);

const StyledName = styled.div`
  color: #fff;
  text-align: center;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  margin-right: 8px;
`;
