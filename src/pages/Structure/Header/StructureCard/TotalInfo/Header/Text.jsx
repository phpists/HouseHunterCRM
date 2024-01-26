import styled from "styled-components";

export const Text = ({ period }) => (
  <StyledText className="notClickable">
    <div className="title notClickable">Статистика</div>
    <div className="subtitle notClickable">За остані {period} днів</div>
  </StyledText>
);

const StyledText = styled.div`
  margin: 0 37px 0 17px;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 2px;
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
