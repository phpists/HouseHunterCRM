import styled from "styled-components";
import { Title } from "./Title";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as SettingIcon } from "../../../assets/images/search.svg";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { Filter } from "./Filter/Filter";
import { useEffect, useState } from "react";
import { BackButton } from "../../Clients/Header/BackButton";
import { NavLink } from "react-router-dom";
import { ReactComponent as SettingsIcon } from "../../../assets/images/settings.svg";
import {
  useGetStatusAccountQuery,
  useLazyDeleteAdHistoryQuery,
} from "../../../store/objects/objects.api";
import { handleResponse, showAlert } from "../../../utilits";
import {
  useLazyRemoveFlombuAdHistoryQuery,
  useLazyRemoveRealestateAdHistoryQuery,
} from "../../../store/auth/auth.api";

export const Header = ({
  selectedCount,
  selected,
  isFavorite,
  onIsFavotite,
  onDelete,
  filters,
  onChangeFilter,
  filtersFields,
  onApplyFilter,
  allCount,
  onSelectAll,
  phoneCode,
  onChangePhoneCode,
  isDeleted,
  onDeleteSuccess,
  data,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [defaultFiltersOpen, setDefalultFiltersOpen] = useState({
    company: true,
  });
  const isPrevFilter = localStorage.getItem("objectsLastFilters");
  const [deleteAdHistory] = useLazyDeleteAdHistoryQuery();
  const { data: olxAccounts } = useGetStatusAccountQuery();
  const [deleteRealestateAdHistory] = useLazyRemoveRealestateAdHistoryQuery();
  const [deleteFlombuAdHistory] = useLazyRemoveFlombuAdHistoryQuery();

  useEffect(() => {
    setDefalultFiltersOpen({
      company: !!filters?.company_object,
      street_base_object: !!filters?.street_base_object,
      mls_object: !!filters?.mls_object,
    });
  }, [filters]);

  const handleApplyFilter = (isApply) => {
    onApplyFilter(isApply);
    if (!isApply) {
      setDefalultFiltersOpen({
        company: true,
      });
    }
  };

  const handleGetOlx = () => {
    const requests = [];
    const selectedAds = data?.filter((a) =>
      selected.includes(a.id_ad_in_source)
    );

    olxAccounts?.accounts?.forEach((a) => {
      const accountId = a?.data?.id?.toString();
      const ads = selectedAds?.filter((a) => a.id_user_olx === accountId);
      if (ads?.length > 0) {
        requests.push({
          id_user_olx: accountId,
          id_obj: ads?.map((a) => a.id_ad_in_source),
        });
      }
    });

    return requests?.map((id) =>
      deleteAdHistory(id).then((resp) => {
        handleResponse(resp, () => {
          showAlert("success", "Оголошення успішно видалено!");
        });
        return resp;
      })
    );
  };

  const handleGetRealstate = () => {
    const selectedAds = data
      ?.filter((a) => selected.includes(a.id_ad_in_source))
      ?.filter((a) => a.id_realestate_account?.length > 0);

    return selectedAds?.map(({ id_obj, id_realestate_account }) =>
      deleteRealestateAdHistory({
        id_obj: id_obj,
        id_account: id_realestate_account,
      }).then((resp) => {
        handleResponse(resp, () => {
          showAlert("success", `Оголошення успішно видалено!`);
        });

        return resp;
      })
    );
  };

  const handleGetFlombu = () => {
    const selectedAds = data
      ?.filter((a) => selected.includes(a.id_ad_in_source))
      ?.filter((a) => a?.id_resource === "3")
      ?.filter((a) => a.id_obj);

    return selectedAds?.map(({ id_obj }) =>
      deleteFlombuAdHistory(id_obj).then((resp) => {
        handleResponse(resp, () => {
          showAlert("success", `Оголошення успішно видалено!`);
        });

        return resp;
      })
    );
  };

  const handleGetDeleteRequests = () => {
    const activeResource = filters?.resource;

    return activeResource === "3"
      ? handleGetFlombu()
      : activeResource === "4"
      ? handleGetRealstate()
      : handleGetOlx();
  };

  const handleDeleteHistory = () => {
    Promise.all(handleGetDeleteRequests()).then((resp) => {
      if (resp?.filter((r) => r?.data?.error !== 0)?.length === 0) {
        console.log(resp);
        onDeleteSuccess(selected);
      }
    });
  };

  return (
    <>
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
            <IconButton
              Icon={SettingIcon}
              className={`icon-btn ${isPrevFilter && "alert-btn"}`}
              active={filterOpen}
              onClick={() => setFilterOpen(true)}
            />
            <NavLink to="/ad-setting">
              <IconButton Icon={SettingsIcon} className="icon-btn" />
            </NavLink>

            <div className="select-wrapper flex items-center justify-end">
              <SelectItems
                title="об'єктів"
                selectedCount={selectedCount}
                allCount={allCount}
                deleteConfirmTitle={
                  "Оголошення видалиться з історії публікацій. Видалити оголошення?"
                }
                noFavorite
                onDeleteHistory={handleDeleteHistory}
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
            allCount={allCount}
            onSelectAll={onSelectAll}
            noFavorite
            onDeleteHistory={handleDeleteHistory}
          />
        </div>
        {filterOpen && (
          <Filter
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
          />
        )}
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
