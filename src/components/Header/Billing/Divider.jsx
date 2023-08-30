import { styled } from "styled-components";

export const Divider = () => <StyledDivider className="divider" />;

const StyledDivider = styled.div`
  position: absolute;
  right: 0;
  width: 1px;
  background: rgba(255, 255, 255, 0.1);
  height: 46px;
`;
