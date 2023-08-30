import { styled } from "styled-components";
import { StepCard } from "./StepCard";

export const Header = ({ step, onChangeStep }) => (
  <StyledHeader className="flex items-center hide-scroll">
    <StepCard
      step={1}
      title="Дзвінок"
      date="23.08.23  14:50"
      active={step === 1}
      onClick={() => onChangeStep(1)}
    />
    <StepCard
      step={2}
      title="Пошук"
      date="23.08.23  14:50"
      active={step === 2}
      onClick={() => onChangeStep(2)}
    />
    <StepCard
      step={3}
      title="Завдаток"
      date="23.08.23  14:50"
      active={step === 3}
      onClick={() => onChangeStep(3)}
    />
    <StepCard
      step={4}
      title="Угода"
      date="23.08.23  14:50"
      active={step === 4}
      onClick={() => onChangeStep(4)}
    />
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 6px 6px 6.5px;
  overflow: auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
`;
