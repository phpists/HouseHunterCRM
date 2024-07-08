import { styled } from "styled-components";
import { Title } from "./Title";
import { Buttons } from "./Buttons/Buttons";
import { BackButton } from "./BackButton";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import {
  useLazyDeleteCientQuery,
  useLazyGetNewClientsCountQuery,
} from "../../../store/clients/clients.api";
import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/actions";
import { useAppSelect } from "../../../hooks/redux";
import cogoToast from "cogo-toast";
import { handleCheckAccess, handleResponse } from "../../../utilits";
import { useNavigate } from "react-router-dom";

export const Header = ({
  favoritesFilter,
  onToggleFavoriteFilter,
  onRefreshData,
  selectedCount,
  filter,
  onChangeFilter,
  searchPhoneCode,
  onChangeSearchCode,
  searchPhoneCodeSecond,
  onChangeSearchCodeSecond,
  onApplyFilters,
  allCount,
  onSelectAll,
  selected,
  onDelete,
  onFavorite,
  onSendClients,
  onChangeActionLoading,
  onRestore,
  isDeleted,
}) => {
  const navigate = useNavigate();
  const [getNewClientsCount] = useLazyGetNewClientsCountQuery();
  const { saveNewClientsCount } = useActions();
  const { newClientsCount } = useAppSelect((state) => state.clients);
  const [deleteClient] = useLazyDeleteCientQuery();
  const { accessData, user } = useAppSelect((state) => state.auth);
  const [confirmText, setConfimText] = useState("");

  useEffect(() => {
    getNewClientsCount().then((resp) => saveNewClientsCount(resp?.data?.count));
  }, [isDeleted]);

  const handleDeleteClients = (isFinal) => {
    if (selected?.length > 0) {
      onChangeActionLoading(true);
      deleteClient({
        id_client: selected,
        final_remove: isFinal ? "1" : undefined,
        reasone_remove: confirmText,
      }).then((resp) => {
        handleResponse(
          resp,
          () => {
            cogoToast.success(
              `Клієнт${selected?.length === 1 ? "a" : "ів"} успішно видалено`,
              {
                hideAfter: 3,
                position: "top-right",
              }
            );

            if (isFinal || !filter?.filters?.show_deleted) {
              onDelete();
            }
            onChangeActionLoading(false);
          },
          () => onChangeActionLoading(false)
        );
      });
    }
  };

  return (
    <StyledHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {favoritesFilter && <BackButton onClick={onToggleFavoriteFilter} />}
          <Title title={`Обрано ${selectedCount}`} isDeleted={isDeleted} />
          {/* {favoritesFilter && <Subtitle subtitle="54 обрано" />} */}
        </div>
        <Buttons
          favoritesFilter={favoritesFilter}
          onToggleFavoriteFilter={onToggleFavoriteFilter}
          onRefreshData={onRefreshData}
          filter={filter}
          onChangeFilter={onChangeFilter}
          searchPhoneCode={searchPhoneCode}
          onChangeSearchCode={onChangeSearchCode}
          searchPhoneCodeSecond={searchPhoneCodeSecond}
          onChangeSearchCodeSecond={onChangeSearchCodeSecond}
          onApplyFilters={onApplyFilters}
          selectedCount={selectedCount}
          allCount={allCount}
          onSelectAll={onSelectAll}
          onDelete={
            handleCheckAccess(accessData, "clients", "delete")
              ? handleDeleteClients
              : null
          }
          deleteConfirmTitle={`Видалити клієнт${
            selected?.length > 1 ? "ів" : "а"
          }?`}
          finalDeleteConfirmTitle={`Видалити клієнт${
            selected?.length > 1 ? "ів" : "а"
          } остаточно?`}
          onFavorite={onFavorite}
          onSendClients={onSendClients}
          isDeleted={filter?.filters?.show_deleted === "1"}
          onRestore={filter?.filters?.show_deleted === "1" ? onRestore : null}
          onDeleteFinally={
            user?.struct_level === 1 ? () => handleDeleteClients(true) : null
          }
          confirmText={confirmText}
          onChangeConfirmText={(val) => setConfimText(val)}
        />
      </div>
      <SelectItems
        deleteConfirmTitle={`Видалити клієнт${
          selected?.length > 1 ? "ів" : "а"
        }?`}
        title="клієнтів"
        className="select-wrapper-mobile"
        selectedCount={selectedCount}
        allCount={allCount}
        onSelectAll={onSelectAll}
        onToggleFavorite={
          filter?.filters?.show_deleted === "1" ? null : onFavorite
        }
        noFavorite={filter?.filters?.show_deleted === "1"}
        onDelete={
          filter?.filters?.show_deleted === "1"
            ? user?.struct_level === 1
              ? handleDeleteClients
              : null
            : handleCheckAccess(accessData, "clients", "delete")
            ? handleDeleteClients
            : null
        }
        onSend={filter?.filters?.show_deleted === "1" ? null : onSendClients}
        onRestore={filter?.filters?.show_deleted === "1" ? onRestore : null}
        onDeleteFinally={
          user?.struct_level === 1 ? () => handleDeleteClients(true) : null
        }
        finalDeleteConfirmTitle={`Видалити клієнт${
          selected?.length > 1 ? "ів" : "а"
        } остаточно?`}
        confirmText={confirmText}
        onChangeConfirmText={(val) => setConfimText(val)}
      />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 18px;
  position: relative;
  .select-wrapper-mobile {
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
  }
  @media (min-width: 850px) {
    .select-wrapper-mobile {
      display: none;
    }
  }
`;
