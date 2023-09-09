import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  width: 1px;
  height: 49px;
  opacity: 0.1;
  background: #fff;
  margin: 0 20px;
  @media (max-width: 1300px) {
    width: 100%;
    height: 1px;
    margin: 10px 0px;
  }
`;
