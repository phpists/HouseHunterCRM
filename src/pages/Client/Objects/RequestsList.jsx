import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetClientsRequestQuery } from "../../../store/clients/clients.api";
import { useLazyDeleteRequestQuery } from "../../../store/requests/requests.api";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { Card } from "./Card/Card";
import { Confirm } from "../../../components/Confirm/Confirm";

export const RequestsList = ({
  onSelect,
  onOpenInfo,
  active,
  onChangeRequestsCount,
  selectedItems,
  onSelectItem,
  isRefresh,
  onRefreshed,
}) => {
  const { id } = useParams();
  const [requests, setRequests] = useState([]);
  const [getClientsRequests] = useLazyGetClientsRequestQuery();
  const [deleteRequest] = useLazyDeleteRequestQuery();
  const requestsCurrentPage = useRef(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleGetClientsRequests = (isReset) => {
    getClientsRequests({
      current_page: requestsCurrentPage.current,
      item_on_page: 100,
      id_client: id,
    }).then((resp) => {
      const data = resp?.data?.data;
      onSelect({ id: Object.entries(data)[0][1]?.id ?? null, type: "request" });
      setRequests(isReset ? data : { ...requests, ...data });
    });
  };

  useEffect(() => {
    handleGetClientsRequests(true);
  }, []);

  useEffect(() => {
    if (isRefresh) {
      handleGetClientsRequests(true);
      onRefreshed(false);
    }
  }, [isRefresh]);

  const handleDeleteRequestSuccess = (id) => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).filter((req) => id !== req[1]?.id)
      )
    );
  };

  const handleToggleFavoriteStatus = (id) => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).map((req) => {
          if (req[1]?.id === id) {
            let request = [];
            request[0] = req[0];
            request[1] = { ...req[1], favorite: !req[1]?.favorite };
            return request;
          }
          return req;
        })
      )
    );
  };

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
        handleDeleteRequestSuccess(selectedCard);
        setSelectedCard(null);
      })
    );
  };

  useEffect(() => {
    onChangeRequestsCount(Object.entries(requests)?.length ?? 0);
  }, [requests]);

  return (
    <>
      {deleteModal && (
        <Confirm
          title="Видалити запит?"
          onClose={handleCancelDeleteRequest}
          onSubmit={handleDeleteRequest}
        />
      )}
      <div>
        {requests && Object.entries(requests)?.length
          ? Object.entries(requests).map((c, i) => (
              <Card
                key={1}
                selected={
                  active === c[1]?.id ||
                  !!selectedItems?.find((s) => s.id === c[1]?.id)
                }
                onSelect={() => onSelect({ id: c[1]?.id, type: "request" })}
                onSelectItem={() =>
                  onSelectItem({ id: c[1]?.id, type: "request" })
                }
                onOpenInfo={() => onOpenInfo(true)}
                date={c[1]?.dt_add}
                title={c[1]?.rubric}
                location={c[1]?.location}
                price={c[1]?.price_min}
                id={c[1]?.id}
                favorite={c[1]?.favorite}
                onChangeFavorite={() => handleToggleFavoriteStatus(c[1]?.id)}
                onDelete={() => handleOnDeleteRequest(c[1]?.id)}
              />
            ))
          : null}
      </div>
    </>
  );
};
