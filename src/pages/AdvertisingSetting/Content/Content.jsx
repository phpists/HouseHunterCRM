import styled from "styled-components";
import { Title } from "./Title";
import { TemplatesList } from "./TemplatesList/TemplatesList";
import { Setting } from "./Setting/Setting";

export const Content = () => {
  return (
    <StyledContent>
      <div>
        <Title title="Створені та Шаблони" />
        <TemplatesList />
      </div>
      <div>
        <Title title="Налаштування" />
        <Setting />
      </div>
    </StyledContent>
  );
};

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 20px;
  background: var(--modal-bg);
  border-radius: 15px;
  height: calc(100svh - 226px);
  overflow: hidden;
  .content-card {
    max-height: calc(100svh - 226px - 65px);
    overflow: auto;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    overflow: auto;
    .content-card {
      max-height: max-content;
      overflow: unset;
    }
  }
  @media (max-width: 800px) {
    padding: 10px;
    height: calc(100svh - 190px);
  }
`;
