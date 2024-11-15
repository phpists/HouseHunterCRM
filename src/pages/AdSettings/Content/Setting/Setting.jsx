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
  useLazyRefreshFlombuAdsQuery,
  useLazyRefreshRealestateAdsAccountQuery,
  useLazyRemoveAccountRealestateQuery,
  useLazyRemoveRieltorAccountQuery,
} from "../../../../store/auth/auth.api";
import { handleResponse, showAlert } from "../../../../utilits";
import { Confirm } from "../../../../components/Confirm/Confirm";
import { AddRieltorAccount } from "../AddRieltorAccount";

export const Setting = ({
  data,
  olxAccounts,
  onRefreshAccountsData,
  onRefetchRealestateStatus,
  realestateAccounts,
  onRefreshFlombuStatus,
  onToggleFlombuAuth,
  flombuAuth,
  rieltorAccounts,
  onRefreshRieltorStatus,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const [removeRealstateAccount] = useLazyRemoveAccountRealestateQuery();
  const [removeOlxAccount] = useLazyDeleteAccountOlxQuery();
  const [removeFlombuAccount] = useLazyFlombuDeleteAccountQuery();
  const [removeRieltorAccount] = useLazyRemoveRieltorAccountQuery();
  const [flombuConnectAccount] = useLazyFlombuConnectAccountQuery();
  const [realStateRefreshConfirm, setRealStateRefreshConfirm] = useState(false);
  const [realStateRefreshConfirmLoading, setRealStateRefreshConfirmLoading] =
    useState(false);
  const [refreshRealestateAds] = useLazyRefreshRealestateAdsAccountQuery();
  const [addRealstateAccount, setAddRealstateAccount] = useState(false);
  const [addRieltorAccount, setAddRieltorAccount] = useState(false);

  const handleDeleteSuccess = (type) => {
    showAlert("success", "Акаунт успішно видалено");

    type === "olx"
      ? onRefreshAccountsData()
      : type === "flombu"
      ? onToggleFlombuAuth(false)
      : type === "rieltor"
      ? onRefreshRieltorStatus()
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
    } else if (type === "rieltor") {
      removeRieltorAccount(id).then((resp) =>
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
      handleResponse(resp, () => onToggleFlombuAuth(true))
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

  const handleSuccessRieltorAuth = () => {
    onRefreshRieltorStatus();
    setAddRieltorAccount(true);
  };

  return (
    <StyledSetting className="content-card">
      {addRealstateAccount && (
        <AddRealstateAccount
          onClose={() => setAddRealstateAccount(false)}
          onSuccess={handleSuccessRealeStateAuth}
        />
      )}
      {addRieltorAccount && (
        <AddRieltorAccount
          onClose={() => setAddRieltorAccount(false)}
          onSuccess={handleSuccessRieltorAuth}
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
              refresh
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
      ) : data?.id === "5" ? (
        <div className="fields">
          {" "}
          <Button
            title="Додати акаунт"
            onClick={() => setAddRieltorAccount(true)}
          />
          {rieltorAccounts?.[0] ? (
            <Accounts
              accounts={rieltorAccounts?.map((a) => ({
                ...a,
                id: a?.data?.userId,
              }))}
              onRefreshAccountsData={onRefreshAccountsData}
              onDelete={(id) => handleDeleteAccount(id, "rieltor")}
              refresh
              type="rieltor"
            />
          ) : null}
        </div>
      ) : null}
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
