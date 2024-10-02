import styled from "styled-components";
import { Divider } from "../Divider";
import { Button } from "./Button";
import { useAppSelect } from "../../../../hooks/redux";
import { Accounts } from "./Accounts/Accounts";
import { useState } from "react";
import { AddRealstateAccount } from "../AddRealstateAccount";
import {
  useLazyDeleteAccountOlxQuery,
  useLazyFlombuConnectAccountQuery,
  useLazyFlombuDeleteAccountQuery,
  useLazyRefreshRealestateAdsAccountQuery,
  useLazyRemoveAccountRealestateQuery,
} from "../../../../store/auth/auth.api";
import { handleResponse, showAlert } from "../../../../utilits";
import { Confirm } from "../../../../components/Confirm/Confirm";

export const Setting = ({
  data,
  olxAccounts,
  onRefreshAccountsData,
  onRefetchRealestateStatus,
  realestateAccounts,
  onRefreshFlombuStatus,
  flombuAuth,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const [addRealstateAccount, setAddRealstateAccount] = useState(false);
  const [removeRealstateAccount] = useLazyRemoveAccountRealestateQuery();
  const [removeOlxAccount] = useLazyDeleteAccountOlxQuery();
  const [removeFlombuAccount] = useLazyFlombuDeleteAccountQuery();
  const [flombuConnectAccount] = useLazyFlombuConnectAccountQuery();
  const [realStateRefreshConfirm, setRealStateRefreshConfirm] = useState(false);
  const [realStateRefreshConfirmLoading, setRealStateRefreshConfirmLoading] =
    useState(false);
  const [refreshRealestateAds] = useLazyRefreshRealestateAdsAccountQuery();

  const handleDeleteSuccess = (type) => {
    showAlert("success", "Акаунт успішно видалено");

    type === "olx"
      ? onRefreshAccountsData()
      : type === "flombu"
      ? onRefreshFlombuStatus()
      : onRefetchRealestateStatus();
  };

  const handleDeleteAccount = (id, type) => {
    if (type === "olx") {
      removeOlxAccount(id).then((resp) =>
        handleResponse(resp, () => handleDeleteSuccess(type))
      );
    } else if (type === "flombu") {
      removeFlombuAccount().then((resp) =>
        handleResponse(resp, () => handleDeleteSuccess(type))
      );
    } else {
      removeRealstateAccount(id).then((resp) =>
        handleResponse(resp, () => handleDeleteSuccess(type))
      );
    }
  };

  const handleFlombuConnect = () => {
    flombuConnectAccount().then((resp) =>
      handleResponse(resp, () => onRefreshFlombuStatus())
    );
  };

  const handleSuccessRealeStateAuth = () => {
    onRefetchRealestateStatus();
    setRealStateRefreshConfirm(true);
  };

  const handleRealStateRefresh = () => {
    setRealStateRefreshConfirmLoading(true);
    refreshRealestateAds(
      realestateAccounts[realestateAccounts?.length - 1]?.id_account
    ).then((resp) => {
      setRealStateRefreshConfirmLoading(false);
      setRealStateRefreshConfirm(false);
      handleResponse(resp, () => {
        showAlert("success", "Історію всіх оголошень оновлено");
      });
    });
  };

  return (
    <StyledSetting className="content-card">
      {addRealstateAccount && (
        <AddRealstateAccount
          onClose={() => setAddRealstateAccount(false)}
          onSuccess={handleSuccessRealeStateAuth}
        />
      )}
      {realStateRefreshConfirm && (
        <Confirm
          onClose={() => setRealStateRefreshConfirm(false)}
          title="Синхронізувати дані з RealEstate?"
          onSubmit={handleRealStateRefresh}
          loading={realStateRefreshConfirmLoading}
          notClose
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
            onDelete={(id) => handleDeleteAccount(id, "olx")}
            refresh
            type="olx"
          />
        </div>
      ) : data?.id === "2" ? (
        <div className="fields"></div>
      ) : data?.id === "3" ? (
        <div className="fields">
          {flombuAuth ? (
            <Accounts
              accounts={flombuAuth ? [{ id: "Акаунт у flombu" }] : []}
              onRefreshAccountsData={onRefreshFlombuStatus}
              onDelete={(id) => handleDeleteAccount(id, "flombu")}
              oneAccount
            />
          ) : (
            <Button title="Додати акаунт" onClick={handleFlombuConnect} />
          )}
        </div>
      ) : data?.id === "4" ? (
        <div className="fields">
          <Button
            title="Додати акаунт"
            onClick={() => setAddRealstateAccount(true)}
          />
          <Accounts
            accounts={realestateAccounts?.map((a) => ({
              ...a,
              id: a.id_account,
            }))}
            onRefreshAccountsData={onRefreshAccountsData}
            onDelete={(id) => handleDeleteAccount(id, "realstate")}
            refresh
            type="realstate"
          />
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
