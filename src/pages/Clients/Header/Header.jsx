import { styled } from "styled-components";
import { Title } from "./Title";
import { Buttons } from "./Buttons/Buttons";
import { Subtitle } from "./Subtitle";
import { BackButton } from "./BackButton";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { useLazyGetNewClientsCountQuery } from "../../../store/clients/clients.api";
import { useEffect } from "react";
import { useActions } from "../../../hooks/actions";
import { useAppSelect } from "../../../hooks/redux";

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
}) => {
  const [getNewClientsCount] = useLazyGetNewClientsCountQuery();
  const { saveNewClientsCount } = useActions();
  const { newClientsCount } = useAppSelect((state) => state.clients);

  useEffect(() => {
    getNewClientsCount().then((resp) => saveNewClientsCount(resp?.data?.count));
  }, []);

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
        />
      </div>
      <SelectItems
        title="клієнтів"
        className="select-wrapper-mobile"
        selectedCount={selectedCount}
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
