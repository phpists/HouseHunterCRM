import styled from "styled-components";

export const Tag = ({ icon, title }) => (
  <StyledTag className="flex items-center clickable">
    {icon && <img src={icon} alt="" />}
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
  img {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
`;
