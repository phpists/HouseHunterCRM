import styled from "styled-components";
import { Title } from "./Title";
import { StepCard } from "./StepCard/StepCard";
import { Divider } from "./Divider";

export const Steps = ({ className }) => {
  return (
    <StyledSteps className={`${className}`}>
      <Title />
      <StepCard title="Модерація в системі" />
      <Divider />
      <StepCard
        title="Налаштування компанії"
        subtitle="Додайте фотографію та інші особисті дані, які можуть бути важливими для ідентифікації."
      />
      <Divider />
      <StepCard
        title="Створення ролей"
        subtitle="Оберіть формат вашої компанії та кількість працівників в системі"
      />
      <Divider />
      <StepCard
        title="Додання клієнтів та об’єктів"
        subtitle="Почніть з додавання своїх об'єктів нерухомості в систему. Заповніть всю необхідну інформацію, таку як тип, розміри, ціна та фотографії."
      />
    </StyledSteps>
  );
};

const StyledSteps = styled.div`
  width: 540px;
`;
