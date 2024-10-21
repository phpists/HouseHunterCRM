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
  useGetCommentsToFieldsQuery,
  useLazyDeleteAdHistoryQuery,
  useLazyDeleteAdQuery,
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
import cogoToast from "cogo-toast";
import {
  useLazyRemoveFlombuAdHistoryQuery,
  useLazyRemoveFlombuAdQuery,
  useLazyRemoveRealestateAdHistoryQuery,
} from "../../store/auth/auth.api";

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
  onChangeTags,
  onUpdateObject,
  filters,
  isMyStructAds,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const { accessData } = useAppSelect((state) => state.auth);
  const { data: companyInfo } = useGetCompanyInfoQuery();
  const [publishObject] = useLazyPublishObjectQuery();
  const [openAddModal, setOpenAddModal] = useState(null);
  const [openHistoryModal, setOpenHistoryModal] = useState(null);
  const [openHistoryPriceModal, setOpenHistoryPriceModal] = useState(null);
  const [openCommentHistoryModal, setOpenCommentHistoryModal] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [currency, setCurrency] = useState(1);
  const [type, setType] = useState("4");
  const [markPhoneModal, setMarkPhoneModal] = useState(false);
  const [showContactId, setShowContactId] = useState(null);
  const [clientModal, setClientModal] = useState(null);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const [fastSelection, setFastSelection] = useState(null);
  const [advertaseObject, setAdvertaseObject] = useState(null);
  const [deleteAd] = useLazyDeleteAdQuery();
  const [deleteAdHistory] = useLazyDeleteAdHistoryQuery();
  const [deleteRealestateAdHistory] = useLazyRemoveRealestateAdHistoryQuery();
  const [deleteFlombuAd] = useLazyRemoveFlombuAdQuery();
  const [deleteFlombuAdHistory] = useLazyRemoveFlombuAdHistoryQuery();
  const [deleteType, setDeleteType] = useState(null);
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();

  const onChangeCurrency = (val) => setCurrency(val);
  const onChangeType = (val) => setType(val);

  const handleDelete = (isHistory) => {
    setDeleting(true);
    if (isHistory) {
      if (deleteType === "olx") {
        deleteAdHistory({
          id_obj: [deleteId],
          id_user_olx: data?.find((o) => o.id_ad_in_source === deleteId)
            ?.id_user_olx,
        }).then((resp) => {
          handleResponse(resp, () => {
            showAlert("success", `Оголошення успішно видалено!`);
            onDeleteSuccess([deleteId]);
          });
          setDeleting(false);
        });
      } else if (deleteType === "flombu") {
        deleteFlombuAdHistory(deleteId).then((resp) => {
          handleResponse(resp, () => {
            showAlert("success", `Оголошення успішно видалено!`);
            onDeleteSuccess([
              data?.find((o) => o.id_obj === deleteId)?.id_ad_in_source,
            ]);
          });
          setDeleting(false);
        });
      } else {
        deleteRealestateAdHistory({
          id_obj: data?.find((o) => o.id_ad_in_source === deleteId)?.id_obj,
          id_account: data?.find((o) => o.id_ad_in_source === deleteId)
            ?.id_realestate_account,
        }).then((resp) => {
          handleResponse(resp, () => {
            showAlert("success", `Оголошення успішно видалено!`);
            onDeleteSuccess([deleteId]);
          });
          setDeleting(false);
        });
      }
    } else {
      if (deleteType === "olx") {
        deleteAd({
          id_obj: deleteId,
          id_user_olx: data?.find((o) => o.id_ad_in_source === deleteId)
            ?.id_user_olx,
        }).then((resp) => {
          handleResponse(
            resp,
            () => {
              showAlert("success", `Оголошення деактивовано!`);
              onDeleteSuccess([deleteId]);
            },
            (err) => {
              if (resp?.data?.error === 151) {
                setTimeout(() => {
                  setDeleteModal("history");
                  setDeleteId(deleteId);
                }, 1000);
              }
            }
          );
          setDeleting(false);
        });
      } else if (deleteType === "flombu") {
        deleteFlombuAd(deleteId).then((resp) => {
          handleResponse(
            resp,
            () => {
              showAlert("success", `Оголошення деактивовано!`);
              //   onDeleteSuccess([
              //     data?.find((o) => o.id_ad_in_source === deleteId)?.id_obj,
              //   ]);
              onUpdateObject(
                data?.find((o) => o.id_obj === deleteId)?.id_ad_in_source,
                "status",
                resp?.data?.status
              );
            },
            () => {
              const fields = resp?.data?.fields_validation
                ? resp?.data?.fields_validation?.map(
                    (f) => commentsToFields?.object[f]
                  )
                : [];
              showAlert("error", `${resp?.data?.messege} ${fields?.join(",")}`);
            },
            true
          );
          setDeleting(false);
        });
      }
    }
  };

  const handleOpenDelete = (id, isHistory, type) => {
    setDeleteModal(isHistory ? "history" : true);
    setDeleteId(id);
    setDeleteType(type);
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
            deleteModal === "history"
              ? "Оголошення видалиться з історії публікацій. Видалити оголошення?"
              : "Оголошення на ресурсі буде деактивоване. Деактивувати оголошення?"
          }
          onClose={() => setDeleteModal(false)}
          onSubmit={() => handleDelete(deleteModal === "history")}
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

      <StyledList ref={innerRef}>
        {data?.length === 0 || actionLoading ? (
          <Empty loading={loading || actionLoading || deleting} />
        ) : (
          <>
            {data.map((d, i) => (
              <ObjectCard
                key={i}
                selected={!!selected.find((j) => j === d?.id_ad_in_source)}
                onSelect={() => onSelect(d?.id_ad_in_source)}
                data={{ ...d, id: d?.id_ad_in_source, img: [{ name: d?.img }] }}
                onToggleFavoriteStatus={() =>
                  toggleFavoriteStatus(d?.id_ad_in_source)
                }
                onFindSimilar={() => onFindSimilar(d)}
                isEdit={handleCheckAccess(accessData, "objects", "edit")}
                onAddToSelection={() => setOpenAddModal(d?.id_ad_in_source)}
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
                onDelete={() => handleOpenDelete(d?.id_ad_in_source)}
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
                onUpdateField={(field, value, isObject) =>
                  onUpdateObject(d?.id_ad_in_source, field, value, isObject)
                }
                onDeleteAd={
                  d?.id_resource === "1" || d?.id_resource === "3"
                    ? () =>
                        handleOpenDelete(
                          d?.id_obj,
                          false,
                          d?.id_resource === "1"
                            ? "olx"
                            : d?.id_resource === "3"
                            ? "flombu"
                            : "realestate"
                        )
                    : null
                }
                onDeleteHistory={() =>
                  handleOpenDelete(
                    d?.id_resource === "3" ? d?.id_obj : d?.id_ad_in_source,
                    true,
                    d?.id_resource === "1"
                      ? "olx"
                      : d?.id_resource === "3"
                      ? "flombu"
                      : "realestate"
                  )
                }
                ad
                noEdit={isMyStructAds}
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
