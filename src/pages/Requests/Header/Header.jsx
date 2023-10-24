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
import {
  useLazyAddToFavoriteQuery,
  useLazyDeleteRequestQuery,
} from "../../../store/requests/requests.api";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { BackButton } from "../../Clients/Header/BackButton";

export const Header = ({
  selectedCount,
  onDelete,
  selected,
  onFavorite,
  isFavorite,
  onIsFavotite,
}) => {
  const [deleteRequest] = useLazyDeleteRequestQuery();
  const [filterOpen, setFilterOpen] = useState(false);
  const [addClientOpen, setAddClientOpen] = useState(false);
  const [addToFavorites] = useLazyAddToFavoriteQuery();

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
      handleResponse(resp, onFavorite);
    });
  };

  const handleDelete = () => {
    deleteRequest(selected).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success(
          `Заявк${selectedCount === 1 ? "у" : "и"} успішно видалено!`,
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
          <Title
            selectedCount={selectedCount}
            title={isFavorite ? "Обрано:" : "Обрано запитів "}
          />
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
            onClick={() => setAddClientOpen(true)}
          />
          <IconButton
            Icon={StarIcon}
            className="icon-btn icon-btn-last"
            active={isFavorite}
            onClick={onIsFavotite}
          />
          <div className="select-wrapper select-wrapper-desktop flex items-center justify-end">
            <SelectItems
              title="об'єктів"
              selectedCount={selectedCount}
              deleteConfirmTitle="Видалити запит(и)?"
              onDelete={handleDelete}
              onToggleFavorite={handleToggleFavorites}
            />
          </div>
        </div>
      </div>
      <SelectItems
        title="об'єктів"
        selectedCount={selectedCount}
        className="select-wrapper-mobile"
        deleteConfirmTitle="Видалити запит(и)?"
        onDelete={handleDelete}
      />
      {filterOpen && <Filter onClose={() => setFilterOpen(false)} />}
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
    width: 250px;
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
