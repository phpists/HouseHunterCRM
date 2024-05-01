import styled from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  width: 1px;
  height: 100%;
  background: var(--bg-10);
  margin: 0 8px;
  @media (max-width: 850px) {
    display: none;
  }
`;
