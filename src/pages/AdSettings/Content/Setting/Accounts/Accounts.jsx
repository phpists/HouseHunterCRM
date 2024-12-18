import styled from "styled-components";
import { Card } from "./Card";
import {
  handleFormatDate,
  handleResponse,
  showAlert,
} from "../../../../../utilits";
import { useState } from "react";
import { Confirm } from "../../../../../components/Confirm/Confirm";
import {
  useLazyRefreshFlombuAdsQuery,
  useLazyRefreshOlxAdsAccountQuery,
  useLazyRefreshRealestateAdsAccountQuery,
  useLazyRefreshRieltorAdsQuery,
} from "../../../../../store/auth/auth.api";

export const Accounts = ({
  accounts,
  onRefreshAccountsData,
  onDelete,
  oneAccount,
  refresh,
  type,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [refreshOlxAdsAccount] = useLazyRefreshOlxAdsAccountQuery();
  const [refreshRealestateAds] = useLazyRefreshRealestateAdsAccountQuery();
  const [refreshFlombuAds] = useLazyRefreshFlombuAdsQuery();
  const [refreshRieltorAds] = useLazyRefreshRieltorAdsQuery();
  const [refreshing, setRefreshing] = useState(false);

  const handleOpenDeleteConfirm = (id) => setDeleteConfirm(id);

  const handleDelete = () => {
    onDelete(deleteConfirm);
    setDeleteConfirm(null);
  };

  const handleRefresh = (id) => {
    setRefreshing(id);
    if (type === "olx") {
      refreshOlxAdsAccount(id).then((resp) => {
        setRefreshing(false);
        handleResponse(resp, () => {
          showAlert("success", "Історію всіх оголошень оновлено");
        });
      });
    } else if (type === "realstate") {
      refreshRealestateAds(id).then((resp) => {
        setRefreshing(false);
        handleResponse(resp, () => {
          showAlert("success", "Історію всіх оголошень оновлено");
        });
      });
    } else if (type === "rieltor") {
      refreshRieltorAds(id).then((resp) => {
        setRefreshing(false);
        handleResponse(resp, () => {
          showAlert("success", "Історію всіх оголошень оновлено");
        });
      });
    } else {
      refreshFlombuAds().then((resp) => {
        setRefreshing(false);
        handleResponse(resp, () => {
          showAlert("success", "Історію всіх оголошень оновлено");
        });
      });
    }
  };

  return (
    <>
      {deleteConfirm && (
        <Confirm
          onClose={() => setDeleteConfirm(null)}
          onSubmit={handleDelete}
          title="Ви точно хочете видалити акаунт? При видаленні акаунта видалиться історія публікацій"
        />
      )}
      <StyledAccounts>
        {accounts?.map(({ TokenExpires, data, id, email, id_user_olx }) => (
          <Card
            expireAt={
              TokenExpires
                ? handleFormatDate(Number(TokenExpires) * 1000)
                : undefined
            }
            email={data?.email ?? email}
            id={data?.id ?? id}
            name={data?.name?.length > 0 ? data?.name : null}
            onDelete={() =>
              handleOpenDeleteConfirm(data?.id ?? id ?? id_user_olx)
            }
            oneAccount={oneAccount}
            onRefresh={
              refresh
                ? () => handleRefresh(id ?? data?.id ?? id_user_olx)
                : undefined
            }
            refreshing={refreshing === (id ?? data?.id ?? id_user_olx)}
            expired={new Date().getTime() > Number(TokenExpires) * 1000}
          />
        ))}
      </StyledAccounts>
    </>
  );
};

const StyledAccounts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-top: 20px;
`;
