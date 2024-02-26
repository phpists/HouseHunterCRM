import styled from "styled-components";
import { AccessBlock } from "./AccessBlock/AccessBlock";
import { Divider } from "./Divider";

export const Structure = () => {
  return (
    <StyledStructure>
      <AccessBlock title="Моя  структура" />
      <Divider />
      <AccessBlock title="Інші структури" />
    </StyledStructure>
  );
};

const StyledStructure = styled.div`
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  margin-bottom: 20px;
`;
