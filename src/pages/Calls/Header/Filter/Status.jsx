import styled from "styled-components";
import { ToggleOption } from "./ToggleOption";
import { Divider } from "./Divider";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";

export const Status = ({ value, onChange }) => (
  <StyledStatus>
    <SelectTags
      notMultiSelect
      options={[
        { title: "Не опрацьовані", value: "0" },
        { title: "Опрацьовані", value: "1" },
      ]}
      onChange={(val) => onChange(val)}
      value={value}
    />
    {/* <ToggleOption label="Опрацьовано" />
    <Divider />
    <ToggleOption label="Переглянуто" />
    <Divider />
    <ToggleOption label="Відсутне в базі" /> */}
  </StyledStatus>
);

const StyledStatus = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
`;
