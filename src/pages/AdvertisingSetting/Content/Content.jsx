import styled from "styled-components";
import { Title } from "./Title";
import { TemplatesList } from "./TemplatesList/TemplatesList";
import { Setting } from "./Setting/Setting";
import { useGetStatusAccountQuery } from "../../../store/objects/objects.api";

export const Content = ({
  resources,
  selectedResources,
  onChange,
  onCreate,
  onSelect,
}) => {
  const { data: status } = useGetStatusAccountQuery();

  return (
    <StyledContent selectedTemplate={selectedResources}>
      <div>
        <Title title="Створені та Шаблони" />
        <TemplatesList
          resources={resources}
          selectedResources={selectedResources}
          onSelect={onSelect}
          olxAuth={!!status?.user}
        />
      </div>
      {selectedResources ? (
        <div>
          <Title title="Налаштування" />
          <Setting
            data={selectedResources}
            onChange={onChange}
            onCreate={onCreate}
          />
        </div>
      ) : null}
    </StyledContent>
  );
};

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: ${({ selectedTemplate }) =>
    selectedTemplate ? "1fr 1fr" : "1fr"};
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
    grid-template-rows: max-content;
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
