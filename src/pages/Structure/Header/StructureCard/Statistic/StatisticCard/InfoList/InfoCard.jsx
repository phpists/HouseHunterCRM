import { Link } from "react-router-dom";
import styled from "styled-components";

export const InfoCard = ({ title, value, link }) => (
  <StyledInfoCard className="flex items-center justify-between" to={link}>
    <div className="title">{title}</div>
    <div className="value">{value}</div>
  </StyledInfoCard>
);

const StyledInfoCard = styled(Link)`
  height: 31px;
  padding: 10px 0;
  &:hover {
    background: var(--bg-20);
  }
  .title {
    color: var(--main-color);
    leading-trim: both;
    text-edge: cap;
    font-family: Open Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 1;
    letter-spacing: 0.28px;
    opacity: 0.6;
  }
  .value {
    color: var(--main-color);
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
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
