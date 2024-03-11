import styled from "styled-components";

export const Tag = ({ count = 0 }) => (
  <StyledTag> {Number(count) > 1000 ? "+1000" : count} нових</StyledTag>
);

const StyledTag = styled.div`
  border-radius: 5px;
  background: rgba(88, 175, 255, 0.3);
  padding: 1px 6px 2px 6px;
  color: #58afff;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.22px;
`;
