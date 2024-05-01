import styled from "styled-components";

export const Divider = () => <StyledDivider className="divider" />;

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--bg-10);
  margin: 15px 0;
`;
