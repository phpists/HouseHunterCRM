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
import { useGetStatusAccountQuery } from "../../../store/objects/objects.api";

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
  data,
}) => {
  const [deleteModal, setDeleteModal] = useState(null);
  const [isDeleteFinally, setIsDeleteFinally] = useState(null);
  const [editComment, setEditComment] = useState(false);
  const { accessData, user } = useAppSelect((state) => state.auth);
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const [confirmText, setConfimText] = useState("");
  const [deleteInfo, setDeleteInfo] = useState(null);
  const { data: accounts } = useGetStatusAccountQuery();

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
        {data?.length === 0 || actionLoading ? (
          <Empty loading={loading || actionLoading} />
        ) : (
          data?.map(
            ({ id, id_resource, status, dt_publicate, id_user_olx }, i) => (
              <Card
                key={i}
                selected={!!selected.find((s) => s === id)}
                onSelect={() => onSelect(id)}
                id_resource={id_resource}
                status={status}
                publicateDate={dt_publicate}
                olxInfo={accounts?.accounts?.find(
                  (a) => a.data?.id?.toString() === id_user_olx
                )}
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
