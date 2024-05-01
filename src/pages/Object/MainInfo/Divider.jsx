import { styled } from "styled-components";

export const Divider = ({ title, className, error }) => (
  <StyledDivider
    className={`flex items-center ${className} ${error && "error-field"}`}
    error={error?.toString()}
  >
    <div />
    {title?.length > 0 ? <span className="title">{title}</span> : null}
    <div />
  </StyledDivider>
);

const StyledDivider = styled.div`
  margin: 8px 0;

  div {
    height: ${({ error }) => (error === "true" ? "2px" : "1px")};
    width: 100%;
    opacity: 0.1;
    background: ${({ error }) =>
      error === "true" ? "red" : "var(--main-color)"};
  }
  .title {
    color: ${({ error }) => (error === "true" ? "red" : "var(--main-color)")};
    text-align: center;
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: ${({ error }) => (error === "true" ? 600 : 200)};
    line-height: 118%; /* 12.98px */
    letter-spacing: 0.22px;
    text-transform: uppercase;
    opacity: 0.4;
    padding: 3px 10px 0;
    border-radius: 5px;
    border: 1px solid
      ${({ error }) => (error === "true" ? "red" : "var(--bg-10)")};
    background: var(--dark-card-bg);
    width: max-content;
    flex-shrink: 0;
  }
`;
