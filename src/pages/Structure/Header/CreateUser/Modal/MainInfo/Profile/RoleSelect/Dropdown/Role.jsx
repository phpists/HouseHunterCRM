import styled from "styled-components";

export const Role = ({ title, onClick }) => (
  <StyledRole onClick={onClick}>{title}</StyledRole>
);

const StyledRole = styled.div`
  padding: 4px 6px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: 200;
  line-height: 1; /* 12.98px */
  letter-spacing: 0.22px;
  text-transform: uppercase;
  width: max-content;
  height: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;
