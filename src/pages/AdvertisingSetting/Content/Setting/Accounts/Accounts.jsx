import styled from "styled-components";
import { Card } from "./Card";
import { handleFormatDate, handleResponse } from "../../../../../utilits";
import { useState } from "react";
import { Confirm } from "../../../../../components/Confirm/Confirm";
import { useLazyDeleteAdAccountQuery } from "../../../../../store/objects/objects.api";
import cogoToast from "cogo-toast";

export const Accounts = ({ accounts, onRefreshAccountsData }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteAdAccount] = useLazyDeleteAdAccountQuery();

  const handleOpenDeleteConfirm = (id) => setDeleteConfirm(id);

  const handleDelete = () => {
    deleteAdAccount(deleteConfirm).then((resp) =>
      handleResponse(resp, () => {
        onRefreshAccountsData();
        cogoToast.success("Акаунт успішно видалено", {
          hideAfter: 3,
          position: "top-right",
        });
      })
    );
    setDeleteConfirm(null);
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
            onDelete={() => handleOpenDeleteConfirm(data?.id)}
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
