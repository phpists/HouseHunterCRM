import styled from "styled-components";

export const Tag = () => <StyledTag className="clickable">Агент</StyledTag>;

const StyledTag = styled.div`
  padding: 4px 6px;
  height: 20px;
  border-radius: 4px;
  background: rgba(177, 255, 145, 0.25);
  color: #b1ff91;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 100;
  line-height: 1; /* 12.98px */
  letter-spacing: 0.22px;
  width: max-content;
`;
