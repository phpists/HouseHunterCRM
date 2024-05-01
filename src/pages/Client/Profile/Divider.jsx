import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  height: 1px;
  opacity: 0.2;
  background: var(--active-bg);
  width: 100%;
  margin-bottom: 20px;
`;
