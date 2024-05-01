import styled from "styled-components";
import { AccessBlock } from "./AccessBlock/AccessBlock";
import { Divider } from "./Divider";
import { ToggleOption } from "./ToggleOption";

export const Clients = () => {
  return (
    <StyledClients>
      <AccessBlock title="Мої  запити" />
      <Divider />
      <AccessBlock title="Запити структури" />
      <Divider />
      <AccessBlock title="Запити іншої структури " />
      <Divider />
      <AccessBlock title="Мої  запити" />
      <Divider />
      <AccessBlock title="Мої  запити" />
      <Divider />
      <ToggleOption
        title="Телефон Клієнтів"
        subtitle="Приховати телефон клієнтів, які належать агентам структури"
      />
      <Divider />
      <ToggleOption
        title="Телефон Клієнтів"
        subtitle="Приховати телефон клієнтів, які належать агентам інших структур"
      />
    </StyledClients>
  );
};

const StyledClients = styled.div`
  border-radius: 9px;
  background: var(--bg-10);
  padding: 8px;
  margin-bottom: 20px;
`;
