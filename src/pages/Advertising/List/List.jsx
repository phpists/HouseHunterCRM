import { styled } from "styled-components";
import { Card } from "./Card/Card";
import { Empty } from "../../../components/Empty/Empty";
import { useState } from "react";
import { Confirm } from "../../../components/Confirm/Confirm";
import { Loader } from "../../../components/Loader";
import { EditComment } from "./EditComment";
import { DeleteInfo } from "../../../components/DeleteInfo/DeleteInfo";
import { useGetStatusAccountQuery } from "../../../store/objects/objects.api";

export const List = ({
  selected,
  onSelect,
  clients,
  innerRef,
  onDelete,
  loading,
  actionLoading,
  onChangeComment,
  data,
}) => {
  const [deleteModal, setDeleteModal] = useState(null);
  const [editComment, setEditComment] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(null);
  const { data: accounts } = useGetStatusAccountQuery();

  const handleOpenDeleteModal = (data) => {
    setDeleteModal(data);
  };

  const handleDelete = () => {
    onDelete(deleteModal);
    setDeleteModal(null);
  };

  return (
    <>
      {deleteModal && (
        <Confirm
          title={"Видалити оголошення?"}
          onSubmit={handleDelete}
          onClose={() => setDeleteModal(null)}
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
            (
              {
                id,
                id_resource,
                status,
                dt_publicate,
                id_user_olx,
                url_resource,
                img,
                title,
                id_rubric,
                id_obj,
              },
              i
            ) => (
              <Card
                key={i}
                selected={!!selected.find((s) => s === id_obj)}
                onSelect={() => onSelect(id_obj)}
                id_resource={id_resource}
                status={status}
                publicateDate={dt_publicate}
                olxInfo={accounts?.accounts?.find(
                  (a) => a.data?.id?.toString() === id_user_olx
                )}
                title={title}
                rubricId={id_rubric}
                img={img}
                onDelete={() => handleOpenDeleteModal({ id_user_olx, id_obj })}
                urlResource={url_resource}
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
