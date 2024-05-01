import styled from "styled-components";

export const Tag = ({ color, role }) => (
  <StyledTag className="notClickable" color={color}>
    {role}
  </StyledTag>
);

const StyledTag = styled.div`
  padding: 6px 6px 4px;
  border-radius: 4px;
  background: ${({ color }) => (color ? `${color}40` : "#FFFFFF1A")};
  color: ${({ color }) => color ?? "#FFFFFFCC"};
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 1; /* 12.98px */
  letter-spacing: 0.22px;
  margin-bottom: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 170px;
  width: max-content;
`;
