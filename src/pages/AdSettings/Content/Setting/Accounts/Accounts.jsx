import styled from "styled-components";
import { Card } from "./Card";
import { handleFormatDate, handleResponse } from "../../../../../utilits";
import { useState } from "react";
import { Confirm } from "../../../../../components/Confirm/Confirm";
import { useLazyRefreshOlxAdsAccountQuery } from "../../../../../store/auth/auth.api";
import cogoToast from "cogo-toast";

export const Accounts = ({
  accounts,
  onRefreshAccountsData,
  onDelete,
  oneAccount,
  refresh,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [refreshOlxAdsAccount] = useLazyRefreshOlxAdsAccountQuery();

  const handleOpenDeleteConfirm = (id) => setDeleteConfirm(id);

  const handleDelete = () => {
    onDelete(deleteConfirm);
    setDeleteConfirm(null);
  };

  const handleRefresh = (id) => {
    refreshOlxAdsAccount(id).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Успішно обновлено історію всіх оголошень", {
          hideAfter: 3,
          position: "top-right",
        });
      })
    );
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
        {accounts?.map(({ TokenExpires, data, id, email }) => (
          <Card
            expireAt={
              TokenExpires
                ? handleFormatDate(Number(TokenExpires) * 1000)
                : undefined
            }
            email={data?.email ?? email}
            id={data?.id ?? id}
            name={data?.name?.length > 0 ? data?.name : null}
            onDelete={() => handleOpenDeleteConfirm(data?.id ?? id)}
            oneAccount={oneAccount}
            onRefresh={refresh ? () => handleRefresh(data?.id) : undefined}
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
