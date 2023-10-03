import { styled } from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  width: 1.4px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  margin: 0 11px 0 10px;
  @media (max-width: 700px) {
    display: none;
  }
`;
