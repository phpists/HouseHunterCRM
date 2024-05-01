import styled from "styled-components";

export const Subtitle = ({ subtitle }) => (
  <StyledSubtitle>{subtitle}</StyledSubtitle>
);

const StyledSubtitle = styled.div`
  margin-top: 2px;
  color: var(--second-color);
  font-family: Overpass;
  font-size: 12px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 14.16px */
  letter-spacing: 0.24px;
`;
