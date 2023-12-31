import styled from "styled-components";

export const Tag = ({ title }) => (
  <StyledTag className="clickable">{title}</StyledTag>
);

const StyledTag = styled.div`
  padding: 1px 4px 2px 4px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: 1.3;
  letter-spacing: 0.22px;
  text-transform: capitalize;
  height: 18px;
`;
