import styled from "styled-components";

export const Tag = ({ icon, title }) => (
  <StyledTag className="flex items-center clickable">
    {icon && <img src={icon} alt="" />}
    {title}
  </StyledTag>
);

const StyledTag = styled.div`
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px;
  color: rgba(255, 255, 255, 0.8);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  height: 20px;
  img {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
`;
