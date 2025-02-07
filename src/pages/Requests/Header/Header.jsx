import styled from "styled-components";
import { Title } from "./Title";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as SettingIcon } from "../../../assets/images/search.svg";
import { ReactComponent as PlusIcon } from "../../../assets/images/plus.svg";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { Filter } from "./Filter/Filter";
import { useState } from "react";
import { AddClient } from "../../../components/AddClient/AddClient";
import {
  useLazyAddToFavoriteQuery,
  useLazyDeleteRequestQuery,
  useLazyRestoreRequestsQuery,
} from "../../../store/requests/requests.api";
import { handleCheckAccess, handleResponse, showAlert } from "../../../utilits";
import { BackButton } from "../../Clients/Header/BackButton";
import { useAppSelect } from "../../../hooks/redux";

export const Header = ({
  selectedCount,
  onDelete,
  selected,
  onFavorite,
  isFavorite,
  onIsFavotite,
  filters,
  onChangeFilter,
  filtersFields,
  onApplyFilter,
  allCount,
  onSelectAll,
  onChangeActionLoading,
  isDeleted,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const [deleteRequest] = useLazyDeleteRequestQuery();
  const [filterOpen, setFilterOpen] = useState(false);
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [addToFavorites] = useLazyAddToFavoriteQuery();
  const { accessData: data } = useAppSelect((state) => state.auth);
  const isPrevFilter = localStorage.getItem("requestFilter");
  const [restoreRequests] = useLazyRestoreRequestsQuery();
  const isAllActions =
    filters?.only_company_obj !== "1" || user?.struct_level === 1;
  const [confirmText, setConfimText] = useState("");

  const handleToggleFavorites = () => {
    onChangeActionLoading(true);
    Promise.all(
      selected?.map((id) =>
        addToFavorites(id).then((resp) => {
          handleResponse(resp, () => {
            showAlert("success", "Статус успішно змінено!");
          });
        })
      )
    )
      .then((resp) => {
        onFavorite();
        onChangeActionLoading(false);
      })
      .catch(() => onChangeActionLoading(false));
  };

  const handleDelete = (isFinally) => {
    if (selected?.length > 0) {
      onChangeActionLoading(true);
      deleteRequest({
        id_groups: selected,
        final_remove: isFinally ? "1" : undefined,
        reasone_remove: confirmText,
      }).then((resp) => {
        handleResponse(resp, () => {
          showAlert(
            "success",
            `Запит${selectedCount === 1 ? "" : "и"} успішно видалено!`
          );
          //   !filters?.show_deleted && onDelete();
          onDelete();
        });
        onChangeActionLoading(false);
      });
    }
  };

  const handleRestore = () => {
    restoreRequests(selected).then((resp) =>
      handleResponse(resp, () => {
        showAlert(
          "success",
          `Запит${selected?.length > 1 ? "и" : ""} успішно відновлено`
        );
        onDelete();
      })
    );
  };


  return (
    <StyledHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {isFavorite && <BackButton onClick={onIsFavotite} />}
          <Title
            selectedCount={selectedCount}
            title={isFavorite ? "Обрано:" : "Обрано запитів "}
            isDeleted={isDeleted}
          />
        </div>
        <div className="flex items-center bts">
          <IconButton
            Icon={SettingIcon}
            className={`icon-btn ${isPrevFilter && "alert-btn"}`}
            active={filterOpen}
            onClick={() => setFilterOpen(true)}
          />
          {handleCheckAccess(data, "clients", "add") ? (
            <IconButton
              Icon={PlusIcon}
              className="icon-btn"
              onClick={() => setAddClientOpen(true)}
            />
          ) : null}
          <IconButton
            Icon={StarIcon}
            className="icon-btn icon-btn-last"
            active={isFavorite}
            onClick={onIsFavotite}
          />
          <div className="select-wrapper select-wrapper-desktop flex items-center justify-end">
            <SelectItems
              title="запитів"
              selectedCount={selectedCount}
              deleteConfirmTitle={"Видалити запит(и)?"}
              finalDeleteConfirmTitle="Видалити запит(и) остаточно?"
              onDelete={
                !isAllActions
                  ? null
                  : !filters?.show_deleted &&
                    handleCheckAccess(data, "requests", "delete")
                  ? handleDelete
                  : user?.struct_level === 1 && filters?.show_deleted
                  ? handleDelete
                  : null
              }
              onToggleFavorite={
                filters?.show_deleted ? null : handleToggleFavorites
              }
              noFavorite={filters?.show_deleted}
              allCount={allCount}
              onSelectAll={onSelectAll}
              onRestore={!isAllActions ? null : handleRestore}
              onDeleteFinally={
                !isAllActions
                  ? null
                  : user?.struct_level === 1
                  ? () => handleDelete(true)
                  : null
              }
              confirmText={filters?.show_deleted ? null : confirmText}
              onChangeConfirmText={(val) => setConfimText(val)}
            />
          </div>
        </div>
      </div>
      <SelectItems
        title="об'єктів"
        selectedCount={selectedCount}
        className="select-wrapper-mobile"
        deleteConfirmTitle={"Видалити запит(и)?"}
        onDelete={
          !isAllActions
            ? null
            : !filters?.show_deleted &&
              handleCheckAccess(data, "requests", "delete")
            ? handleDelete
            : user?.struct_level === 1
            ? handleDelete
            : null
        }
        allCount={allCount}
        onSelectAll={onSelectAll}
        onToggleFavorite={handleToggleFavorites}
        noFavorite={filters?.show_deleted}
        onRestore={!isAllActions ? null : handleRestore}
        onDeleteFinally={
          !isAllActions
            ? null
            : user?.struct_level === 1
            ? () => handleDelete(true)
            : null
        }
        finalDeleteConfirmTitle="Видалити запит(и) остаточно?"
        confirmText={filters?.show_deleted ? null : confirmText}
        onChangeConfirmText={(val) => setConfimText(val)}
      />
      <Filter
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onChangeFilter={onChangeFilter}
        filtersFields={filtersFields}
        onApplyFilter={onApplyFilter}
        isFavorite={isFavorite}
      />
      {addClientOpen && <AddClient onClose={() => setAddClientOpen(false)} />}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;
  .icon-btn {
    margin-right: 15px;
  }
  .icon-btn-last {
    margin-right: 15px;
  }
  .select-wrapper {
  }
  .select-wrapper-mobile {
    display: none;
  }
  @media (max-width: 700px) {
    .select-wrapper-desktop {
      display: none;
    }
    .icon-btn-last {
      margin-right: 0;
    }
    .select-wrapper-mobile {
      display: flex;
      width: 100% !important;
      margin-top: 20px;
      justify-content: space-between;
    }
  }
`;
