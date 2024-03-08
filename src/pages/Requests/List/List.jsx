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
}) => {
  const [deleteRequest] = useLazyDeleteRequestQuery();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const { accessData } = useAppSelect((state) => state.auth);
  const [editComment, setEditComment] = useState(false);

  const handleCancelDeleteRequest = () => {
    setDeleteModal(false);
  };

  const handleOnDeleteRequest = (id) => {
    setDeleteModal(true);
    setSelectedCard(id);
  };

  const handleDeleteRequest = () => {
    deleteRequest([selectedCard]).then((resp) =>
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
          title="Видалити запит?"
          onClose={handleCancelDeleteRequest}
          onSubmit={handleDeleteRequest}
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
      <StyledList className="hide-scroll" ref={innerRef}>
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
