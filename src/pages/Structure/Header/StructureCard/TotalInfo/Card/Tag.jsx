import styled from "styled-components";

export const Tag = ({ count }) => (
  <StyledTag>{count === "0" ? "0" : `+${count}`}</StyledTag>
);

const StyledTag = styled.div`
  padding: 2px 4px;
  border-radius: 5px;
  background: rgba(88, 175, 255, 0.3);
  width: max-content;
  color: #58afff;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  height: 20px;
`;
