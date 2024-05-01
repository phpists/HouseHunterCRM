import { styled } from "styled-components";

export const Divider = () => <StyledDivide />;

const StyledDivide = styled.div`
  width: 1px;
  height: 28px;
  opacity: 0.1;
  background: var(--active-bg);
  margin: 0 11px 0 10px;
`;
