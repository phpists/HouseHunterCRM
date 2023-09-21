import styled from "styled-components";

export const Divider = () => <StyledDivider className="notClickable" />;

const StyledDivider = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  margin: 10px 0 9px;
`;
