import styled from "styled-components";

export const Subtitle = ({ subtitle }) => (
  <StyledSubtitle>{subtitle}</StyledSubtitle>
);

const StyledSubtitle = styled.div`
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.4);
  font-family: Overpass;
  font-size: 12px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 14.16px */
  letter-spacing: 0.24px;
`;
