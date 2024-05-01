import { styled } from "styled-components";

export const Divider = () => <StyledDivider className="divider" />;

const StyledDivider = styled.div`
  width: 1.6px;
  height: 26px;
  background: var(--active-bg);
  opacity: 0.2;
  margin: 0 19px;
  @media (max-width: 1399.5px) {
    display: none;
  }
`;
