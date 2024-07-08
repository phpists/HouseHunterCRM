import styled from "styled-components";

export const Divider = ({ className }) => (
  <StyledDivider className={className} />
);

const StyledDivider = styled.div`
  height: 36px;
  width: 1px;
  background: #ffffff1a;
  margin: 20px;
  flex-shrink: 0;
`;
