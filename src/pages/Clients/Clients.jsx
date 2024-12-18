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
import { handleFromInputDate, handleResponse, showAlert } from "../../utilits";
import { SendModal } from "./SendModal";
import { useLocation } from "react-router-dom";

const Clients = () => {
  const location = useLocation();
  const [favoritesFilter, setFavoritesFilter] = useState(false);
  const [selected, setSelected] = useState([]);
  const { saveClientsCount } = useActions();
  const [clients, setClients] = useState([]);
  const [getClients] = useLazyGetClientsQuery();
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const [isAllPages, setIsAllPages] = useState(false);
  const prevClientsFilters = localStorage.getItem("clientsFilters");
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
  const [deleteClient] = useLazyDeleteCientQuery();
  const [loading, setLoading] = useState(false);
  const dataRef = useRef([]);
  const allCountRef = useRef(0);
  const [addClientToFavorite] = useLazyAddClientToFavoriteQuery();
  const [sendClients, setSendClients] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const isFirstRender = useRef(true);
  const isFirstRequest = useRef(true);
  const [restoreClients] = useLazyRestoreClientsQuery();
  const [isDeleted, setIsDeleted] = useState(filter?.filters?.show_deleted);
  const [defaultFilter, setDefaultFilter] = useState(false);
  const defaultFilterLoaded = useRef(false);

  const handleChangeFilter = (field, value) =>
    setFilter({ ...filter, [field]: value });

  const handleFormatFilterDate = (d, isFrom) => {
    const date = new Date(handleFromInputDate(d));

    date.setHours(isFrom ? 0 : 23);
    date.setMinutes(isFrom ? 0 : 59);
    date.setSeconds(isFrom ? 0 : 59);

    return date?.getTime() / 1000;
  };

  const handleGetClients = (isReset, isFilter) => {
    if ((!isLoading.current && !isAllPages) || isReset) {
      isLoading.current = true;

      if (isReset) {
        setIsAllPages(false);
        listRef.current.scroll({ top: 0 });
        setClients([]);
        setSelected([]);
        currentPage.current = 0;
        dataRef.current = [];
        allCountRef.current = 0;
      }

      setLoading(true);
      const sendData = {
        current_page: currentPage.current,
        item_on_page: 50,
        show_favorite: favoritesFilter ? "1" : undefined,
        search_phone_code: isFilters.current ? searchPhoneCode : undefined,
        search_phone: isFilters.current
          ? filter.search_phone
              ?.replaceAll("-", "")
              ?.replace("(", "")
              ?.replace(")", "")
              ?.replaceAll("_", "")
          : undefined,
        search_key: isFilters.current ? filter.search_key : undefined,
        my_struct: isFilters.current ? filter.my_struct : undefined,
        ...(isFilters.current
          ? {
              filters: {
                ...filter.filters,
                dt_reg_from: filter?.filters?.dt_reg_from
                  ? handleFormatFilterDate(filter?.filters?.dt_reg_from, true)
                  : undefined,
                dt_reg_to: filter?.filters?.dt_reg_to
                  ? handleFormatFilterDate(filter?.filters?.dt_reg_to)
                  : undefined,
                findPhone:
                  filter?.filters?.findPhone?.length > 0
                    ? filter?.filters?.findPhone
                        ?.replaceAll("-", "")
                        ?.replace("(", "")
                        ?.replace(")", "")
                        ?.replaceAll("_", "")
                    : null,
              },
            }
          : []),
      };

      if (isFirstRequest.current || !isFilter) {
        isFirstRequest.current = false;
        getClients({ ...sendData, only_count_item: "1" }).then((resp) =>
          saveClientsCount(resp?.data?.all_item ?? 0)
        );
      }

      getClients(sendData).then((resp) => {
        isLoading.current = false;
        setLoading(false);
        // firstThousand.current = resp?.data?.data?.first_1000;
        handleResponse(
          resp,
          () => {
            if (resp?.data?.error === 0 && resp?.data.data?.clients?.length) {
              const respItemsCount = resp?.data?.data?.clients?.length;
              const updatedCount = isReset
                ? respItemsCount
                : allCountRef.current + respItemsCount;
              allCountRef.current = updatedCount;
              setAllCount(updatedCount ?? 0);
              const updatedClients = isReset
                ? resp?.data?.data?.clients
                : [...dataRef.current, ...resp?.data.data?.clients];
              dataRef.current = updatedClients;
              setClients(updatedClients);
            }
          },
          () => {
            setIsAllPages(true);
            if (isReset) {
              setAllCount(0);
              setClients([]);
              dataRef.current = [];
              allCountRef.current = 0;
            }
          }
        );
      });
    }
  };

  const handleSelectClient = (id) => {
    const isExist = selected.find((w) => w === id);
    setSelected(
      !!isExist ? selected.filter((w) => w !== id) : [...selected, id]
    );
  };

  useEffect(() => {
    !location?.search?.split("=")[0] && handleGetClients();
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
    handleGetClients();
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.addEventListener("scroll", handleScroll);
      return () =>
        listRef.current &&
        // eslint-disable-next-line
        listRef.current.removeEventListener("scroll", handleScroll);
    }
    // eslint-disable-next-line
  }, [listRef, isLoading.current, isAllPages, clients]);

  const handleApplyFilters = (isApply) => {
    isFilters.current = isApply;
    isApply && localStorage.setItem("clientsFilters", JSON.stringify(filter));
    if (!isApply) {
      currentPage.current = 0;
      setIsAllPages(false);
      setFilter({ search_key: "", search_phone: "" });
      localStorage.removeItem("clientsFilters");
    }
    handleGetClients(true, isApply);
    setIsDeleted(isApply ? filter?.filters?.show_deleted : false);
  };

  const handleSelectAll = (isReset, count) => {
    const clientsIds = clients?.map((c) => c.id);
    setSelected(isReset ? [] : clientsIds);
  };

  const handleDeleteClient = (clientId, reasone_remove, isFinally) => {
    deleteClient({
      id_client: [clientId],
      final_remove:
        filter?.filters?.show_deleted || isFinally ? "1" : undefined,
      reasone_remove,
    }).then((resp) => {
      handleResponse(resp, () => {
        showAlert("success", "Клієнта успішно видалено");
        setClients(clients.filter((c) => c.id !== clientId));
        saveClientsCount(allCount - 1);
        setAllCount(allCount - 1);
      });
    });
  };

  useEffect(() => {
    if (!isFirstRender.current && !location?.search?.split("=")[0]) {
      currentPage.current = 0;
      setIsAllPages(false);
      handleApplyFilters(false);
      isFilters.current = false;
      handleGetClients(true);
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
        showAlert("success", "Статус успішно обновлено");
      });
    });
  };

  const handleAddClientsToFavorite = () => {
    setActionLoading(true);
    Promise.all(
      selected?.map((id) =>
        addClientToFavorite(id).then((resp) => {
          handleResponse(resp, () => {
            showAlert("success", "Статус успішно обновлено");
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

  const handleSuccessSend = () => {
    const updatedClients = dataRef.current?.filter(
      (c) => !sendClients.find((s) => s === c?.id)
    );
    dataRef.current = updatedClients;
    setClients(updatedClients);
    const updatedCount = allCount - sendClients?.length;
    if (updatedCount === 0) {
      handleGetClients(true);
    } else {
      setAllCount(updatedCount);
      saveClientsCount(updatedCount);
      allCountRef.current = updatedCount;
      setSendClients([]);
      setSelected([]);
    }
  };

  const handleChangeComment = (comment, id) => {
    const updatedClients = dataRef.current?.map((c) =>
      c?.id === id ? { ...c, comment } : c
    );
    dataRef.current = updatedClients;
    setClients(updatedClients);
  };

  const handleDeleteClients = (ids, isSelected) => {
    saveClientsCount(allCount - ids?.length);
    setAllCount(allCount - ids?.length);
    setClients(clients.filter((c) => !ids.find((sc) => sc === c.id)));
    isSelected && setSelected([]);
  };

  const handleRestore = (ids, isSelected) => {
    if (ids?.length > 0) {
      restoreClients(ids).then((resp) =>
        handleResponse(resp, () => {
          handleDeleteClients(ids, isSelected);
          showAlert(
            "success",
            `Клієнт${ids?.length === 1 ? "а" : "ів"} успішно відновлено`
          );
        })
      );
    }
  };

  useEffect(() => {
    const filterApply = location?.search?.split("=")[0];
    if (filterApply === "?findWorker") {
      const initFilters =
        location?.search
          ?.replace("?findWorker=true", "")
          ?.split("&")
          ?.filter((f) => f?.length > 0)
          ?.map((f) => f?.split("=")) ?? [];
      let initFiltersObject = {};

      try {
        initFiltersObject = Object.fromEntries(initFilters);
      } catch {
        initFiltersObject = {};
      }
      isFilters.current = true;

      setFilter({ filters: initFiltersObject, my_struct: "1" });
      setDefaultFilter(true);
    }
  }, []);

  useEffect(() => {
    if (defaultFilter && !defaultFilterLoaded.current) {
      handleGetClients(true, true);
      defaultFilterLoaded.current = true;
    }
  }, [defaultFilter]);

  return (
    <StyledClients>
      {sendClients?.length > 0 ? (
        <SendModal
          onSendSuccess={handleSuccessSend}
          onClose={() => setSendClients([])}
          clients={sendClients}
          onChangeLoading={(val) => setActionLoading(val)}
        />
      ) : null}
      <Header
        favoritesFilter={favoritesFilter}
        onToggleFavoriteFilter={() => setFavoritesFilter(!favoritesFilter)}
        onRefreshData={() => handleGetClients(true)}
        selectedCount={selected.length}
        filter={filter}
        onChangeFilter={handleChangeFilter}
        searchPhoneCode={searchPhoneCode}
        onChangeSearchCode={(val) => setSearchPhoneCode(val)}
        searchPhoneCodeSecond={searchPhoneCodeSecond}
        onChangeSearchCodeSecond={(val) => setSearchPhoneCodeSecond(val)}
        onApplyFilters={handleApplyFilters}
        allCount={allCount}
        onSelectAll={handleSelectAll}
        selected={selected}
        onDelete={() => handleDeleteClients(selected, true)}
        onFavorite={handleAddClientsToFavorite}
        onSendClients={() => setSendClients(selected)}
        onChangeActionLoading={(val) => setActionLoading(val)}
        onRestore={() => handleRestore(selected, true)}
        isDeleted={isDeleted}
      />
      <List
        selected={selected}
        onSelect={handleSelectClient}
        clients={clients}
        innerRef={listRef}
        onDelete={handleDeleteClient}
        loading={loading}
        onAddToFavorite={handleAddClientToFavorite}
        onSend={handleSendClient}
        actionLoading={actionLoading}
        onChangeComment={handleChangeComment}
        onRestore={handleRestore}
        isDeleted={filter?.filters?.show_deleted}
      />
    </StyledClients>
  );
};

const StyledClients = styled.div`
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

export default Clients;
