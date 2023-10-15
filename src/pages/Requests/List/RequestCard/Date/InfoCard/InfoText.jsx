import styled from "styled-components";

export const InfoText = () => (
  <StyledInfoText className="clickable">
    <div className="title clickable">Оренда квартир</div>
    <div className="id clickable">ID: 332</div>
  </StyledInfoText>
);

const StyledInfoText = styled.div`
  .title {
    color: #fff;
    font-family: Open Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.28px;
    margin-bottom: 2px;
  }
  .id {
    opacity: 0.4;
    color: #fff;
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
  }
  @media (min-width: 1400px) {
    margin-bottom: 10px;
  }
  @media (min-width: 1600px) {
    margin-bottom: 0;
  }
`;
