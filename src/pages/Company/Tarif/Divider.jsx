import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  display: block;
  margin: 17px 0 16px -16px;
  height: 1px;
  opacity: 0.1;
  background: #fff;
  width: calc(100% + 32px);
  flex-shrink: 0;
`;
