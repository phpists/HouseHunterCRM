import styled from "styled-components";
import { RequestCard } from "./RequestCard/RequestCard";
import { useLazyDeleteRequestQuery } from "../../../store/requests/requests.api";
import { useState } from "react";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { Confirm } from "../../../components/Confirm/Confirm";

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
        {data && Object.entries(data)?.length
          ? Object.entries(data)?.map((data, i) => (
              <RequestCard
                key={i}
                selected={!!selected.find((j) => j === data[0])}
                onSelect={() => onSelect(data[0])}
                data={data[1]}
                id={data[0]}
                onDelete={() => handleOnDeleteRequest(data[0])}
                onFavorite={onFavorite}
              />
            ))
          : null}
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
