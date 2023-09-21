import styled from "styled-components";
import { AccessBlock } from "./AccessBlock/AccessBlock";
import { Divider } from "./Divider";
import { ToggleOption } from "./ToggleOption";

export const Other = () => {
  return (
    <StyledOther>
      <ToggleOption
        title="Остаточне видалення всього"
        subtitle="Клієнти, запити, об’єкти, дзвінки, агенти"
      />
    </StyledOther>
  );
};

const StyledOther = styled.div`
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  margin-bottom: 20px;
`;
