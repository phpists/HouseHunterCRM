import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  height: 1px;
  width: 100%;
  background: var(--active-bg);
  opacity: 0.1;
  margin: 6.5px 0;
`;
