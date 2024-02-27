import styled from "styled-components";

export const CardDescription = ({ text = "-" }) => (
  <StyledCardDescription className="clickable hide-scroll">
    {text}
  </StyledCardDescription>
);

const StyledCardDescription = styled.div`
  overflow: hidden;
  color: #fff;
  text-overflow: ellipsis;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  opacity: 0.4;
  @media (max-width: 800px) {
    font-size: 14px;
    max-height: 153px;
    overflow: auto;
    margin: 10px 0 15px;
    word-break: break-all;
  }
`;
