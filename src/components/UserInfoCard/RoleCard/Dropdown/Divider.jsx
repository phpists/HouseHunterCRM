import styled from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  height: 1px;
  width: 100%;
  opacity: 0.1;
  background: var(--active-bg);
  margin: 6px 0;
`;
