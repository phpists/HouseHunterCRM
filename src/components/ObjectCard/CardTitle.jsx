import styled from "styled-components";

export const CardTitle = ({ title = "-" }) => (
  <StyledCardTitle className="clickable">{title}</StyledCardTitle>
);

const StyledCardTitle = styled.div`
  color: #fff;
  /* H3 */
  font-family: Overpass;
  font-size: 20px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 23.6px */
  letter-spacing: 0.4px;
  margin-bottom: 10px;
  @media (max-width: 800px) {
    word-break: break-all;
  }
`;
