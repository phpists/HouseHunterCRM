import styled from "styled-components";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";
import { handleCheckAccess, handleCopy } from "../../utilits";
import { Empty } from "../../components/Empty/Empty";
import { ObjectHistory } from "../../components/ObjectHistory/ObjectHistory";
import { useState } from "react";
import { Loader } from "../../components/Loader";
import { ObjectCommentHistory } from "../../components/ObjectCommentHistory/ObjectCommentHistory";
import { AddToSelections } from "../Objects/AddToSelections";
import { Client } from "./Client/Client";
import { useAppSelect } from "../../hooks/redux";
import { EditObjectComment } from "../../components/EditObjectComment";
import { MarkObjectPhones } from "../../components/MarkObjectPhones/MarkObjectPhones";
import { EditObject } from "./EditObject";

export const List = ({
  data,
  onFindSimilar,
  selected,
  onSelect,
  onHide,
  onFavorite,
  innerRef,
  loading,
  isHideObjects,
  actionLoading,
  clientData,
  showClient,
  filters,
  onChangeComment,
  onChangeContacts,
  onChangeTags,
  onChangeObject,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const { accessData } = useAppSelect((state) => state.auth);
  const [openHistoryModal, setOpenHistoryModal] = useState(null);
  const [openCommentHistoryModal, setOpenCommentHistoryModal] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(null);
  const [editComment, setEditComment] = useState(false);
  const [currency, setCurrency] = useState(1);
  const [type, setType] = useState("4");
  const [markPhoneModal, setMarkPhoneModal] = useState(false);
  const [showContactId, setShowContactId] = useState(null);
  const [editObject, setEditObject] = useState(false);

  const onChangeCurrency = (val) => setCurrency(val);
  const onChangeType = (val) => setType(val);

  const handleCloseEditObjectModal = () => setEditObject(false);

  const handleCopyFastFolderLink = (id) => {
    const LINK = `https://fast-selection.house-hunter.info/?us=${
      user?.id
    }&id=${btoa(`["${id}"]`)}`;

    handleCopy(LINK);
  };

  return (
    <>
      {editObject && (
        <EditObject
          data={editObject}
          onClose={handleCloseEditObjectModal}
          onSuccess={onChangeObject}
        />
      )}
      {markPhoneModal && (
        <MarkObjectPhones
          onClose={() => setMarkPhoneModal(null)}
          object={markPhoneModal}
          onSuccess={onChangeContacts}
        />
      )}
      {openAddModal && (
        <AddToSelections
          onClose={() => setOpenAddModal(false)}
          idObject={openAddModal}
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
      {editComment && (
        <EditObjectComment
          onClose={() => setEditComment(false)}
          object={editComment}
          onChange={onChangeComment}
        />
      )}
      {clientData && showClient ? <Client clientData={clientData} /> : null}
      <StyledList ref={innerRef} showClient={showClient}>
        {clientData && showClient ? (
          <Client clientData={clientData} className="mobileClient" />
        ) : null}
        {data?.length === 0 || actionLoading ? (
          <Empty loading={loading || actionLoading} />
        ) : (
          data.map((d) => (
            <ObjectCard
              key={d?.id}
              selected={!!selected.find((j) => j === d?.id)}
              onSelect={() => onSelect(d?.id)}
              data={{
                ...d,
                title: d?.title_agent?.length > 0 ? d?.title_agent : d?.title,
                description:
                  d?.description_agent?.length > 0
                    ? d?.description_agent
                    : d?.description,
              }}
              onToggleFavoriteStatus={
                onFavorite ? () => onFavorite(d?.id) : null
              }
              onFindSimilar={() => onFindSimilar(d)}
              isEdit={handleCheckAccess(accessData, "objects", "edit")}
              onHide={() => onHide(d?.id)}
              isHideObjects={isHideObjects}
              onOpenTagsHistory={() =>
                setOpenHistoryModal({
                  id: d?.id,
                  isStreetBase: d?.obj_street_base === "1",
                })
              }
              onOpenCommetHistory={() =>
                setOpenCommentHistoryModal({ id: d?.id })
              }
              onAddToSelection={() => setOpenAddModal(d?.id)}
              showLike={typeof d?.like === "boolean"}
              onChangeComment={() =>
                setEditComment({
                  id: d?.id,
                  comment: d?.comment,
                  isEdit: d?.acsses_change || d?.type_object === "street_base",
                })
              }
              currency={currency}
              onChangeCurrency={onChangeCurrency}
              type={type}
              onChangeType={onChangeType}
              selections
              onMarkPhone={
                d?.type_object === "street_base"
                  ? () => setMarkPhoneModal(d)
                  : null
              }
              showContactId={showContactId}
              onShowContact={() => setShowContactId(d?.id)}
              onChangeTags={(fieldName, val) =>
                onChangeTags(d?.id, fieldName, val)
              }
              editable
              onEdit={() => setEditObject(d)}
              onFastSelection={
                user?.show_fast_folder
                  ? () => handleCopyFastFolderLink(d?.id)
                  : null
              }
            />
          ))
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
  height: calc(100svh - ${({ showClient }) => (showClient ? 295 : 205)}px);
  overflow: auto;
  gap: 10px;
  position: relative;
  .mobileClient {
    display: none;
  }
  @media (max-width: 800px) {
    height: calc(100svh - 200px);
    .mobileClient {
      display: grid;
    }
  }
`;
