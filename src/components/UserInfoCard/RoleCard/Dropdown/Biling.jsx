import styled from "styled-components";
import { AccessBlock } from "./AccessBlock/AccessBlock";

export const Biling = () => {
  return (
    <StyledBiling>
      <AccessBlock title="Білінг" />
    </StyledBiling>
  );
};

const StyledBiling = styled.div`
  border-radius: 9px;
  background: var(--bg-10);
  padding: 8px;
  margin-bottom: 20px;
`;
