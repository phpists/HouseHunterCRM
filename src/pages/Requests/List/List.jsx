import styled from "styled-components";
import { RequestCard } from "./RequestCard/RequestCard";
import { useLazyDeleteRequestQuery } from "../../../store/requests/requests.api";
import { useState } from "react";
import { handleCheckAccess, handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { Confirm } from "../../../components/Confirm/Confirm";
import { Empty } from "../../../components/Empty/Empty";
import { Chat } from "../../../components/Chat/Chat";
import { Loader } from "../../../components/Loader";
import { EditComment } from "./EditComment";
import { useAppSelect } from "../../../hooks/redux";

export const List = ({
  selected,
  onSelect,
  data,
  innerRef,
  onDeleteRequest,
  onFavorite,
  loading,
  actionLoading,
  onChangeComment,
  onOpenChat,
  onRestore,
  isDeletedRequests,
  onChangeNewCount,
}) => {
  const [deleteRequest] = useLazyDeleteRequestQuery();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const { accessData, user } = useAppSelect((state) => state.auth);
  const [editComment, setEditComment] = useState(false);

  const handleCancelDeleteRequest = () => {
    setDeleteModal(false);
  };

  const handleOnDeleteRequest = (id, isFinally) => {
    setDeleteModal(isFinally ? "finally" : true);
    setSelectedCard(id);
  };

  const handleDeleteRequest = () => {
    deleteRequest({
      id_groups: [selectedCard],
      final_remove:
        isDeletedRequests || deleteModal === "finally" ? "1" : undefined,
    }).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Заявку успішно видалено!", {
          hideAfter: 3,
          position: "top-right",
        });
        onDeleteRequest(selectedCard);
        setSelectedCard(null);
      })
    );
  };

  const handleOpenChat = (id) => {
    setSelectedChat(id);
    onOpenChat(id);
  };

  return (
    <>
      {deleteModal && (
        <Confirm
          title={
            isDeletedRequests || deleteModal === "finally"
              ? "Видалити запит остаточно?"
              : "Видалити запит?"
          }
          onClose={handleCancelDeleteRequest}
          onSubmit={handleDeleteRequest}
          passwordCheck={isDeletedRequests || deleteModal === "finally"}
        />
      )}
      {selectedChat && (
        <Chat
          onClose={() => setSelectedChat(false)}
          requestObjectId={selectedChat}
        />
      )}
      {editComment && (
        <EditComment
          onClose={() => setEditComment(false)}
          request={editComment}
          onChange={onChangeComment}
        />
      )}
      <StyledList ref={innerRef}>
        {(data && Object.entries(data)?.length === 0) || actionLoading ? (
          <Empty loading={loading || actionLoading} />
        ) : Object.entries(data)?.length > 0 ? (
          Object.entries(data)?.map((d, i) => {
            const id = Object.entries(d[1])[1][0];
            return (
              <RequestCard
                key={id}
                selected={!!selected.find((j) => j === d[0])}
                onSelect={() => onSelect(d[0])}
                data={d[1]}
                id={id}
                onDelete={() => handleOnDeleteRequest(d[0])}
                onDeleteFinally={() => handleOnDeleteRequest(d[0], true)}
                onFavorite={onFavorite}
                isEdit={handleCheckAccess(accessData, "requests", "edit")}
                isDelete={handleCheckAccess(accessData, "requests", "delete")}
                onOpenChat={() => handleOpenChat(d[0])}
                onChangeComment={() =>
                  setEditComment({
                    id: d[1]?.id_group,
                    comment: d[1]?.General_field_group?.comment_group,
                  })
                }
                onRestore={() => onRestore(d[0], d[1]?.id_group)}
                onChangeNewCount={(count) => onChangeNewCount(count, d[0])}
              />
            );
          })
        ) : null}
        <div className="loader relative">
          {loading && data && Object.entries(data)?.length > 0 && (
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
`;
