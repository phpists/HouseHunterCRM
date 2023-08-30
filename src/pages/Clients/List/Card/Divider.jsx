import { styled } from "styled-components";

export const Divider = ({ className }) => (
  <StyledDivider className={`${className}`} />
);

const StyledDivider = styled.div`
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 16px 0 15px;
`;
