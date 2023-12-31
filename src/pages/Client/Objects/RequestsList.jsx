import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetClientsRequestQuery } from "../../../store/clients/clients.api";
import { useLazyDeleteRequestQuery } from "../../../store/requests/requests.api";
import { handleFormatDate, handleResponse } from "../../../utilits";
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
  isDelete,
  isEdit,
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
      if (data) {
        setRequests(isReset ? data : { ...requests, ...data });
      }
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
        Object.entries(requests).filter(
          (req) => id !== Object.entries(req[1])[1][1]?.id_group
        )
      )
    );
  };

  const handleToggleFavoriteStatus = (id) => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).map((req) => {
          const reqId = Object.entries(req[1])[1][1]?.id_group;
          if (reqId === id) {
            let request = [];
            request[0] = req[0];
            request[1] = {
              ...req[1],
              General_field_group: {
                ...req[1].General_field_group,
                favorite: !req[1].General_field_group.favorite,
              },
            };
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
          ? Object.entries(requests).map((c, i) => {
              const id = c[0];
              const infoField = Object.entries(c[1]).filter(
                (f) => f[0] !== "General_field_group"
              )[0][1];

              return (
                <Card
                  key={`request-${i}`}
                  selected={
                    active === id || !!selectedItems?.find((s) => s.id === id)
                  }
                  onSelect={() => onSelect({ id: id, type: "request" })}
                  onSelectItem={() => onSelectItem({ id: id, type: "request" })}
                  onOpenInfo={() => onOpenInfo(true)}
                  date={handleFormatDate(
                    Number(c[1]?.General_field_group?.dt_deadline) * 1000,
                    true
                  )}
                  title={infoField?.rubric}
                  location={infoField?.location}
                  price={infoField?.price_min}
                  id={id}
                  favorite={c[1]?.General_field_group?.favorite}
                  onChangeFavorite={() => handleToggleFavoriteStatus(id)}
                  onDelete={() => handleOnDeleteRequest(id)}
                  isDelete={isDelete}
                  isEdit={isEdit}
                />
              );
            })
          : null}
      </div>
    </>
  );
};
