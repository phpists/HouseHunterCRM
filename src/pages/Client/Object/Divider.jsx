import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  margin: 6.5px 0 6.5px -4px;
  height: 1px;
  background: var(--active-bg);
  opacity: 0.1;
  width: calc(100% + 8px);
`;
