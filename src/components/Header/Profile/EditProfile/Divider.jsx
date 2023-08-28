import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  opacity: 0.2;
  background: #fff;
  height: 1px;
  width: calc(100% + 20px);
  margin: 0 -10px 25px;
`;
