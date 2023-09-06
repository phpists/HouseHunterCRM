import { styled } from "styled-components";
import { Divider } from "./Divider";
import { ToggleOption } from "./ToggleOption";
import { Select } from "../../../../components/Select/Select";

export const Topicality = () => {
  return (
    <StyledTopicality>
      <Select
        label="Актуальність"
        labelActive="Оберіть aктуальність"
        value="Об'єкти моєї структури"
      />
      <Divider />
      <ToggleOption label="Зайняті" className="mb-1.5" />
      <ToggleOption label="Видалені" className="mb-1.5" />
      <ToggleOption label="Неактуальні" />
    </StyledTopicality>
  );
};

const StyledTopicality = styled.div`
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.1);
  padding: 6px;
  margin-bottom: 25px;
`;
