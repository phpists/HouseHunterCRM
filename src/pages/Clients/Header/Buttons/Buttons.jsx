import { IconButton } from "../../../../components/IconButton";
import { ReactComponent as StarIcon } from "../../../../assets/images/card-star.svg";
import { ReactComponent as PlusIcon } from "../../../../assets/images/plus.svg";
import { Search } from "./Search";
import { styled } from "styled-components";
import { SelectItems } from "../../../../components/SelectItems/SelectItems";
import { useEffect, useState } from "react";
import { AddClient } from "../../../../components/AddClient/AddClient";
import { useGetAccessQuery } from "../../../../store/auth/auth.api";
import { handleCheckAccess } from "../../../../utilits";
import { useLocation } from "react-router-dom";

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
}) => {
  const { search } = useLocation();
  const [addClient, setAddClient] = useState(false);
  const { data } = useGetAccessQuery();

  useEffect(() => {
    setAddClient(search === "?create=true");
  }, [search]);

  return (
    <StyledButtons className="flex items-center">
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
      <Search
        filter={filter}
        onChangeFilter={onChangeFilter}
        searchPhoneCode={searchPhoneCode}
        onChangeSearchCode={onChangeSearchCode}
        onApplyFilters={onApplyFilters}
        searchPhoneCodeSecond={searchPhoneCodeSecond}
        onChangeSearchCodeSecond={onChangeSearchCodeSecond}
      />
      <SelectItems
        title="клієнтів"
        className="select-wrapper-desktop"
        selectedCount={selectedCount}
        allCount={allCount}
        onSelectAll={onSelectAll}
        onToggleFavorite={onFavorite}
        onDelete={onDelete}
        deleteConfirmTitle={deleteConfirmTitle}
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
