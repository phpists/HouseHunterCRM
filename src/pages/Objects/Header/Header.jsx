import styled from "styled-components";
import { Title } from "./Title";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as SettingIcon } from "../../../assets/images/setting.svg";
import { ReactComponent as PlusIcon } from "../../../assets/images/plus.svg";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { Filter } from "./Filter/Filter";
import { useState } from "react";
import { AddClient } from "../../../components/AddClient/AddClient";
import { handleResponse } from "../../../utilits";
import {
  useLazyAddToFavoritesQuery,
  useLazyDeleteObjectQuery,
} from "../../../store/objects/objects.api";
import cogoToast from "cogo-toast";
import { BackButton } from "../../Clients/Header/BackButton";

export const Header = ({
  selectedCount,
  selected,
  onFavorite,
  isFavorite,
  onIsFavotite,
  onDelete,
  filters,
  onChangeFilter,
  filtersFields,
  onApplyFilter,
  allCount,
  onSelectAll,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [addClient, setAddClient] = useState(false);
  const [addToFavorites] = useLazyAddToFavoritesQuery();
  const [deleteObject] = useLazyDeleteObjectQuery();

  const handleToggleFavorites = () => {
    Promise.all(
      selected?.map((id) =>
        addToFavorites(id).then((resp) => {
          handleResponse(resp, () => {
            cogoToast.success("Статус успішно змінено!", {
              hideAfter: 3,
              position: "top-right",
            });
          });
        })
      )
    ).then((resp) => {
      onFavorite();
    });
  };

  const handleDelete = () => {
    deleteObject(selected).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success(
          `Обєкт${selectedCount === 1 ? "" : "и"} успішно видалено!`,
          {
            hideAfter: 3,
            position: "top-right",
          }
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
          <Title selectedCount={selectedCount} title={"Обрано"} />
        </div>
        <div className="flex items-center bts">
          <IconButton
            Icon={SettingIcon}
            className="icon-btn"
            active={filterOpen}
            onClick={() => setFilterOpen(true)}
          />
          <IconButton
            Icon={PlusIcon}
            className="icon-btn"
            onClick={() => setAddClient(true)}
          />
          <IconButton
            Icon={StarIcon}
            className="icon-btn icon-btn-last"
            active={isFavorite}
            onClick={onIsFavotite}
          />
          <div className="select-wrapper flex items-center justify-end">
            <SelectItems
              title="об'єктів"
              selectedCount={selectedCount}
              onToggleFavorite={handleToggleFavorites}
              deleteConfirmTitle="Видалити об'єкт(и)?"
              onDelete={handleDelete}
              allCount={allCount}
              onSelectAll={onSelectAll}
            />
          </div>
        </div>
      </div>
      <div className="select-wrapper-mobile">
        <SelectItems
          title="об'єктів"
          selectedCount={selectedCount}
          className="mobile-select"
          onToggleFavorite={handleToggleFavorites}
          deleteConfirmTitle="Видалити об'єкт(и)?"
          onDelete={handleDelete}
          allCount={allCount}
          onSelectAll={onSelectAll}
        />
      </div>
      {filterOpen && (
        <Filter
          onClose={() => setFilterOpen(false)}
          filters={filters}
          onChangeFilter={onChangeFilter}
          filtersFields={filtersFields}
          onApplyFilter={onApplyFilter}
        />
      )}
      {addClient && <AddClient onClose={() => setAddClient(false)} />}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;
  .icon-btn {
    margin-right: 15px;
  }

  .select-wrapper {
    width: 250px;
  }

  .select-wrapper-mobile {
    display: none;
  }
  @media (max-width: 600px) {
    .select-wrapper {
      display: none;
    }
    .icon-btn-last {
      margin-right: 0px;
    }
    .select-wrapper-mobile {
      display: block;
      margin-top: 20px;
    }
    .mobile-select {
      width: 100%;
      justify-content: space-between;
    }
  }
`;
