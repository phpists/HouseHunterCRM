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
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  margin-bottom: 20px;
`;
