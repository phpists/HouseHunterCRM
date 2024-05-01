import styled from "styled-components";

export const Tag = ({ level }) => {
  return (
    <StyledTag className="clickable" color={level?.color}>
      {level?.title ?? "Без ролі"}
    </StyledTag>
  );
};

const StyledTag = styled.div`
  padding: 4px 6px;
  height: 20px;
  border-radius: 4px;
  background: ${({ color }) => color}40;
  color: ${({ color }) => color};
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 1; /* 12.98px */
  letter-spacing: 0.22px;
  width: max-content;
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
