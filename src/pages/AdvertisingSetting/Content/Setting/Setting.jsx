import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Field } from "../../../../components/Field";
import { Divider } from "../Divider";
import { CheckOption } from "../../../../components/CheckOption";
import { ObjectsCountInput } from "./ObjectsCountInput";
import { AutoEndInput } from "./AutoEndInput";
import { TitleDivider } from "./TitleDivider";

export const Setting = () => (
  <StyledSetting className="content-card">
    <SelectTags
      label="Торговий майданчик"
      placeholder="Оберіть"
      options={[
        {
          title: "olx",
          value: "1",
        },
        {
          title: "olx",
          value: "2",
        },
      ]}
      value={null}
      onChange={(val) => null}
      isSearch
      notMultiSelect
    />
    <Divider />
    <Field label="Назва" value="Реклама OLX test" />
    <Divider />
    <ObjectsCountInput />
    <Divider />
    <AutoEndInput />
    <Divider />
    <CheckOption label="Додавати водяний знак" />
    <Divider />
    <CheckOption label="Автоматична публікація" />
    <Divider />
    <CheckOption label="Користувацьке обмеження" />
    <TitleDivider title="Додатково" />
    <SelectTags
      label="Визначати користувачів за"
      placeholder="Оберіть"
      options={[
        {
          title: "olx",
          value: "1",
        },
        {
          title: "olx",
          value: "2",
        },
      ]}
      value={null}
      onChange={(val) => null}
      isSearch
      notMultiSelect
    />
    <Divider />
    <SelectTags
      label="Email користувачів "
      placeholder="Оберіть"
      options={[
        {
          title: "olx",
          value: "1",
        },
        {
          title: "olx",
          value: "2",
        },
      ]}
      value={null}
      onChange={(val) => null}
      isSearch
      notMultiSelect
    />
  </StyledSetting>
);

const StyledSetting = styled.div`
  padding: 6px 8px;
  border-radius: 12px;
  background: var(--tag-bg-2);
`;
