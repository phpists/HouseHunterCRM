import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useEffect, useState } from "react";
import {
  useLazyAddClientToFavoriteQuery,
  useLazyDeleteCientQuery,
  useLazyGetClientsCountQuery,
  useLazyGetClientsQuery,
} from "../../store/clients/clients.api";
import { useActions } from "../../hooks/actions";
import { useRef } from "react";
import { handleFromInputDate, handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";
import { SendModal } from "./SendModal";

export const Clients = () => {
  const [favoritesFilter, setFavoritesFilter] = useState(false);
  const [selected, setSelected] = useState([]);
  const { saveClientsCount } = useActions();
  const [clients, setClients] = useState([]);
  const [getClients] = useLazyGetClientsQuery();
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const [isAllPages, setIsAllPages] = useState(false);
  const [filter, setFilter] = useState({
    search_key: undefined,
    search_phone: undefined,
  });
  const [searchPhoneCode, setSearchPhoneCode] = useState("1");
  const [searchPhoneCodeSecond, setSearchPhoneCodeSecond] = useState("1");
  const isFilters = useRef(false);
  const [allCount, setAllCount] = useState(0);
  const [deleteClient] = useLazyDeleteCientQuery();
  const [loading, setLoading] = useState(false);
  const dataRef = useRef([]);
  const allCountRef = useRef(0);
  const [addClientToFavorite] = useLazyAddClientToFavoriteQuery();
  const firstThousand = useRef([]);
  const [sendClients, setSendClients] = useState([]);

  const handleChangeFilter = (field, value) =>
    setFilter({ ...filter, [field]: value });

  const handleFormatFilterDate = (d, isFrom) => {
    const date = new Date(handleFromInputDate(d));

    date.setHours(isFrom ? 0 : 23);
    date.setMinutes(isFrom ? 0 : 59);
    date.setSeconds(isFrom ? 0 : 59);

    return date?.getTime() / 1000;
  };

  const handleGetClients = (isReset) => {
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

      getClients({
        current_page: currentPage.current,
        item_on_page: 10,
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
      }).then((resp) => {
        isLoading.current = false;
        setLoading(false);
        firstThousand.current = resp?.data?.data?.first_1000;
        handleResponse(
          resp,
          () => {
            if (resp?.data?.error === 0 && resp?.data.data?.clients?.length) {
              const respItemsCount = resp?.data?.data?.clients?.length;
              //   const updatedCount = isReset
              //     ? respItemsCount
              //     : allCountRef.current + respItemsCount;
              //   allCountRef.current = updatedCount;
              setAllCount(resp?.data?.data?.all_item ?? 0);
              saveClientsCount(resp?.data?.data?.all_item ?? 0);
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
              saveClientsCount(0);
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
    handleGetClients();
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
    if (!isApply) {
      currentPage.current = 0;
      setIsAllPages(false);
      setFilter({ search_key: "", search_phone: "" });
    }
    handleGetClients(true);
  };

  const handleSelectAll = (isReset, count) => {
    const clientsIds = firstThousand.current;
    setSelected(isReset ? [] : clientsIds);
  };

  const handleDeleteClients = () => {
    firstThousand.current = firstThousand.current.filter(
      (c) => !selected.find((sc) => sc === c)
    );
    saveClientsCount(allCount - selected?.length);
    setAllCount(allCount - selected?.length);
    setClients(clients.filter((c) => !selected.find((sc) => sc === c.id)));
    setSelected([]);
  };

  const handleDeleteClient = (clientId) => {
    deleteClient({ id_client: [clientId] }).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success("Клієнта успішно видалено", {
          hideAfter: 3,
          position: "top-right",
        });
        setClients(clients.filter((c) => c.id !== clientId));
        firstThousand.current = firstThousand.current.filter(
          (c) => c !== clientId
        );
        saveClientsCount(allCount - 1);
        setAllCount(allCount - 1);
      });
    });
  };

  useEffect(() => {
    currentPage.current = 0;
    setIsAllPages(false);
    setFilter({});
    isFilters.current = false;
    handleGetClients(true);
  }, [favoritesFilter]);

  const handleAddClientToFavorite = (id) => {
    addClientToFavorite(id).then((resp) => {
      handleResponse(resp, () => {
        const updatedClients = dataRef.current?.map((c) =>
          c.id === id ? { ...c, favorite: !c.favorite } : c
        );
        dataRef.current = updatedClients;
        setClients(updatedClients);
        cogoToast.success("Статус успішно обновлено", {
          hideAfter: 3,
          position: "top-right",
        });
      });
    });
  };

  const handleAddClientsToFavorite = () => {
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
      const updatedClients = dataRef.current?.map((c) =>
        selected.find((s) => s === c?.id) ? { ...c, favorite: !c.favorite } : c
      );
      dataRef.current = updatedClients;
      setClients(updatedClients);
      setSelected([]);
    });
  };

  const handleSendClient = (id) => {
    setSendClients([id]);
  };

  const handleSuccessSend = () => {
    setSendClients([]);
    setSelected([]);
  };

  return (
    <StyledClients>
      {sendClients?.length > 0 ? (
        <SendModal
          onSendSuccess={handleSuccessSend}
          onClose={() => setSendClients([])}
          clients={sendClients}
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
        onDelete={handleDeleteClients}
        onFavorite={handleAddClientsToFavorite}
        onSendClients={() => setSendClients(selected)}
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
      />
    </StyledClients>
  );
};

const StyledClients = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  width: 100%;
  padding: 18px 20px 14px;
  @media (max-width: 850px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
  }
`;
