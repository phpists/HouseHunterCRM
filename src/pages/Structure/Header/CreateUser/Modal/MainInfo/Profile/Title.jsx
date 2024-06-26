import styled from "styled-components";

export const Title = ({ firstName, lastName }) => (
  <StyledTitle>
    {firstName?.length > 0 || lastName?.length > 0
      ? `${firstName} ${lastName}`
      : "Не задано"}
  </StyledTitle>
);

const StyledTitle = styled.div`
  color: var(--main-color);
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  width: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
