import styled from "styled-components";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";
import { Empty } from "../../components/Empty/Empty";
import { useGetAccessQuery } from "../../store/auth/auth.api";
import { handleCheckAccess, handleResponse } from "../../utilits";
import { useState } from "react";
import { AddToSelections } from "./AddToSelections";
import { Loader } from "../../components/Loader";
import { ObjectPriceHistory } from "../../components/ObjectPriceHistory";
import { ObjectCommentHistory } from "../../components/ObjectCommentHistory/ObjectCommentHistory";
import { ObjectHistory } from "../../components/ObjectHistory/ObjectHistory";
import { useLazyDeleteObjectQuery } from "../../store/objects/objects.api";
import cogoToast from "cogo-toast";
import { useAppSelect } from "../../hooks/redux";
import { EditObjectComment } from "../../components/EditObjectComment";
import { Confirm } from "../../components/Confirm/Confirm";
import { MarkObjectPhones } from "../../components/MarkObjectPhones/MarkObjectPhones";

export const List = ({
  selected,
  onSelect,
  data,
  toggleFavoriteStatus,
  onFindSimilar,
  innerRef,
  loading,
  actionLoading,
  onDeleteSuccess,
  onChangeComment,
  onChangeContancts,
  onRestore,
  isDeleted,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const { accessData } = useAppSelect((state) => state.auth);
  const [openAddModal, setOpenAddModal] = useState(null);
  const [openHistoryModal, setOpenHistoryModal] = useState(null);
  const [openHistoryPriceModal, setOpenHistoryPriceModal] = useState(null);
  const [openCommentHistoryModal, setOpenCommentHistoryModal] = useState(null);
  const [deleteObject] = useLazyDeleteObjectQuery();
  const [deleting, setDeleting] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currency, setCurrency] = useState(1);
  const [type, setType] = useState("4");
  const [markPhoneModal, setMarkPhoneModal] = useState(false);

  const onChangeCurrency = (val) => setCurrency(val);
  const onChangeType = (val) => setType(val);

  const handleDelete = () => {
    setDeleting(true);
    deleteObject({
      id_objects: [deleteId],
      final_remove: isDeleted || deleteModal === "finally" ? "1" : undefined,
    }).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success(`Обєкт успішно видалено!`, {
          hideAfter: 3,
          position: "top-right",
        });
        onDeleteSuccess(deleteId);
      });
      setDeleting(false);
    });
  };

  const handleOpenDelete = (id, isFinally) => {
    setDeleteModal(isFinally ? "finally" : true);
    setDeleteId(id);
  };
  return (
    <>
      {markPhoneModal && (
        <MarkObjectPhones
          onClose={() => setMarkPhoneModal(null)}
          object={markPhoneModal}
          onSuccess={onChangeContancts}
        />
      )}
      {openCommentHistoryModal && (
        <ObjectCommentHistory
          onClose={() => setOpenCommentHistoryModal(null)}
          object={openCommentHistoryModal}
        />
      )}
      {openHistoryModal && (
        <ObjectHistory
          onClose={() => setOpenHistoryModal(null)}
          object={openHistoryModal}
        />
      )}
      {openHistoryPriceModal && (
        <ObjectPriceHistory
          onClose={() => setOpenHistoryPriceModal(null)}
          data={openHistoryPriceModal}
        />
      )}
      {openAddModal && (
        <AddToSelections
          onClose={() => setOpenAddModal(false)}
          idObject={openAddModal}
        />
      )}
      {editComment && (
        <EditObjectComment
          onClose={() => setEditComment(false)}
          object={editComment}
          onChange={onChangeComment}
        />
      )}
      {deleteModal && (
        <Confirm
          title={
            isDeleted || deleteModal === "finally"
              ? "Видалити об'єкт остаточно?"
              : "Видалити об'єкт?"
          }
          onClose={() => setDeleteModal(false)}
          onSubmit={handleDelete}
          passwordCheck={isDeleted || deleteModal === "finally"}
        />
      )}
      <StyledList ref={innerRef}>
        {data?.length === 0 || actionLoading || deleting ? (
          <Empty loading={loading || actionLoading || deleting} />
        ) : (
          <>
            {data.map((d, i) => (
              <ObjectCard
                key={d?.id}
                selected={!!selected.find((j) => j === d?.id)}
                onSelect={() => onSelect(d?.id)}
                data={d}
                onToggleFavoriteStatus={() => toggleFavoriteStatus(d?.id)}
                onFindSimilar={() => onFindSimilar(d)}
                isEdit={handleCheckAccess(accessData, "objects", "edit")}
                onAddToSelection={() => setOpenAddModal(d?.id)}
                onOpenTagsHistory={() =>
                  setOpenHistoryModal({
                    id: d?.id,
                    isStreetBase: d?.obj_street_base === "1",
                  })
                }
                onOpenCommetHistory={() =>
                  setOpenCommentHistoryModal({ id: d?.id })
                }
                onOpenPriceHistory={() =>
                  setOpenHistoryPriceModal(d?.price_history_json)
                }
                onDelete={
                  d?.deleted === "1"
                    ? user?.struct_level === 1
                      ? () => handleOpenDelete(d?.id)
                      : null
                    : () => handleOpenDelete(d?.id)
                }
                onDeleteFinally={
                  user?.struct_level === 1
                    ? () => handleOpenDelete(d?.id, true)
                    : null
                }
                onChangeComment={() =>
                  setEditComment({
                    id: d?.id,
                    comment: d?.comment,
                    isEdit:
                      d?.acsses_change || d?.type_object === "street_base",
                  })
                }
                searchTag="?objects"
                currency={currency}
                onChangeCurrency={onChangeCurrency}
                type={type}
                onChangeType={onChangeType}
                onMarkPhone={
                  d?.type_object === "street_base"
                    ? () => setMarkPhoneModal(d)
                    : null
                }
                isDeleted={d?.deleted === "1"}
                onRestore={d?.acsses_change ? () => onRestore([d?.id]) : null}
              />
            ))}
          </>
        )}
        <div className="loader relative">
          {loading && data?.length > 0 && (
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
  grid-auto-rows: max-content;
  height: calc(100svh - 225px);
  overflow: auto;
  gap: 10px;
  position: relative;

  @media (max-width: 800px) {
    height: calc(100svh - 200px);
  }
`;
