import styled from "styled-components";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";
import { Empty } from "../../components/Empty/Empty";
import {
  handleCheckAccess,
  handleCopy,
  handleResponse,
  showAlert,
} from "../../utilits";
import { useState } from "react";
import { AddToSelections } from "./AddToSelections";
import { Loader } from "../../components/Loader";
import { ObjectPriceHistory } from "../../components/ObjectPriceHistory";
import { ObjectCommentHistory } from "../../components/ObjectCommentHistory/ObjectCommentHistory";
import { ObjectHistory } from "../../components/ObjectHistory/ObjectHistory";
import {
  useLazyDeleteObjectQuery,
  useLazyPublishObjectQuery,
} from "../../store/objects/objects.api";
import { useAppSelect } from "../../hooks/redux";
import { EditObjectComment } from "../../components/EditObjectComment";
import { Confirm } from "../../components/Confirm/Confirm";
import { MarkObjectPhones } from "../../components/MarkObjectPhones/MarkObjectPhones";
import { FindClientsObjects } from "./FindClientsObjects";
import { DeleteInfo } from "../../components/DeleteInfo/DeleteInfo";
import { FastSelection } from "../../components/FastSelection/FastSelection";
import { ObjectAdModal } from "../../components/ObjectAdModal/ObjectAdModal";
import { useGetCompanyInfoQuery } from "../../store/billing/billing.api";
import { XHOUSE_COMPANY_ID } from "../../constants";
import { AdListModal } from "../../components/AdListModal/AdListModal";
import cogoToast from "cogo-toast";
import { ObjectInfo } from "./ObjectInfo";

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
  onChangeTags,
  filters,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const { accessData } = useAppSelect((state) => state.auth);
  const { data: companyInfo } = useGetCompanyInfoQuery();
  const [publishObject] = useLazyPublishObjectQuery();
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
  const [showContactId, setShowContactId] = useState(null);
  const [clientModal, setClientModal] = useState(null);
  const [confirmText, setConfimText] = useState("");
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [fastSelection, setFastSelection] = useState(null);
  const [advertaseObject, setAdvertaseObject] = useState(null);
  const [adListModal, setAdListModal] = useState(null);
  const [openObjectInfo, setOpenObjectInfo] = useState(null);

  const onChangeCurrency = (val) => setCurrency(val);
  const onChangeType = (val) => setType(val);

  const handleDelete = () => {
    setDeleting(true);
    deleteObject({
      id_objects: [deleteId],
      final_remove: isDeleted || deleteModal === "finally" ? "1" : undefined,
      reasone_remove: confirmText,
    }).then((resp) => {
      handleResponse(resp, () => {
        showAlert("success", "Обєкт успішно видалено!");
        onDeleteSuccess(deleteId);
      });
      setDeleting(false);
    });
  };

  const handleOpenDelete = (id, isFinally) => {
    setDeleteModal(isFinally ? "finally" : true);
    setDeleteId(id);
  };

  const handleCopyFastFolderLink = (id) => {
    const LINK = `https://fast-selection.house-hunter.info/?us=${
      user?.id
    }&id=${btoa(`["${id}"]`)}`;

    handleCopy(LINK);
  };

  const handleTelegramPublish = (id) => {
    const { hide } = cogoToast.loading("Опублікування реклами в телеграмі", {
      position: "top-right",
    });
    publishObject({
      id_obj: id,
      resource: "telegram",
    }).then((resp) => {
      setTimeout(() => {
        hide();
        handleResponse(
          resp,
          () => {
            const messages = {
              new: "Нове оголошення, до активації та провірки",
              active: "Опубліковано на olx",
              limited:
                "Вичерпаний ліміт безкоштовних оголошень у вибраній категорії",
              removed_by_user: "Видалено користувачем",
              outdated: "Оголошення досягло дати придатності",
              unconfirmed: "Оголошення очікує на підтвердження ",
              unpaid: "Очікується оплата",
              moderated: "Відхилено модератором",
              blocked: "Заблоковано модератором",
              disabled:
                "Вимкнено модерацією, пропозиція заблокована та очікує перевірки",
              removed_by_moderator: "Видалено",
            };
            showAlert(
              "info",
              messages[resp?.data?.status] ?? "Оголошення успішно опубліковано"
            );
          },
          () => {
            const message = resp?.data?.messege;
            showAlert("error", message);
          },
          true
        );
      }, 1000);
    });
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
      {fastSelection && (
        <FastSelection
          onClose={() => setFastSelection(null)}
          id={fastSelection}
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
          confirmText={
            isDeleted || deleteModal === "finally" ? null : confirmText
          }
          onChangeConfirmText={(val) => setConfimText(val)}
        />
      )}
      {clientModal ? (
        <FindClientsObjects
          onClose={() => setClientModal(null)}
          id={clientModal}
        />
      ) : null}
      {deleteInfo ? (
        <DeleteInfo onClose={() => setDeleteInfo(false)} text={deleteInfo} />
      ) : null}
      {advertaseObject ? (
        <ObjectAdModal
          onClose={() => setAdvertaseObject(null)}
          object={advertaseObject}
        />
      ) : null}
      {adListModal ? (
        <AdListModal onClose={() => setAdListModal(null)} data={adListModal} />
      ) : null}

      {openObjectInfo ? (
        <ObjectInfo
          onClose={() => setOpenObjectInfo(null)}
          object={openObjectInfo}
        />
      ) : null}
      <StyledList ref={innerRef}>
        {data?.length === 0 || actionLoading ? (
          <Empty loading={loading || actionLoading || deleting} />
        ) : (
          <>
            {data.map((d) => (
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
                  d?.type_object !== "street_base" &&
                  d?.type_object !== "mls" &&
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
                showContactId={showContactId}
                onShowContact={() => setShowContactId(d?.id)}
                onChangeTags={(fieldName, val) =>
                  onChangeTags(d?.id, fieldName, val)
                }
                onOpenPhonesModal={() => setClientModal(d?.id)}
                showClientObjectsCount
                onOpenDeleteReason={
                  d?.reasone_remove?.length > 0
                    ? () => setDeleteInfo(d?.reasone_remove)
                    : null
                }
                onFastSelection={
                  user?.show_fast_folder
                    ? () => handleCopyFastFolderLink(d?.id)
                    : null
                }
                onAdvertise={() => setAdvertaseObject(d)}
                onAdvertiseTelegram={
                  companyInfo?.data?.id_hash ===
                    "0022b718e5a80c0e3992686fd10ff1dc" &&
                  d?.type_object !== "street_base" &&
                  d?.type_object !== "mls"
                    ? () => handleTelegramPublish(d?.id)
                    : null
                }
                onOpenAdList={() => setAdListModal(d)}
                onOpenInfo={() => setOpenObjectInfo(d)}
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
