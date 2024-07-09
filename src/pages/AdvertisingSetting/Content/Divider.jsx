import styled from "styled-components";

export const Divider = () => <StyledDivider />;

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--company-filter-dropdown-bg);
  margin: 6.5px 0;
`;
