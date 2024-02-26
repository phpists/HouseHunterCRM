import styled from "styled-components";
import { AccessBlock } from "./AccessBlock/AccessBlock";
import { Divider } from "./Divider";
import { ToggleOption } from "./ToggleOption";

export const Calls = () => {
  return (
    <StyledCalls>
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
    </StyledCalls>
  );
};

const StyledCalls = styled.div`
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  margin-bottom: 20px;
`;
