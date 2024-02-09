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
import { handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";

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
    search_key: "",
    search_phone: "",
  });
  const [searchPhoneCode, setSearchPhoneCode] = useState("1");
  const isFilters = useRef(false);
  const [allCount, setAllCount] = useState(0);
  const [deleteClient] = useLazyDeleteCientQuery();
  const [loading, setLoading] = useState(false);
  const dataRef = useRef([]);
  const allCountRef = useRef(0);
  const [addClientToFavorite] = useLazyAddClientToFavoriteQuery();

  const handleChangeFilter = (field, value) =>
    setFilter({ ...filter, [field]: value });

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
      console.log(
        filter?.dt_reg_from
          ? new Date(filter?.dt_reg_from)?.getTime / 1000
          : undefined
      );
      getClients({
        current_page: currentPage.current,
        item_on_page: 10,
        show_favorite: favoritesFilter ? "1" : undefined,
        ...filter,
        dt_reg_from: filter?.dt_reg_from
          ? new Date(filter?.dt_reg_from)?.getTime() / 1000
          : undefined,
        dt_reg_to: filter?.dt_reg_to
          ? new Date(filter?.dt_reg_to)?.getTime() / 1000
          : undefined,
      }).then((resp) => {
        isLoading.current = false;
        setLoading(false);
        handleResponse(
          resp,
          () => {
            if (resp?.data?.error === 0 && resp?.data.data?.clients?.length) {
              const respItemsCount = resp?.data?.data?.clients?.length;
              const updatedCount = isReset
                ? respItemsCount
                : allCountRef.current + respItemsCount;
              allCountRef.current = updatedCount;
              setAllCount(updatedCount);
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
    const clientsIds = clients?.slice(0, count ?? undefined)?.map((c) => c.id);
    setSelected(isReset ? [] : clientsIds);
  };

  const handleDeleteClients = () => {
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
      });
    });
  };

  useEffect(() => {
    handleGetClients(true);
    currentPage.current = 0;
    setIsAllPages(false);
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

  return (
    <StyledClients>
      <Header
        favoritesFilter={favoritesFilter}
        onToggleFavoriteFilter={() => setFavoritesFilter(!favoritesFilter)}
        onRefreshData={() => handleGetClients(true)}
        selectedCount={selected.length}
        filter={filter}
        onChangeFilter={handleChangeFilter}
        searchPhoneCode={searchPhoneCode}
        onChangeSearchCode={(val) => setSearchPhoneCode(val)}
        onApplyFilters={handleApplyFilters}
        allCount={allCount}
        onSelectAll={handleSelectAll}
        selected={selected}
        onDelete={handleDeleteClients}
        onFavorite={handleAddClientsToFavorite}
      />
      <List
        selected={selected}
        onSelect={handleSelectClient}
        clients={clients}
        innerRef={listRef}
        onDelete={handleDeleteClient}
        loading={loading}
        onAddToFavorite={handleAddClientToFavorite}
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
