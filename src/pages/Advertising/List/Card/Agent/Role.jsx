import styled from "styled-components";

export const Role = () => <StyledRole>Агент</StyledRole>;

const StyledRole = styled.div`
  padding: 6px;
  background: #b1ff9140;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 300;
  line-height: 12.98px;
  letter-spacing: 0.02em;
  text-align: center;
  color: var(--green);
  width: max-content;
`;
