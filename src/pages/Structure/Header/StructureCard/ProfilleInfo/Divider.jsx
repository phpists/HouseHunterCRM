import styled from "styled-components";

export const Divider = () => <StyledDivider className="notClickable" />;

const StyledDivider = styled.div`
  height: 1px;
  width: 100%;
  background: var(--bg-20);
  margin: 10px 0 9px;
`;
