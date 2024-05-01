import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  height: 1px;
  opacity: 0.1;
  background: var(--active-bg);
  margin: 4px 0 3px;
`;
