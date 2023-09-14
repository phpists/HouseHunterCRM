import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import { ToggleOption } from "./ToggleOption";

export const Topicality = () => (
  <StyledTopicality className="section">
    <SelectTags value="Оберіть" label="Актуальність" />
    <Divider />
    <ToggleOption label="Зайняті" className="toggle-opt" />
    <ToggleOption label="Видалені" className="toggle-opt" />
    <ToggleOption label="Неактуальні" />
  </StyledTopicality>
);

const StyledTopicality = styled.div`
  .toggle-opt {
    margin-bottom: 6px;
  }
`;
