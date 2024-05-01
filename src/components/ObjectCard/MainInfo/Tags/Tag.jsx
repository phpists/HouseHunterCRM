import styled from "styled-components";

export const Tag = ({ Icon, title, hoverTitle }) => (
  <StyledTag
    className="flex items-center clickable select-none"
    title={hoverTitle ?? title}
  >
    {Icon ? Icon : null}
    <div className="title clickable">{title}</div>
  </StyledTag>
);

const StyledTag = styled.div`
  padding: 4px 6px;
  border-radius: 5px;
  background: var(--tag-bg-2);
  color: var(--tag-color-2);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 1;
  letter-spacing: 0.22px;
  height: max-content;
  .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 170px;
    overflow: hidden;
  }
  svg {
    margin-right: 4px;
    height: 12px;
    width: 12px;
  }
`;
