import styled from "styled-components";

export const InfoText = ({ category }) => (
  <StyledInfoText className="clickable">
    <div className="title clickable">{category}</div>
    <div className="id clickable">Категорія</div>
  </StyledInfoText>
);

const StyledInfoText = styled.div`
  .title {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.28px;
    margin-bottom: 2px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 140px;
  }
  .id {
    opacity: 0.4;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: var(--font-weight-100);
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
