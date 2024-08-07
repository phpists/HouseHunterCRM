import styled from "styled-components";

export const Subtitle = ({ subtitle }) => (
  <StyledSubtitle title={subtitle}>{subtitle}</StyledSubtitle>
);

const StyledSubtitle = styled.div`
  opacity: 0.4;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 12px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 14.16px */
  letter-spacing: 0.24px;
  width: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
