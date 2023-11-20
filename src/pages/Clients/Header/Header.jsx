import { styled } from "styled-components";
import { Title } from "./Title";
import { Buttons } from "./Buttons/Buttons";
import { Subtitle } from "./Subtitle";
import { BackButton } from "./BackButton";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import {
  useLazyDeleteCientQuery,
  useLazyGetNewClientsCountQuery,
} from "../../../store/clients/clients.api";
import { useEffect } from "react";
import { useActions } from "../../../hooks/actions";
import { useAppSelect } from "../../../hooks/redux";
import cogoToast from "cogo-toast";
import { handleResponse } from "../../../utilits";

export const Header = ({
  favoritesFilter,
  onToggleFavoriteFilter,
  onRefreshData,
  selectedCount,
  filter,
  onChangeFilter,
  searchPhoneCode,
  onChangeSearchCode,
  onApplyFilters,
  allCount,
  onSelectAll,
  selected,
  onDelete,
}) => {
  const [getNewClientsCount] = useLazyGetNewClientsCountQuery();
  const { saveNewClientsCount } = useActions();
  const { newClientsCount } = useAppSelect((state) => state.clients);
  const [deleteClient] = useLazyDeleteCientQuery();

  useEffect(() => {
    getNewClientsCount().then((resp) => saveNewClientsCount(resp?.data?.count));
  }, []);

  const handleDeleteClients = () => {
    deleteClient({ id_client: selected }).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success("Клієнтів успішно видалено", {
          hideAfter: 3,
          position: "top-right",
        });
        onDelete();
      });
    });
  };

  return (
    <StyledHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {favoritesFilter && <BackButton onClick={onToggleFavoriteFilter} />}
          <Title
            title={
              favoritesFilter
                ? "Улюблене"
                : `${newClientsCount ?? 0} нових клієнтів за сьогодні`
            }
          />
          {favoritesFilter && <Subtitle subtitle="54 обрано" />}
        </div>
        <Buttons
          favoritesFilter={favoritesFilter}
          onToggleFavoriteFilter={onToggleFavoriteFilter}
          onRefreshData={onRefreshData}
          filter={filter}
          onChangeFilter={onChangeFilter}
          searchPhoneCode={searchPhoneCode}
          onChangeSearchCode={onChangeSearchCode}
          onApplyFilters={onApplyFilters}
          selectedCount={selectedCount}
          allCount={allCount}
          onSelectAll={onSelectAll}
          onDelete={handleDeleteClients}
          deleteConfirmTitle={`Видалити клієнт${
            selected?.length > 1 ? "ів" : "а"
          }`}
        />
      </div>
      <SelectItems
        deleteConfirmTitle={`Видалити клієнт${
          selected?.length > 1 ? "ів" : "а"
        }`}
        title="клієнтів"
        className="select-wrapper-mobile"
        selectedCount={selectedCount}
        allCount={allCount}
        onSelectAll={onSelectAll}
        noFavorite
        onDelete={handleDeleteClients}
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
