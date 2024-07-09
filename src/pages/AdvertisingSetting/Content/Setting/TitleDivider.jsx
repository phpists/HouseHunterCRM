import { styled } from "styled-components";

export const TitleDivider = ({ title }) => (
  <StyledTitleDivider className="flex items-center">
    <div />
    <span className="title">
      <span>{title}</span>
    </span>
    <div />
  </StyledTitleDivider>
);

const StyledTitleDivider = styled.div`
  margin-bottom: 6.5px;
  div {
    height: 1px;
    opacity: 0.1;
    background: var(--active-bg);
    width: 100%;
  }
  .title {
    border-radius: 5px;
    border: 1px solid var(--bg-10);
    background: var(--dark-card-bg);
    flex-shrink: 0;
    padding: 3px 20px 0;
    /* color: var(--green-light-2); */
    text-align: center;
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 12.98px */
    letter-spacing: 0.22px;
    text-transform: uppercase;
    span {
      opacity: var(--opacity-light);
    }
  }
`;
