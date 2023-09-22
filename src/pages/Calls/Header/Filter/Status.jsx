import styled from "styled-components";
import { ToggleOption } from "./ToggleOption";
import { Divider } from "./Divider";

export const Status = () => (
  <StyledStatus>
    <ToggleOption label="Опрацьовано" />
    <Divider />
    <ToggleOption label="Переглянуто" />
    <Divider />
    <ToggleOption label="Відсутне в базі" />
  </StyledStatus>
);

const StyledStatus = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
`;
