import styled from "styled-components";

export const Title = () => <StyledTitle>Заголовок</StyledTitle>;

const StyledTitle = styled.div`
  font-size: 14px;
  font-weight: var(--font-weight-200);
  line-height: 16.52px;
  letter-spacing: 0.02em;
  text-align: left;
  margin-bottom: 2px;
`;
