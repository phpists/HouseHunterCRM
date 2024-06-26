import styled from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  height: 317px;
  width: 1px;
  background: var(--bg-20);
  margin: 0 20px;
  @media (max-width: 1200px) {
    width: 100%;
    height: 1px;
    margin: 20px 0;
  }
`;
