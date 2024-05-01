import styled from "styled-components";

export const Divider = () => (
  <StyledDivider className="clickable divider-contacts " />
);

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--bg-10);
  margin: 10px 0;
`;
