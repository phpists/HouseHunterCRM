import styled from "styled-components";
import { Title } from "./Title";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as SettingIcon } from "../../../assets/images/search.svg";
import { ReactComponent as PlusIcon } from "../../../assets/images/plus.svg";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { Filter } from "./Filter/Filter";
import { useEffect, useState } from "react";
import { AddClient } from "../../../components/AddClient/AddClient";
import { handleCheckAccess, handleResponse, showAlert } from "../../../utilits";
import {
  useLazyAddToFavoritesQuery,
  useLazyDeleteObjectQuery,
} from "../../../store/objects/objects.api";
import { BackButton } from "../../Clients/Header/BackButton";
import { useAppSelect } from "../../../hooks/redux";
import { AddToSelections } from "../AddToSelections";
import { SendModal } from "../../Clients/SendModal";
import { SortButton } from "./SortButton/SortButton";
import { MapModal } from "./MapModal/MapModal";

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
  onChangeActionLoading,
  phoneCode,
  onChangePhoneCode,
  onRestore,
  selectedClients,
  isDeleted,
  onRefetch,
  onFastCopy,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const [filterOpen, setFilterOpen] = useState(false);
  const [addClient, setAddClient] = useState(false);
  const [addToFavorites] = useLazyAddToFavoritesQuery();
  const [deleteObject] = useLazyDeleteObjectQuery();
  const { accessData: data } = useAppSelect((state) => state.auth);
  const [defaultFiltersOpen, setDefalultFiltersOpen] = useState({
    company: true,
  });
  const [openAddToSelection, setOpenAddToSelection] = useState(false);
  const [openSendClient, setOpenSendClient] = useState(false);
  const isPrevFilter = localStorage.getItem("objectsLastFilters");
  const isAllActions =
    !filters?.street_base_object &&
    !filters?.mls_object &&
    ["my_structure", "only_my"]?.includes(filters?.company_object?.show_only);
  const [openMap, setOpenMap] = useState(false);
  const [confirmText, setConfimText] = useState("");

  useEffect(() => {
    setDefalultFiltersOpen({
      company: !!filters?.company_object,
      street_base_object: !!filters?.street_base_object,
      mls_object: !!filters?.mls_object,
    });
  }, [filters]);

  const handleToggleFavorites = () => {
    onChangeActionLoading(true);
    addToFavorites(selected).then((resp) => {
      handleResponse(resp, () => {
        showAlert("success", "Статус успішно змінено!");
        onFavorite();
      });
      onChangeActionLoading(false);
    });
  };

  const handleDelete = (isFinally) => {
    if (selected?.length > 0) {
      onChangeActionLoading(true);
      deleteObject({
        id_objects: selected,
        final_remove: isFinally ? "1" : undefined,
        reasone_remove: confirmText,
      }).then((resp) => {
        handleResponse(resp, () => {
          showAlert(
            "success",
            `Обєкт${selectedCount === 1 ? "" : "и"} успішно видалено!`
          );
          filters?.company_object?.show_deleted !== "1" && onDelete();
        });
        onChangeActionLoading(false);
      });
    }
  };

  const handleApplyFilter = (isApply) => {
    onApplyFilter(isApply);
    if (!isApply) {
      setDefalultFiltersOpen({
        company: true,
      });
    }
  };

  const handleAddToSelection = () => setOpenAddToSelection(true);
  const handleAddToSelectionSuccess = () => onSelectAll(true);

  const handleSendClients = () => {
    setOpenSendClient(true);
  };

  const handleSendClientsSuccess = () => {
    onSelectAll(true);
    setOpenSendClient(false);
    onRefetch();
  };

  const removeExtraSpacesAndWords = (text) => {
    if (!text) {
      return text;
    }
    const wordsToRemove = ["вулиця", "проспект", "вул."];
    const regex = new RegExp(wordsToRemove.join("|") + "| +", "gi");
    return text
      .replace(regex, function (match) {
        return wordsToRemove.includes(match) ? "" : " ";
      })
      .trim();
  };

  const handleSearchStreets = (streets) => {
    const tags = Array.isArray(filters?.list_street)
      ? filters?.list_street
      : [];
    const uniqTags = [
      ...new Set(
        streets
          .slice(0, 40 - tags?.length)
          ?.map((s) => removeExtraSpacesAndWords(s))
      ),
    ];

    const updatedTags = [...tags, ...uniqTags];
    onChangeFilter("list_street", updatedTags);
  };

  return (
    <>
      {openSendClient > 0 ? (
        <SendModal
          onSendSuccess={handleSendClientsSuccess}
          onClose={() => setOpenSendClient(false)}
          clients={selectedClients}
          onChangeLoading={(val) => null}
        />
      ) : null}
      {openAddToSelection && (
        <AddToSelections
          onClose={() => setOpenAddToSelection(false)}
          idObject={selected}
          onSuccess={handleAddToSelectionSuccess}
        />
      )}
      <StyledHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {isFavorite && <BackButton onClick={onIsFavotite} />}
            <Title
              selectedCount={selectedCount}
              title={"Обрано"}
              isdDeleted={isDeleted}
            />
          </div>
          <div className="flex items-center bts">
            {/* <Statistic filters={filters} allCount={allCount} /> */}
            <SortButton
              value={filters?.sorting}
              onChange={(val) => onChangeFilter("sorting", val)}
            />
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
                onClick={() => setAddClient(true)}
              />
            ) : null}
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
                onToggleFavorite={
                  filters?.company_object?.show_deleted === "1"
                    ? null
                    : handleToggleFavorites
                }
                noFavorite={filters?.company_object?.show_deleted === "1"}
                deleteConfirmTitle={"Видалити об'єкт(и)?"}
                finalDeleteConfirmTitle="Видалити об'єкт(и) остаточно?"
                onDeleteFinally={
                  !isAllActions
                    ? null
                    : user?.struct_level === 1
                    ? () => handleDelete(true)
                    : null
                }
                onDelete={
                  !isAllActions
                    ? null
                    : handleCheckAccess(data, "objects", "delete")
                    ? handleDelete
                    : null
                }
                allCount={allCount}
                onSelectAll={onSelectAll}
                onAddToSelection={
                  filters?.company_object?.show_deleted === "1"
                    ? null
                    : handleAddToSelection
                }
                passwordCheck
                onRestore={!isAllActions ? null : onRestore}
                onSendClients={
                  selectedClients?.length > 0 ? handleSendClients : null
                }
                confirmText={confirmText}
                onChangeConfirmText={(val) => setConfimText(val)}
                onFastCopy={onFastCopy}
              />
            </div>
          </div>
        </div>
        <div className="select-wrapper-mobile">
          <SelectItems
            title="об'єктів"
            selectedCount={selectedCount}
            className="mobile-select"
            onToggleFavorite={
              filters?.company_object?.show_deleted === "1"
                ? null
                : handleToggleFavorites
            }
            noFavorite={filters?.company_object?.show_deleted === "1"}
            deleteConfirmTitle={
              filters?.company_object?.show_deleted === "1"
                ? "Видалити об'єкт(и) остаточно?"
                : "Видалити об'єкт(и)?"
            }
            onDelete={
              !isAllActions
                ? null
                : filters?.company_object?.show_deleted === "1"
                ? user?.struct_level === 1
                  ? handleDelete
                  : null
                : handleCheckAccess(data, "objects", "delete")
                ? handleDelete
                : null
            }
            onDeleteFinally={
              !isAllActions
                ? null
                : user?.struct_level === 1
                ? () => handleDelete(true)
                : null
            }
            allCount={allCount}
            onSelectAll={onSelectAll}
            onAddToSelection={
              filters?.company_object?.show_deleted === "1"
                ? null
                : handleAddToSelection
            }
            passwordCheck
            onRestore={!isAllActions ? null : onRestore}
            onSendClients={
              selectedClients?.length > 0 ? handleSendClients : null
            }
            confirmText={confirmText}
            onChangeConfirmText={(val) => setConfimText(val)}
            onFastCopy={onFastCopy}
          />
        </div>
        <Filter
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          filters={filters}
          onChangeFilter={onChangeFilter}
          filtersFields={filtersFields}
          onApplyFilter={handleApplyFilter}
          filtersOpened={defaultFiltersOpen}
          onChangeDefaultFiltersOpened={(val) => setDefalultFiltersOpen(val)}
          isFavorite={isFavorite}
          allCount={allCount}
          phoneCode={phoneCode}
          onChangePhoneCode={onChangePhoneCode}
          onOpenMap={() => setOpenMap(true)}
        />
        {openMap && (
          <MapModal
            onClose={() => setOpenMap(false)}
            onSuccess={handleSearchStreets}
          />
        )}
        {addClient && <AddClient onClose={() => setAddClient(false)} />}
      </StyledHeader>
    </>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;
  .icon-btn {
    margin-right: 15px;
  }

  .select-wrapper {
  }

  .select-wrapper-mobile {
    display: none;
  }
  .sort-select {
    height: 40px;
    padding-left: 10px;
    margin-right: 10px;
    width: 150px;
    .arrow {
      height: 25px;
    }
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
