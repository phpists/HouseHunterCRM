import { styled } from "styled-components";

export const Divider = ({ className }) => (
  <StyledDivider className={`${className}`} />
);

const StyledDivider = styled.div`
  width: 1px;
  height: 36px;
  background: var(--bg-10);
  margin: 0 13px 0;
  @media (max-width: 1600px) {
    margin: 0 8px;
  }
`;
