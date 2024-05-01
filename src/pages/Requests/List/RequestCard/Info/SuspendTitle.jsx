import styled from "styled-components";

export const SuspendTitle = () => (
  <StyledSuspendTitle>Показ призупинено</StyledSuspendTitle>
);

const StyledSuspendTitle = styled.div`
  color: rgba(255, 159, 46, 0.9);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  text-transform: capitalize;
  padding: 2px 4px;
  border-radius: 5px;
  background: rgba(255, 159, 46, 0.15);
  margin-bottom: 10px;
  width: max-content;
`;
