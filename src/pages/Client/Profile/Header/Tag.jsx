import { useParams } from "react-router-dom";
import { styled } from "styled-components";

export const Tag = () => {
  return <StyledTag>Тег</StyledTag>;
};

const StyledTag = styled.div`
  padding: 1px 12px;
  border-radius: 5px;
  background: rgba(88, 175, 255, 0.3);
  color: #58afff;
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.22px;
  text-transform: uppercase;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 80px;
  height: 1.2em;
  white-space: nowrap;
`;
