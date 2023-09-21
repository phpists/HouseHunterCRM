import styled from "styled-components";

export const Id = () => <StyledId className="notClickable">ID: 1246</StyledId>;

const StyledId = styled.div`
  opacity: 0.4;
  color: #fff;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 12.98px */
  letter-spacing: 0.22px;
`;
