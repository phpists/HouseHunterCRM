import styled from "styled-components";

export const Tag = ({ Icon, title }) => (
  <StyledTag className="flex items-center clickable">
    {Icon && <Icon />}
    {title}
  </StyledTag>
);

const StyledTag = styled.div`
  border-radius: 5px;
  padding: 6px;
  background: var(--tag-bg-2);
  color: var(--tag-color-2);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  height: 20px;
  svg {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
`;
