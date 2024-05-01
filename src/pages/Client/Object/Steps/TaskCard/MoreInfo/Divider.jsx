import { styled } from "styled-components";

export const Divider = ({ className }) => (
  <StyledDivider className={`${className} divider`} />
);

const StyledDivider = styled.div`
  height: 1px;
  opacity: 0.1;
  background: var(--active-bg);
  width: calc(100% + 17px);
  margin: 8px 0 7px -6px;
`;
