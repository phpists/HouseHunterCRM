import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  width: 1.4px;
  height: 24px;
  background: var(--bg-20);
  margin: 0 11px 0 10px;
  @media (max-width: 700px) {
    display: none;
  }
`;
