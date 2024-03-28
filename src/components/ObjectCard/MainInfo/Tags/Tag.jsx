import styled from "styled-components";

export const Tag = ({ icon, title }) => (
  <StyledTag className="flex items-center clickable select-none" title={title}>
    {icon && <img src={icon} alt="" />}
    <div className="title clickable">{title}</div>
  </StyledTag>
);

const StyledTag = styled.div`
  padding: 4px 6px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: 1;
  letter-spacing: 0.22px;
  height: max-content;
  .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 170px;
    overflow: hidden;
  }
  img {
    margin-right: 4px;
    height: 12px;
    width: 12px;
  }
`;
