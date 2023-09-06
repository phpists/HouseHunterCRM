import { styled } from "styled-components";

export const Divider = ({ title, className }) => (
  <StyledDivider className={`flex items-center ${className}`}>
    <div />
    <span className="title">{title}</span>
    <div />
  </StyledDivider>
);

const StyledDivider = styled.div`
  margin: 8px 0;
  div {
    height: 1px;
    width: 100%;
    opacity: 0.1;
    background: #fff;
  }
  .title {
    color: #fff;
    text-align: center;
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 12.98px */
    letter-spacing: 0.22px;
    text-transform: uppercase;
    opacity: 0.4;
    padding: 3px 10px 0;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #323232;
    width: max-content;
    flex-shrink: 0;
  }
`;
