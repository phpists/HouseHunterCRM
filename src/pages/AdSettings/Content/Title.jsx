import styled from "styled-components";

export const Title = ({ title }) => <StyledTitle>{title}</StyledTitle>;

const StyledTitle = styled.div`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: var(--font-weight-200);
  line-height: 16.52px;
  letter-spacing: 0.02em;
  text-align: left;
  text-transform: uppercase;
  opacity: var(--opacity-light);
`;
