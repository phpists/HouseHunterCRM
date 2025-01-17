import styled from "styled-components";
import { Title } from "./Title";
import { StepCard } from "./StepCard/StepCard";
import { Divider } from "./Divider";
import { CloseButton } from "../WelcomeBanner/CloseButton";

export const Steps = ({ className, close, onClose }) => {
  return (
    <StyledSteps className={`${className} stepsBanner`}>
      {close && <CloseButton onClose={onClose} />}
      <Title />
      <StepCard
        title="Оплата доступу"
        subtitle="Оплатіть доступ, аби мати доступ до всього функціоналу"
        link="/company?pay=true"
      />
      <Divider />
      <StepCard
        title="Налаштування компанії"
        subtitle="Додайте фотографію та інші особисті дані, які можуть бути важливими для ідентифікації."
        link="/company"
      />
      <Divider />
      <StepCard
        title="Створення ролей"
        subtitle="Оберіть формат вашої компанії та кількість працівників в системі"
        link="/structure?roles=true"
      />
      <Divider />
      <StepCard
        title="Додання клієнтів та об’єктів"
        subtitle="Почніть з додавання своїх автомобілів нерухомості в систему. Заповніть всю необхідну інформацію, таку як тип, розміри, ціна та фотографії."
        link="/clients?create=true"
      />
    </StyledSteps>
  );
};

const StyledSteps = styled.div`
  width: 540px;
  position: relative;
`;
