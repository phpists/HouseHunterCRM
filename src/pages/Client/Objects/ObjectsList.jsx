import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetClientsObjectsQuery } from "../../../store/clients/clients.api";
// import { useLazyDeleteRequestQuery } from "../../../store/objects/objects.api";
import { Card } from "./Card/Card";
import { Confirm } from "../../../components/Confirm/Confirm";
import {
  useLazyDeleteObjectQuery,
  useLazyRestoreObjectsQuery,
} from "../../../store/objects/objects.api";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { PRICES_FOR_TITLE } from "../../../constants";
import { useAppSelect } from "../../../hooks/redux";

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
  const TYPES = ["", "metr", "sotka", "hektar", "object"];
  const { id } = useParams();
  const [objects, setObjects] = useState([]);
  const [getClientsObjects] = useLazyGetClientsObjectsQuery();
  const [deleteObject] = useLazyDeleteObjectQuery();
  const objectsCurrentPage = useRef(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [restoreObjects] = useLazyRestoreObjectsQuery();
  const { user } = useAppSelect((state) => state.auth);

  const handleGetClientsObjects = () => {
    getClientsObjects({
      current_page: objectsCurrentPage.current,
      item_on_page: 100,
      id_client: id,
    }).then((resp) => {
      const data = resp?.data?.data;
      if (data) {
        onSelect({
          id: data?.[0]?.id ?? null,
          type: "object",
        });
        setObjects(data);
        onSelectAll(data?.map((o) => ({ id: o.id, type: "object" })));
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
    setObjects(objects.filter((o) => id !== o?.id));
  };

  const handleToggleFavoriteStatus = (id) => {
    setObjects(
      objects.map((obj) =>
        obj?.id === id ? { ...obj, favorite: !obj?.favorite } : obj
      )
    );
  };

  const handleCancelDeleteRequest = () => {
    setDeleteModal(false);
  };

  const handleOnDeleteRequest = (id, isFinally) => {
    setDeleteModal(isFinally ? "finally" : true);
    setSelectedCard(id);
  };

  const handleGetObjectById = (id) => objects?.find((o) => o?.id === id);

  const handleToggleDeletedStatus = (id, value) =>
    setObjects(
      objects?.map((o) => (o?.id === id ? { ...o, deleted: value } : o))
    );

  const handleDeleteObject = () => {
    deleteObject({
      id_objects: [selectedCard],
      final_remove:
        handleGetObjectById(selectedCard)?.deleted === "1" ? "1" : undefined,
    }).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Об'єкт успішно видалено!", {
          hideAfter: 3,
          position: "top-right",
        });
        handleGetObjectById(selectedCard)?.deleted === "1"
          ? handleDeleteObjectSuccess(selectedCard)
          : handleToggleDeletedStatus(selectedCard, "1");
        setSelectedCard(null);
      })
    );
  };

  useEffect(() => {
    onChangeObjectsCount(objects?.length ?? 0);
  }, [objects]);

  const handleRestoreObject = (id) => {
    restoreObjects([id]).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success(`Oб'єкт успішно відновлено`, {
          hideAfter: 3,
          position: "top-right",
        });
        handleToggleDeletedStatus(id, "0");
      })
    );
  };

  return (
    <>
      {deleteModal && (
        <Confirm
          title={
            deleteModal === "finally"
              ? "Видалити об'єкт остаточно?"
              : "Видалити об'єкт?"
          }
          onClose={handleCancelDeleteRequest}
          onSubmit={handleDeleteObject}
          passwordCheck={deleteModal === "finally"}
        />
      )}
      <div>
        {objects && objects.length
          ? objects.map((c, i) => (
              <Card
                key={`object-${i}`}
                selected={
                  //   active === c?.id ||
                  !!selectedItems?.find((s) => s.id === c?.id)
                }
                onSelect={() => onSelect({ id: c?.id, type: "object" })}
                onSelectItem={() =>
                  onSelectItem({
                    id: c?.id,
                    type: "object",
                    isDeleted: c?.deleted === "1",
                  })
                }
                onOpenInfo={() => onOpenInfo(true)}
                date={c?.dt_add}
                title={c?.rubric}
                location={c?.location}
                price={
                  c?.[
                    `price_per_${TYPES[c?.price_for]}_${
                      c?.price_currency === "1"
                        ? "uah"
                        : c?.price_currency === "2"
                        ? "usd"
                        : "eur"
                    }`
                  ]
                }
                currency={c?.price_currency}
                isDeleted={c?.deleted === "1"}
                // price_for={
                //   PRICES_FOR_TITLE?.find((p) => p.value === c?.price_for)
                //     ?.title ?? undefined
                // }
                id={c?.id}
                favorite={c?.favorite}
                onChangeFavorite={() => handleToggleFavoriteStatus(c?.id)}
                onDelete={() => handleOnDeleteRequest(c?.id)}
                onDeleteFinally={
                  user?.struct_level === 1
                    ? () => handleOnDeleteRequest(c?.id, true)
                    : null
                }
                photo=""
                isObject={true}
                isDelete={isDelete}
                isEdit={isEdit}
                onRestore={() => handleRestoreObject(c?.id)}
              />
            ))
          : null}
      </div>
    </>
  );
};
