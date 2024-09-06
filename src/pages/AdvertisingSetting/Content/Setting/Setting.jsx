import styled from "styled-components";
import { Divider } from "../Divider";
import { Button } from "./Button";
import { useAppSelect } from "../../../../hooks/redux";
import { Accounts } from "./Accounts/Accounts";
import { useState } from "react";
import { AddRealstateAccount } from "../AddRealstateAccount";

export const Setting = ({
  data,
  olxAccounts,
  onRefreshAccountsData,
  onRefetchRealestateStatus,
  realestateAccounts,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const [addRealstateAccount, setAddRealstateAccount] = useState(false);

  return (
    <StyledSetting className="content-card">
      {addRealstateAccount && (
        <AddRealstateAccount
          onClose={() => setAddRealstateAccount(false)}
          onSuccess={onRefetchRealestateStatus}
        />
      )}
      {data?.id === "1" ? (
        <div className="fields">
          <Button
            title="Додати акаунт olx"
            href={`https://www.olx.ua/uk/oauth/authorize/?client_id=201818&response_type=code&scope=read+write+v2&state=${user?.id}`}
          />
          <Divider />
          <Accounts
            accounts={olxAccounts}
            onRefreshAccountsData={onRefreshAccountsData}
          />
        </div>
      ) : data?.id === "4" ? (
        <div className="fields">
          {/* <Button
            title="Додати акаунт"
            onClick={() => setAddRealstateAccount(true)}
          />
          <Accounts
            accounts={realestateAccounts?.map((a) => ({
              ...a,
              id: a.id_account,
            }))}
            onRefreshAccountsData={onRefreshAccountsData}
          /> */}
        </div>
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
      {/* <Footer onCreate={onCreate} /> */}
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
