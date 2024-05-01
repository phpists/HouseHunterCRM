import styled from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  opacity: 0.1;
  height: 1px;
  width: 100%;
  background: var(--active-bg);
  margin: 6.5px 0;
`;
