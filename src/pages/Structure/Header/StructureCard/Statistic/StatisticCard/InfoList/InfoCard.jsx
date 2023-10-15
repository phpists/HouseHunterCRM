import styled from "styled-components";

export const InfoCard = ({ title, value }) => (
  <StyledInfoCard className="flex items-center justify-between">
    <div className="title">{title}</div>
    <div className="value">{value}</div>
  </StyledInfoCard>
);

const StyledInfoCard = styled.div`
  height: 11px;
  .title {
    color: #fff;
    leading-trim: both;
    text-edge: cap;
    font-family: Open Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 1;
    letter-spacing: 0.28px;
    opacity: 0.6;
  }
  .value {
    color: #fff;
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 1; /* 17.7px */
    letter-spacing: 0.3px;
    margin-left: 10px;
  }
  @media (min-width: 1400px) {
    .title {
      font-size: 11px;
    }
  }
  @media (min-width: 1500px) {
    .title {
      font-size: 14px;
    }
  }
`;
