import styled from "styled-components";

export const Item = ({ title, value }) => (
  <StyledItem className="flex items-center justify-between">
    <div className="title">{title}</div>
    <div className="value">{value}</div>
  </StyledItem>
);

const StyledItem = styled.div`
  .title {
    color: var(--main-color);
    leading-trim: both;
    text-edge: cap;
    font-family: Open Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.28px;
    opacity: 0.6;
  }
  .value {
    margin-left: 8px;
    color: var(--main-color);
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
`;
