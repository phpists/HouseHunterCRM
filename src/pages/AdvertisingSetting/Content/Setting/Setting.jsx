import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Field } from "../../../../components/Field";
import { Divider } from "../Divider";
import { CheckOption } from "../../../../components/CheckOption";
import { ObjectsCountInput } from "./ObjectsCountInput";
import { AutoEndInput } from "./AutoEndInput";
import { TitleDivider } from "./TitleDivider";
import { Button } from "./Button";
import { useAppSelect } from "../../../../hooks/redux";
import { useGetAdverstionResourceQuery } from "../../../../store/objects/objects.api";
import { Footer } from "./Footer/Footer";

export const Setting = ({ data, onChange, onCreate }) => {
  const { user } = useAppSelect((state) => state.auth);

  return (
    <StyledSetting className="content-card">
      <div className="fields">
        {data?.id === "1" ? (
          <>
            <Divider />
            <Button
              title="Увійти через olx"
              href={`https://www.olx.ua/uk/oauth/authorize/?client_id=201818&response_type=code&scope=read+write+v2&state=${user?.id}`}
            />
          </>
        ) : null}
        {/* <Field label="Назва" value="Реклама OLX test" />
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
    /> */}
      </div>
      <Footer onCreate={onCreate} />
    </StyledSetting>
  );
};

const StyledSetting = styled.div`
  padding: 6px 8px;
  border-radius: 12px;
  background: var(--tag-bg-2);
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
