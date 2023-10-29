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
} from "../../../store/objects/objects.api";
import {
  useLazyAddToFavoriteQuery,
  useLazyDeleteRequestQuery,
} from "../../../store/requests/requests.api";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";

export const Objects = ({ selected, onSelect }) => {
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

  const handleRefreshObjects = (val) => setRefreshObjects(val);
  const handleRefreshRequests = (val) => setRefreshRequests(val);

  const handleSelectItem = (item) =>
    setSelectedItems(
      !!selectedItems.find((s) => s.id === item.id)
        ? selectedItems.filter((s) => s.id !== item.id)
        : [...selectedItems, item]
    );

  const handleGetSelectedItemsByType = (type) =>
    selectedItems.filter((s) => s.type === type)?.map(({ id }) => id);

  const handleClearSelectedItemsByType = (type) =>
    setSelectedItems(selectedItems?.filter((s) => s.type !== type));

  const handleDeleteObjects = (objects) => {
    deleteObjects(objects).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success(
          `Обєкт${objects?.length === 1 ? "" : "и"} успішно видалено!`,
          {
            hideAfter: 3,
            position: "top-right",
          }
        );
        handleRefreshObjects(true);
        handleClearSelectedItemsByType("object");
      })
    );
  };

  const handleDeleteRequest = (requests) => {
    deleteRequests(requests).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success(
          `Заявк${requests?.length === 1 ? "у" : "и"} успішно видалено!`,
          {
            hideAfter: 3,
            position: "top-right",
          }
        );
        handleClearSelectedItemsByType("request");
        handleRefreshRequests(true);
      })
    );
  };

  const handleDeleteItems = () => {
    const objects = handleGetSelectedItemsByType("object");
    const requests = handleGetSelectedItemsByType("request");

    objects?.length > 0 && handleDeleteObjects(objects);
    requests?.length > 0 && handleDeleteRequest(requests);
  };

  const handleToggleObjectsFavorites = (objects) => {
    Promise.all(
      objects?.map((id) =>
        addObjectsToFavorites(id).then((resp) => {
          handleResponse(resp, () => {
            cogoToast.success("Статус успішно змінено!", {
              hideAfter: 3,
              position: "top-right",
            });
          });
        })
      )
    ).then((resp) => {
      handleClearSelectedItemsByType("object");
      handleRefreshObjects(true);
    });
  };

  const handleToggleRequestsFavorites = (requests) => {
    Promise.all(
      requests?.map((id) =>
        addRequestsToFavorites(id).then((resp) => {
          handleResponse(resp, () => {
            cogoToast.success("Статус успішно змінено!", {
              hideAfter: 3,
              position: "top-right",
            });
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
        onToggleFavorite={handleToggleItemsFavoriteStatus}
      />
      <div className="objects-content hide-scroll">
        <Actions />
        <MobileHeader />
        <SelectItems
          title="запитів"
          className="mobile-select"
          selectedCount={selectedItems?.length}
          deleteConfirmTitle="Видалити обрані заявку(ки)/ об'єкт(и)?"
          onDelete={handleDeleteItems}
          onToggleFavorite={handleToggleItemsFavoriteStatus}
        />
        <ObjectsList
          onSelect={onSelect}
          onOpenInfo={(val) => setOpenInfo(val)}
          active={selected?.id}
          onChangeObjectsCount={(val) => setObjectsCount(val)}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          isRefresh={refreshObjects}
          onRefreshed={() => handleRefreshObjects(false)}
        />
        <RequestsList
          onSelect={onSelect}
          onOpenInfo={(val) => setOpenInfo(val)}
          active={selected}
          onChangeRequestsCount={(val) => setRequestCount(val)}
          selectedItems={selectedItems}
          onSelectItem={handleSelectItem}
          isRefresh={refreshRequests}
          onRefreshed={() => handleRefreshRequests(false)}
        />
      </div>
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  border-radius: 15px;
  background: #2b2b2b;
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
