import { IconButton } from "../../../../components/IconButton";
import { ReactComponent as StarIcon } from "../../../../assets/images/card-star.svg";
import { ReactComponent as PlusIcon } from "../../../../assets/images/plus.svg";
import { Search } from "./Search";
import { styled } from "styled-components";
import { SelectItems } from "../../../../components/SelectItems/SelectItems";
import { useEffect, useState } from "react";
import { AddClient } from "../../../../components/AddClient/AddClient";
import { handleCheckAccess } from "../../../../utilits";
import { useLocation } from "react-router-dom";
import { useAppSelect } from "../../../../hooks/redux";

export const Buttons = ({
  favoritesFilter,
  onToggleFavoriteFilter,
  onRefreshData,
  filter,
  onChangeFilter,
  searchPhoneCode,
  onChangeSearchCode,
  onApplyFilters,
  selectedCount,
  allCount,
  onSelectAll,
  onDelete,
  deleteConfirmTitle,
  onFavorite,
  searchPhoneCodeSecond,
  onChangeSearchCodeSecond,
  onSendClients,
  isDeleted,
  onRestore,
  onDeleteFinally,
  finalDeleteConfirmTitle,
}) => {
  const { search } = useLocation();
  const [addClient, setAddClient] = useState(false);
  const { accessData: data, user } = useAppSelect((state) => state.auth);

  useEffect(() => {
    setAddClient(search === "?create=true");
  }, [search]);

  return (
    <StyledButtons className="flex items-center">
      <Search
        filter={filter}
        onChangeFilter={onChangeFilter}
        searchPhoneCode={searchPhoneCode}
        onChangeSearchCode={onChangeSearchCode}
        onApplyFilters={onApplyFilters}
        searchPhoneCodeSecond={searchPhoneCodeSecond}
        onChangeSearchCodeSecond={onChangeSearchCodeSecond}
        favoritesFilter={favoritesFilter}
      />
      {addClient && (
        <AddClient
          onClose={() => setAddClient(false)}
          onAdded={onRefreshData}
        />
      )}
      {handleCheckAccess(data, "clients", "add") ? (
        <IconButton
          Icon={PlusIcon}
          className="icon-btn"
          onClick={() => setAddClient(true)}
        />
      ) : null}

      <IconButton
        Icon={StarIcon}
        onClick={onToggleFavoriteFilter}
        className="icon-btn"
        active={favoritesFilter}
      />
      <SelectItems
        title="клієнтів"
        className="select-wrapper-desktop"
        selectedCount={selectedCount}
        allCount={allCount}
        onSelectAll={onSelectAll}
        onToggleFavorite={isDeleted ? null : onFavorite}
        onDelete={
          isDeleted ? (user?.struct_level === 1 ? onDelete : null) : onDelete
        }
        deleteConfirmTitle={deleteConfirmTitle}
        onSend={isDeleted ? null : onSendClients}
        noFavorite={isDeleted}
        onRestore={onRestore}
        onDeleteFinally={onDeleteFinally}
        finalDeleteConfirmTitle={finalDeleteConfirmTitle}
      />
    </StyledButtons>
  );
};

const StyledButtons = styled.div`
  .icon-btn {
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
    margin-right: 15px;
    &:hover {
      border: 2px solid transparent !important;
    }
  }

  @media (max-width: 850px) {
    .select-wrapper-desktop {
      display: none;
    }
    .icon-btn--last {
      margin: 0;
    }
  }
`;
