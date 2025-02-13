import styled from "styled-components";
import { AccessBlock } from "./AccessBlock/AccessBlock";
import { Divider } from "./Divider";
import { ToggleOption } from "./ToggleOption";

export const Other = () => {
  return (
    <StyledOther>
      <ToggleOption
        title="Остаточне видалення всього"
        subtitle="Клієнти, запити, автомобілі, дзвінки, агенти"
      />
    </StyledOther>
  );
};

const StyledOther = styled.div`
  border-radius: 9px;
  background: var(--bg-10);
  padding: 8px;
  margin-bottom: 20px;
`;
