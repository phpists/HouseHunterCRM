import styled from "styled-components";

export const Title = ({ title, isProfile }) => (
  <StyledTitle isProfile={isProfile}>{title}</StyledTitle>
);

const StyledTitle = styled.div`
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  width: ${({ isProfile }) => (isProfile ? 230 : 100)}px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
