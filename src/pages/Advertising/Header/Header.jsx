import { styled } from "styled-components";
import { Title } from "./Title";
import { Buttons } from "./Buttons/Buttons";
import { BackButton } from "./BackButton";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { useLazyDeleteCientQuery } from "../../../store/clients/clients.api";
import { useEffect, useState } from "react";
import { useActions } from "../../../hooks/actions";
import { useAppSelect } from "../../../hooks/redux";
import cogoToast from "cogo-toast";
import { handleCheckAccess, handleResponse } from "../../../utilits";
import { useNavigate } from "react-router-dom";
import { useLazyDeleteAdQuery } from "../../../store/objects/objects.api";

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
}) => {
  const [deleteAd] = useLazyDeleteAdQuery();
  const { accessData, user } = useAppSelect((state) => state.auth);
  const [confirmText, setConfimText] = useState("");

  const handleDeleteAds = () => {
    if (selected?.length > 0) {
      const selectedAds = data?.filter((a) => selected?.includes(a?.id_obj));
      Promise.all(
        selectedAds?.map(({ id_user_olx, id_obj }) =>
          deleteAd({ id_user_olx, id_obj })
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
          deleteConfirmTitle={`Видалити оголошеня?`}
        />
      </div>
      <SelectItems
        deleteConfirmTitle={`Видалити оголошеня?`}
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
