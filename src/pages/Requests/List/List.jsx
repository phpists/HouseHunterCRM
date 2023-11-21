import styled from "styled-components";
import { RequestCard } from "./RequestCard/RequestCard";
import { useLazyDeleteRequestQuery } from "../../../store/requests/requests.api";
import { useState } from "react";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { Confirm } from "../../../components/Confirm/Confirm";
import { Empty } from "../../../components/Empty/Empty";

export const List = ({
  selected,
  onSelect,
  data,
  innerRef,
  onDeleteRequest,
  onFavorite,
}) => {
  const [deleteRequest] = useLazyDeleteRequestQuery();
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

  return (
    <>
      {deleteModal && (
        <Confirm
          title="Видалити запит?"
          onClose={handleCancelDeleteRequest}
          onSubmit={handleDeleteRequest}
        />
      )}
      <StyledList className="hide-scroll" ref={innerRef}>
        {data && Object.entries(data)?.length === 0 ? (
          <Empty />
        ) : Object.entries(data)?.length > 0 ? (
          Object.entries(data)?.map((d, i) => {
            const id = Object.entries(d[1])[1][0];
            return (
              <RequestCard
                key={i}
                selected={!!selected.find((j) => j === d[0])}
                onSelect={() => onSelect(d[0])}
                data={d[1]}
                id={id}
                onDelete={() => handleOnDeleteRequest(d[0])}
                onFavorite={onFavorite}
              />
            );
          })
        ) : null}
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
