import { styled } from "styled-components";
import { Card } from "./Card/Card";
import { Empty } from "../../../components/Empty/Empty";
import { useState } from "react";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useGetPhonesCodesQuery } from "../../../store/auth/auth.api";
import { handleCheckAccess } from "../../../utilits";
import { Loader } from "../../../components/Loader";
import { EditComment } from "./EditComment";
import { useAppSelect } from "../../../hooks/redux";
import { DeleteInfo } from "../../../components/DeleteInfo/DeleteInfo";

export const List = ({
  selected,
  onSelect,
  clients,
  innerRef,
  onDelete,
  loading,
  onAddToFavorite,
  onSend,
  actionLoading,
  onChangeComment,
  onRestore,
  isDeleted,
}) => {
  const [deleteModal, setDeleteModal] = useState(null);
  const [isDeleteFinally, setIsDeleteFinally] = useState(null);
  const [editComment, setEditComment] = useState(false);
  const { accessData, user } = useAppSelect((state) => state.auth);
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const [confirmText, setConfimText] = useState("");
  const [deleteInfo, setDeleteInfo] = useState(null);

  const handleOpenDeleteModal = (id, isFinally) => {
    setDeleteModal(id);
    setIsDeleteFinally(isFinally);
    setConfimText("");
  };

  const handleDelete = () => {
    onDelete(deleteModal, confirmText, isDeleteFinally);
    setDeleteModal(null);
    setConfimText("");
  };

  return (
    <>
      {deleteModal && (
        <Confirm
          title={
            isDeleteFinally || isDeleted
              ? "Видалити клієнта остаточно?"
              : "Видалити клієнта?"
          }
          onSubmit={handleDelete}
          onClose={() => setDeleteModal(null)}
          passwordCheck={isDeleted || isDeleteFinally}
          confirmText={isDeleteFinally || isDeleted ? null : confirmText}
          onChangeConfirmText={(val) => setConfimText(val)}
        />
      )}
      {editComment && (
        <EditComment
          onClose={() => setEditComment(false)}
          client={editComment}
          onChange={onChangeComment}
        />
      )}
      {deleteInfo ? (
        <DeleteInfo onClose={() => setDeleteInfo(false)} text={deleteInfo} />
      ) : null}

      <StyledList ref={innerRef}>
        {clients?.length === 0 || actionLoading ? (
          <Empty loading={loading || actionLoading} />
        ) : (
          clients
            ?.slice(0, 1)
            ?.map(
              (
                {
                  full_name,
                  id,
                  dt_add,
                  phones,
                  all_req,
                  all_obj,
                  comment,
                  first_name,
                  last_name,
                  favorite,
                  agent,
                  email,
                  deleted,
                  dt_start_delete,
                  reasone_remove,
                },
                i
              ) => (
                <Card
                  key={i}
                  selected={!!selected.find((s) => s === id)}
                  onSelect={() => onSelect(id)}
                  name={`${first_name} ${last_name}`}
                  id={id}
                  dateCreate={dt_add}
                  phones={phones?.map((p) => ({
                    ...p,
                    phone: `${phonesCodes?.find((c) => c.id === p.code)?.code}${
                      p?.phone
                    }`,
                  }))}
                  requestsCount={all_req}
                  objectsCount={all_obj}
                  comment={comment}
                  onDelete={() => handleOpenDeleteModal(id)}
                  isDelete={
                    isDeleted
                      ? user?.struct_level === 1
                      : handleCheckAccess(accessData, "clients", "delete")
                  }
                  onAddToFavorite={() => onAddToFavorite(id)}
                  onSend={() => onSend(id)}
                  favorite={favorite}
                  agent={agent}
                  agentPhone={`${
                    phonesCodes?.find(
                      (c) => c.id === agent?.phones[0].id_phone_code
                    )?.code
                  }${agent?.phones[0]?.phone ?? ""}`}
                  firstName={first_name}
                  lastName={last_name}
                  email={email}
                  onEditComment={() => setEditComment({ comment, id })}
                  isDeleted={deleted === "1"}
                  onRestore={() => onRestore([id])}
                  onDeleteFinally={
                    user?.struct_level === 1
                      ? () => handleOpenDeleteModal(id, true)
                      : null
                  }
                  deleteDate={dt_start_delete}
                  onOpenDeleteReason={
                    reasone_remove?.length > 0
                      ? () => setDeleteInfo(reasone_remove)
                      : null
                  }
                />
              )
            )
        )}
        <div className="loader relative">
          {loading && clients?.length > 0 && (
            <div className="loading-more">
              <Loader white />
            </div>
          )}
        </div>
      </StyledList>
    </>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  overflow: auto;
  height: calc(100svh - 232px);
  grid-auto-rows: max-content;
  @media (max-width: 1400px) {
    height: calc(100svh - 302px + 68px);
  }
  @media (max-width: 500px) {
    height: calc(100svh - 302px + 98px);
  }
`;
