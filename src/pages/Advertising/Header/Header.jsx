import { styled } from "styled-components";
import { Title } from "./Title";
import { Buttons } from "./Buttons/Buttons";
import { BackButton } from "./BackButton";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { handleResponse } from "../../../utilits";
import { useLazyDeleteAdQuery } from "../../../store/objects/objects.api";
import { useLazyRemoveObjectRealestateQuery } from "../../../store/auth/auth.api";

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
  onChangeActionLoading,
  isDeleted,
  data,
  realstateAccountId,
}) => {
  const [deleteAd] = useLazyDeleteAdQuery();
  const [removeObjectRealstate] = useLazyRemoveObjectRealestateQuery();

  const handleDeleteAds = () => {
    if (selected?.length > 0) {
      const selectedAds = data?.filter((a) =>
        selected?.includes(a?.id_ad_in_source)
      );
      Promise.all(
        selectedAds?.map(
          ({ id_user_olx, id_ad_in_source, id_resource, id_account, id_obj }) =>
            id_resource === "4"
              ? removeObjectRealstate({
                  id_account: realstateAccountId,
                  id_obj,
                })
              : deleteAd({ id_user_olx, id_obj: id_ad_in_source })
        )
      ).then((resp) => {
        onDelete();
        resp?.forEach((res) => {
          handleResponse(res);
        });
      });
    }
  };

  return (
    <StyledHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {favoritesFilter && <BackButton onClick={onToggleFavoriteFilter} />}
          <Title title={`Обрано ${selectedCount}`} isDeleted={isDeleted} />
        </div>
        <Buttons
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
          onDelete={handleDeleteAds}
          deleteConfirmTitle={`Оголошення видалиться з історії публікацій. Видалити оголошення?`}
        />
      </div>
      <SelectItems
        deleteConfirmTitle={`Оголошення видалиться з історії публікацій. Видалити оголошення?`}
        title="оголошень"
        className="select-wrapper-mobile"
        selectedCount={selectedCount}
        allCount={allCount}
        onSelectAll={onSelectAll}
        onDelete={handleDeleteAds}
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
