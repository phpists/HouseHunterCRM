import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useEffect, useState } from "react";
import {
  useLazyAddClientToFavoriteQuery,
  useLazyDeleteCientQuery,
  useLazyGetClientsQuery,
  useLazyRestoreClientsQuery,
} from "../../store/clients/clients.api";
import { useActions } from "../../hooks/actions";
import { useRef } from "react";
import {
  checkIsJSON,
  handleFromInputDate,
  handleResponse,
} from "../../utilits";
import cogoToast from "cogo-toast";
import {
  useGetListAddsPublichQuery,
  useLazyDeleteAdQuery,
  useLazyGetListAddsPublichQuery,
} from "../../store/objects/objects.api";
import {
  useGetRealestateStatusQuery,
  useLazyFlombuDeleteAdHistoryQuery,
  useLazyFlombuDeleteAdQuery,
  useLazyRemoveObjectRealestateQuery,
} from "../../store/auth/auth.api";

const Advertising = () => {
  const [getListAdds, { data }] = useLazyGetListAddsPublichQuery();
  const [favoritesFilter, setFavoritesFilter] = useState(false);
  const [selected, setSelected] = useState([]);
  const { saveClientsCount } = useActions();
  const [clients, setClients] = useState([]);
  const [getClients] = useLazyGetClientsQuery();
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const [isAllPages, setIsAllPages] = useState(false);
  const prevClientsFilters = localStorage.getItem("advertisingFilters");
  const [filter, setFilter] = useState(
    !!prevClientsFilters && !!JSON.parse(prevClientsFilters)
      ? JSON.parse(prevClientsFilters)
      : {
          search_key: undefined,
          search_phone: undefined,
        }
  );
  const [searchPhoneCode, setSearchPhoneCode] = useState("1");
  const [searchPhoneCodeSecond, setSearchPhoneCodeSecond] = useState("1");
  const isFilters = useRef(
    !!prevClientsFilters && !!JSON.parse(prevClientsFilters)
  );
  const [allCount, setAllCount] = useState(0);
  const [deleteAd] = useLazyDeleteAdQuery();
  const [loading, setLoading] = useState(false);
  const dataRef = useRef([]);
  const allCountRef = useRef(0);
  const [addClientToFavorite] = useLazyAddClientToFavoriteQuery();
  const [sendClients, setSendClients] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const isFirstRender = useRef(true);
  const isFirstRequest = useRef(true);
  const [isDeleted, setIsDeleted] = useState(filter?.filters?.show_deleted);
  const [removeObjectREalstate] = useLazyRemoveObjectRealestateQuery();
  const { data: realestateStatus } = useGetRealestateStatusQuery();
  const [deleteFlombuAd] = useLazyFlombuDeleteAdQuery();
  const [deleteFlombuAdHistory] = useLazyFlombuDeleteAdHistoryQuery();

  const handleChangeFilter = (field, value) =>
    setFilter({ ...filter, [field]: value });

  const handleFormatFilterDate = (d, isFrom) => {
    const date = new Date(handleFromInputDate(d));

    date.setHours(isFrom ? 0 : 23);
    date.setMinutes(isFrom ? 0 : 59);
    date.setSeconds(isFrom ? 0 : 59);

    return date?.getTime() / 1000;
  };

  const handleGetAdds = () => {
    getListAdds(filter?.filters?.resource ?? "1");
  };
  const handleSelectClient = (id) => {
    const isExist = selected.find((w) => w === id);
    setSelected(
      !!isExist ? selected.filter((w) => w !== id) : [...selected, id]
    );
  };

  useEffect(() => {
    // handleGetClients();
    data && handleGetAdds();
    // eslint-disable-next-line
  }, []);

  const handleScroll = () => {
    if (
      listRef.current.offsetHeight + listRef.current.scrollTop <=
        listRef.current.scrollHeight - 200 ||
      isLoading.current
    ) {
      return;
    }
    currentPage.current += 1;
    // handleGetClients();
  };

  const handleApplyFilters = (isApply) => {
    isFilters.current = isApply;
    isApply &&
      localStorage.setItem("advertisingFilters", JSON.stringify(filter));
    if (!isApply) {
      currentPage.current = 0;
      setIsAllPages(false);
      setFilter({ search_key: "", search_phone: "" });
      localStorage.removeItem("advertisingFilters");
    } else {
      handleGetAdds();
    }
    // handleGetClients(true, isApply);
    setIsDeleted(isApply ? filter?.filters?.show_deleted : false);
  };

  const handleSelectAll = (isReset, count) => {
    const ids = data?.data?.map((c) => c.id_obj);
    setSelected(isReset ? [] : ids);
  };

  const handleDeleteSuccess = () => {
    cogoToast.success("Оголошення успішно видалено", {
      hideAfter: 3,
      position: "top-right",
    });
    handleGetAdds();
  };

  const handleDeleteAd = ({
    id_user_olx,
    id_ad_in_source,
    id_account,
    id_obj,
    realstate,
    flombu,
    history,
  }) => {
    if (realstate) {
      removeObjectREalstate({
        id_account: realestateStatus?.data?.[0]?.id_account,
        id_obj,
      }).then((resp) => {
        handleResponse(resp, handleDeleteSuccess);
      });
    } else if (flombu) {
      if (history) {
        deleteFlombuAdHistory(id_obj).then((resp) => {
          handleResponse(resp, handleDeleteSuccess);
        });
      } else {
        deleteFlombuAd(id_obj).then((resp) => {
          handleResponse(resp, handleDeleteSuccess);
        });
      }
    } else {
      deleteAd({ id_user_olx, id_obj: id_ad_in_source }).then((resp) => {
        handleResponse(resp, handleDeleteSuccess);
      });
    }
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      currentPage.current = 0;
      setIsAllPages(false);
      handleApplyFilters(false);
      isFilters.current = false;
      //   handleGetClients(true);
    } else {
      isFirstRender.current = false;
    }
    // eslint-disable-next-line
  }, [favoritesFilter]);

  const handleAddClientToFavorite = (id) => {
    addClientToFavorite(id).then((resp) => {
      handleResponse(resp, () => {
        const updatedClients = dataRef.current
          ?.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c))
          ?.filter((c) => (favoritesFilter ? c.id !== id : true));

        dataRef.current = updatedClients;
        setClients(updatedClients);
        setAllCount(favoritesFilter ? allCount - 1 : allCount);
        cogoToast.success("Статус успішно обновлено", {
          hideAfter: 3,
          position: "top-right",
        });
      });
    });
  };

  const handleAddClientsToFavorite = () => {
    setActionLoading(true);
    Promise.all(
      selected?.map((id) =>
        addClientToFavorite(id).then((resp) => {
          handleResponse(resp, () => {
            cogoToast.success("Статус успішно обновлено", {
              hideAfter: 3,
              position: "top-right",
            });
          });
        })
      )
    ).then((resp) => {
      setActionLoading(false);
      const updatedClients = dataRef.current
        ?.map((c) =>
          selected.find((s) => s === c?.id)
            ? { ...c, favorite: !c.favorite }
            : c
        )
        ?.filter((c) =>
          favoritesFilter ? !selected.find((s) => s === c?.id) : true
        );

      dataRef.current = updatedClients;
      setAllCount(favoritesFilter ? allCount - selected?.length : allCount);
      setClients(updatedClients);
      setSelected([]);
    });
  };

  const handleSendClient = (id) => {
    setSendClients([id]);
  };

  const handleChangeComment = (comment, id) => {
    const updatedClients = dataRef.current?.map((c) =>
      c?.id === id ? { ...c, comment } : c
    );
    dataRef.current = updatedClients;
    setClients(updatedClients);
  };

  const handleDeleteAds = (ids, isSelected) => {
    handleGetAdds();
    isSelected && setSelected([]);
  };

  return (
    <StyledAdvertising>
      <Header
        favoritesFilter={favoritesFilter}
        onToggleFavoriteFilter={() => setFavoritesFilter(!favoritesFilter)}
        // onRefreshData={() => handleGetClients(true)}
        onRefreshData={() => null}
        selectedCount={selected.length}
        filter={filter}
        onChangeFilter={handleChangeFilter}
        searchPhoneCode={searchPhoneCode}
        onChangeSearchCode={(val) => setSearchPhoneCode(val)}
        searchPhoneCodeSecond={searchPhoneCodeSecond}
        onChangeSearchCodeSecond={(val) => setSearchPhoneCodeSecond(val)}
        onApplyFilters={handleApplyFilters}
        allCount={data?.data?.length}
        onSelectAll={handleSelectAll}
        selected={selected}
        onDelete={() => handleDeleteAds(selected, true)}
        onFavorite={handleAddClientsToFavorite}
        onChangeActionLoading={(val) => setActionLoading(val)}
        isDeleted={isDeleted}
        data={data?.data ?? []}
        realstateAccountId={realestateStatus?.data?.[0]?.id_account}
      />
      <List
        data={data?.data ?? []}
        selected={selected}
        onSelect={handleSelectClient}
        clients={clients}
        innerRef={listRef}
        onDelete={handleDeleteAd}
        loading={loading}
        onAddToFavorite={handleAddClientToFavorite}
        onSend={handleSendClient}
        actionLoading={actionLoading}
        onChangeComment={handleChangeComment}
        isDeleted={filter?.filters?.show_deleted}
      />
    </StyledAdvertising>
  );
};

const StyledAdvertising = styled.div`
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  width: 100%;
  padding: 15px 20px;
  @media (max-width: 850px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
  }
  @media (max-width: 500px) {
    width: 100svw;
    margin-left: -10px;
    padding: 10px 10px;
  }
`;

export default Advertising;
