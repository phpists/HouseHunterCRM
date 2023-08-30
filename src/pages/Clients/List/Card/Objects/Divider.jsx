import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  margin: 0 6px 0 6px;
  width: 1px;
  height: 42px;
  opacity: 0.1;
  background: #fff;
  @media (max-width: 1600px) {
    margin: 0 4px 0;
  }
`;
