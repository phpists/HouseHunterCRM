import { styled } from "styled-components";

export const Divider = ({ title, className, error }) => (
  <StyledDivider
    className={`flex items-center ${className} ${error && "error-field"}`}
    error={error}
  >
    <div />
    {title?.length > 0 ? <span className="title">{title}</span> : null}
    <div />
  </StyledDivider>
);

const StyledDivider = styled.div`
  margin: 8px 0;

  div {
    height: ${({ error }) => (error ? "2px" : "1px")};
    width: 100%;
    opacity: 0.1;
    background: ${({ error }) => (error ? "red" : "#fff")};
  }
  .title {
    color: ${({ error }) => (error ? "red" : "#fff")};
    text-align: center;
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: ${({ error }) => (error ? 600 : 200)};
    line-height: 118%; /* 12.98px */
    letter-spacing: 0.22px;
    text-transform: uppercase;
    opacity: 0.4;
    padding: 3px 10px 0;
    border-radius: 5px;
    border: 1px solid
      ${({ error }) => (error ? "red" : "rgba(255, 255, 255, 0.1)")};
    background: #323232;
    width: max-content;
    flex-shrink: 0;
  }
`;
