import styled from "styled-components";

export const Tag = () => (
  <StyledTag className="notClickable">Регіональний керівник</StyledTag>
);

const StyledTag = styled.div`
  padding: 4px 6px;
  border-radius: 4px;
  background: rgba(37, 211, 222, 0.25);
  color: #58dfe8;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 100;
  line-height: 1; /* 12.98px */
  letter-spacing: 0.22px;
  margin-bottom: 8px;
  width: max-content;
`;
