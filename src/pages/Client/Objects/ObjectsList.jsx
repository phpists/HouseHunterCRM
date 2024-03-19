import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetClientsObjectsQuery } from "../../../store/clients/clients.api";
// import { useLazyDeleteRequestQuery } from "../../../store/objects/objects.api";
import { Card } from "./Card/Card";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useLazyDeleteObjectQuery } from "../../../store/objects/objects.api";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { PRICES_FOR_TITLE } from "../../../constants";

export const ObjectsList = ({
  onSelect,
  onOpenInfo,
  active,
  onChangeObjectsCount,
  selectedItems,
  onSelectItem,
  isRefresh,
  onRefreshed,
  isEdit,
  isDelete,
  onSelectAll,
}) => {
  const { id } = useParams();
  const [objects, setObjects] = useState([]);
  const [getClientsObjects] = useLazyGetClientsObjectsQuery();
  const [deleteObject] = useLazyDeleteObjectQuery();
  const objectsCurrentPage = useRef(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleGetClientsObjects = () => {
    getClientsObjects({
      current_page: objectsCurrentPage.current,
      item_on_page: 100,
      id_client: id,
    }).then((resp) => {
      const data = resp?.data?.data;
      if (data) {
        onSelect({
          id: Object.entries(data)[0][1]?.id ?? null,
          type: "object",
        });
        setObjects(data);
        onSelectAll(
          Object.entries(data)?.map((o) => ({ id: o?.[1]?.id, type: "object" }))
        );
      }
    });
  };

  useEffect(() => {
    handleGetClientsObjects(true);
  }, []);

  useEffect(() => {
    if (isRefresh) {
      handleGetClientsObjects(true);
      onRefreshed(false);
    }
  }, [isRefresh]);

  const handleDeleteObjectSuccess = (id) => {
    setObjects(
      Object.fromEntries(
        Object.entries(objects).filter((req) => id !== req[1]?.id)
      )
    );
  };

  const handleToggleFavoriteStatus = (id) => {
    setObjects(
      Object.fromEntries(
        Object.entries(objects).map((req) => {
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

  const handleDeleteObject = () => {
    deleteObject([selectedCard]).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Об'єкт успішно видалено!", {
          hideAfter: 3,
          position: "top-right",
        });
        handleDeleteObjectSuccess(selectedCard);
        setSelectedCard(null);
      })
    );
  };

  useEffect(() => {
    onChangeObjectsCount(Object.entries(objects)?.length ?? 0);
  }, [objects]);

  return (
    <>
      {deleteModal && (
        <Confirm
          title="Видалити об'єкт?"
          onClose={handleCancelDeleteRequest}
          onSubmit={handleDeleteObject}
        />
      )}
      <div>
        {objects && Object.entries(objects)?.length
          ? Object.entries(objects).map((c, i) => (
              <Card
                key={`object-${i}`}
                selected={
                  //   active === c[1]?.id ||
                  !!selectedItems?.find((s) => s.id === c[1]?.id)
                }
                onSelect={() => onSelect({ id: c[1]?.id, type: "object" })}
                onSelectItem={() =>
                  onSelectItem({ id: c[1]?.id, type: "object" })
                }
                onOpenInfo={() => onOpenInfo(true)}
                date={c[1]?.dt_add}
                title={c[1]?.rubric}
                location={c[1]?.location}
                price={c[1]?.price_per_object_usd}
                currency="2"
                // price_for={
                //   PRICES_FOR_TITLE?.find((p) => p.value === c[1]?.price_for)
                //     ?.title ?? undefined
                // }
                id={c[1]?.id}
                favorite={c[1]?.favorite}
                onChangeFavorite={() => handleToggleFavoriteStatus(c[1]?.id)}
                onDelete={() => handleOnDeleteRequest(c[1]?.id)}
                photo=""
                isObject={true}
                isDelete={isDelete}
                isEdit={isEdit}
              />
            ))
          : null}
      </div>
    </>
  );
};
