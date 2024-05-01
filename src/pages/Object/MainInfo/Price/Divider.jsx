import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  width: 1px;
  height: 49px;
  opacity: 0.1;
  background: var(--active-bg);
  margin: 0 20px;
  flex-shrink: 0;
  @media (max-width: 800px) {
    margin: 0 10px;
  }
`;
