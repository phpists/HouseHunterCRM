import styled from "styled-components";

export const Tag = ({ color, role }) => (
  <StyledTag className="notClickable" color={color}>
    {role}
  </StyledTag>
);

const StyledTag = styled.div`
  padding: 4px 6px;
  border-radius: 4px;
  background: ${({ color }) => `${color}40`};
  color: ${({ color }) => color};
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
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 170px;
`;
