import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Actions } from "./Actions/Actions";
import { Card } from "./Card/Card";
import { useEffect, useState } from "react";
import { ObjectModal } from "./ObjectModal";
import { MobileHeader } from "./MobileHeader/MobileHeader";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { RequestsList } from "./RequestsList";
import { useRef } from "react";
import { ObjectsList } from "./ObjectsList";
import {
  useLazyAddToFavoritesQuery,
  useLazyDeleteObjectQuery,
  useLazyRestoreObjectsQuery,
} from "../../../store/objects/objects.api";
import {
  useLazyAddToFavoriteQuery,
  useLazyDeleteRequestQuery,
  useLazyRestoreRequestsQuery,
} from "../../../store/requests/requests.api";
import { handleCheckAccess, handleResponse, showAlert } from "../../../utilits";
import { useAppSelect } from "../../../hooks/redux";

export const Objects = ({
  selected,
  onSelect,
  isRefetch,
  onToggleIsRefetch,
  isDeleted,
}) => {
  const [openInfo, setOpenInfo] = useState(false);
  const [requestsCount, setRequestCount] = useState(0);
  const [objectsCount, setObjectsCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [deleteObjects] = useLazyDeleteObjectQuery();
  const [deleteRequests] = useLazyDeleteRequestQuery();
  const [addObjectsToFavorites] = useLazyAddToFavoritesQuery();
  const [addRequestsToFavorites] = useLazyAddToFavoriteQuery();
  const [refreshObjects, setRefreshObjects] = useState(false);
  const [refreshRequests, setRefreshRequests] = useState(false);
  const { accessData, user } = useAppSelect((state) => state.auth);
  const [allObjectsIds, setAllOjectsIds] = useState([]);
  const [allRequestsIds, setAllRequestsIds] = useState([]);
  const [restoreRequests] = useLazyRestoreRequestsQuery();
  const [restoreObjects] = useLazyRestoreObjectsQuery();
  const [confirmText, setConfimText] = useState("");

  const handleRefreshObjects = (val) => setRefreshObjects(val);
  const handleRefreshRequests = (val) => setRefreshRequests(val);

  useEffect(() => {
    if (isRefetch) {
      handleRefreshObjects(true);
      handleRefreshRequests(true);
      onToggleIsRefetch(false);
    }
  }, [isRefetch]);

  useEffect(() => {});
  const handleSelectItem = (item) =>
    setSelectedItems(
      !!selectedItems.find((s) => s.id === item.id)
        ? selectedItems.filter((s) => s.id !== item.id)
        : [...selectedItems, item]
    );

  const handleGetSelectedItemsByType = (type) =>
    selectedItems.filter((s) => s.type === type)?.map(({ id }) => id);

  const handleGetDeletedSelectedItems = () =>
    selectedItems?.filter(({ isDeleted }) => isDeleted)?.length > 0;

  const handleClearSelectedItemsByType = (type) =>
    setSelectedItems(selectedItems?.filter((s) => s.type !== type));

  const handleDeleteObjects = (objects, isFinally) => {
    deleteObjects({
      id_objects: objects,
      final_remove: isFinally ? "1" : undefined,
      reasone_remove: confirmText,
    }).then((resp) =>
      handleResponse(resp, () => {
        showAlert(
          "success",
          `Обєкт${objects?.length === 1 ? "" : "и"} успішно видалено!`
        );
        handleRefreshObjects(true);
        handleClearSelectedItemsByType("object");
      })
    );
  };

  const handleDeleteRequest = (requests, isFinally) => {
    deleteRequests({
      id_groups: requests,
      final_remove: isFinally ? "1" : undefined,
      reasone_remove: confirmText,
    }).then((resp) =>
      handleResponse(resp, () => {
        showAlert(
          "success",
          `Запит${requests?.length === 1 ? "" : "и"} успішно видалено!`
        );
        handleClearSelectedItemsByType("request");
        handleRefreshRequests(true);
      })
    );
  };

  const handleDeleteItems = (isFinally) => {
    const objects = handleGetSelectedItemsByType("object");
    const requests = handleGetSelectedItemsByType("request");

    objects?.length > 0 && handleDeleteObjects(objects, isFinally);
    requests?.length > 0 && handleDeleteRequest(requests, isFinally);
  };

  const handleToggleObjectsFavorites = (objects) => {
    addObjectsToFavorites(objects).then((resp) => {
      handleResponse(resp, () => {
        showAlert("success", "Статус успішно змінено!");
        handleClearSelectedItemsByType("object");
        handleRefreshObjects(true);
      });
    });
  };

  const handleToggleRequestsFavorites = (requests) => {
    Promise.all(
      requests?.map((id) =>
        addRequestsToFavorites(id).then((resp) => {
          handleResponse(resp, () => {
            showAlert("success", "Статус успішно змінено!");
          });
        })
      )
    ).then((resp) => {
      //   handleResponse(resp, onFavorite);
      handleClearSelectedItemsByType("request");
      handleRefreshRequests(true);
    });
  };

  const handleToggleItemsFavoriteStatus = () => {
    const objects = handleGetSelectedItemsByType("object");
    const requests = handleGetSelectedItemsByType("request");

    objects?.length > 0 && handleToggleObjectsFavorites(objects);
    requests?.length > 0 && handleToggleRequestsFavorites(requests);
  };

  const handleSelectAll = (isReset) => {
    setSelectedItems(isReset ? [] : [...allObjectsIds, ...allRequestsIds]);
  };

  const handleRestoreObjects = (objects) => {
    restoreObjects(objects).then((resp) =>
      handleResponse(resp, () => {
        showAlert(
          "success",
          `Обєкт${objects?.length === 1 ? "" : "и"} успішно відновлено!`
        );
        handleRefreshObjects(true);
        handleClearSelectedItemsByType("object");
      })
    );
  };

  const handleRestoreRequests = (requests, isFinally) => {
    restoreRequests(requests).then((resp) =>
      handleResponse(resp, () => {
        showAlert(
          "success",
          `Запит${requests?.length === 1 ? "" : "и"} успішно відновлено`
        );
        handleClearSelectedItemsByType("request");
        handleRefreshRequests(true);
      })
    );
  };

  const handleRestoreItems = () => {
    const objects = handleGetSelectedItemsByType("object");
    const requests = handleGetSelectedItemsByType("request");

    objects?.length > 0 && handleRestoreObjects(objects);
    requests?.length > 0 && handleRestoreRequests(requests);
  };

  return (
    <StyledObjects>
      {openInfo && (
        <ObjectModal
          onClose={() => setOpenInfo(false)}
          selectedObject={selected}
        />
      )}

      <Header
        requestsCount={requestsCount}
        objectsCount={objectsCount}
        selectedCount={selectedItems?.length}
        onDelete={handleDeleteItems}
        onDeleteFinally={
          user?.struct_level === 1 ? () => handleDeleteItems(true) : null
        }
        onToggleFavorite={
          handleGetDeletedSelectedItems()
            ? null
            : handleToggleItemsFavoriteStatus
        }
        onSelectAll={handleSelectAll}
        onRestore={handleRestoreItems}
        confirmText={confirmText}
        onChangeConfirmText={(val) => setConfimText(val)}
      />
      <div className="objects-content hide-scroll">
        {isDeleted ? null : <Actions accessData={accessData} />}
        <MobileHeader />
        <SelectItems
          title="обрано"
          className="mobile-select"
          selectedCount={selectedItems?.length}
          deleteConfirmTitle="Видалити обрані заявку(ки)/ об'єкт(и)?"
          onDelete={
            handleGetDeletedSelectedItems()
              ? user?.struct_level === 1
                ? handleDeleteItems
                : null
              : handleDeleteItems
          }
          onToggleFavorite={
            handleGetDeletedSelectedItems()
              ? null
              : handleToggleItemsFavoriteStatus
          }
          noFavorite={handleGetDeletedSelectedItems()}
          onSelectAll={handleSelectAll}
          passwordCheck
          onDeleteFinally={
            user?.struct_level === 1 ? () => handleDeleteItems(true) : null
          }
          confirmText={confirmText}
          onChangeConfirmText={(val) => setConfimText(val)}
        />
        {handleCheckAccess(accessData, "objects", "view") && (
          <ObjectsList
            onSelect={onSelect}
            onOpenInfo={(val) => setOpenInfo(val)}
            active={selected?.id}
            onChangeObjectsCount={(val) => setObjectsCount(val)}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            isRefresh={refreshObjects}
            onRefreshed={() => handleRefreshObjects(false)}
            isEdit={handleCheckAccess(accessData, "objects", "edit")}
            isDelete={handleCheckAccess(accessData, "objects", "delete")}
            onSelectAll={(val) => setAllOjectsIds(val)}
          />
        )}
        {handleCheckAccess(accessData, "requests", "view") && (
          <RequestsList
            onSelect={onSelect}
            onOpenInfo={(val) => setOpenInfo(val)}
            active={selected}
            onChangeRequestsCount={(val) => setRequestCount(val)}
            selectedItems={selectedItems}
            onSelectItem={handleSelectItem}
            isRefresh={refreshRequests}
            onRefreshed={() => handleRefreshRequests(false)}
            isEdit={handleCheckAccess(accessData, "requests", "edit")}
            isDelete={handleCheckAccess(accessData, "requests", "delete")}
            onSelectAll={(val) => setAllRequestsIds(val)}
          />
        )}
      </div>
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  border-radius: 15px;
  background: var(--modal-bg);
  .objects-content {
    padding: 10px;
    height: calc(100svh - 287px);
    overflow: auto;
  }
  .mobile-select {
    display: none;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  @media (max-width: 1400px) {
    .objects-content {
      height: auto;
    }
  }
  @media (max-width: 700px) {
    background: none;
    .mobile-select {
      display: flex;
    }
    .objects-content {
      padding: 0;
    }
  }
`;
