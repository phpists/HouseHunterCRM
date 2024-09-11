import styled from "styled-components";
import { Card } from "./Card";
import { handleFormatDate } from "../../../../../utilits";
import { useState } from "react";
import { Confirm } from "../../../../../components/Confirm/Confirm";

export const Accounts = ({ accounts, onRefreshAccountsData, onDelete }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleOpenDeleteConfirm = (id) => setDeleteConfirm(id);

  const handleDelete = () => {
    onDelete(deleteConfirm);
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
            onDelete={() => handleOpenDeleteConfirm(data?.id ?? id)}
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
