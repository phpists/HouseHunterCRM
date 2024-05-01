import styled from "styled-components";

export const Tag = ({ count = 0 }) => (
  <StyledTag className="flex items-center ">
    {Number(count) > 1000 ? "+1000" : count} нових
  </StyledTag>
);

const StyledTag = styled.div`
  padding: 1px 6px 2px 6px;
  border-radius: 5px;
  background: rgba(88, 175, 255, 0.3);
  color: #58afff;
  font-family: Open Sans;
  font-size: 10px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 1;
  letter-spacing: 0.22px;
  height: 18px;
  white-space: nowrap;
  justify-content: center;
`;
