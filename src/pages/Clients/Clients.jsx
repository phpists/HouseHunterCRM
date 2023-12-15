import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useEffect, useState } from "react";
import {
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
  const [getClientCount] = useLazyGetClientsCountQuery();
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

  const handleChangeFilter = (field, value) =>
    setFilter({ ...filter, [field]: value });

  const handleGetClients = (isReset) => {
    if ((!isLoading.current && !isAllPages) || isReset) {
      isLoading.current = true;
      isReset && setIsAllPages(false);
      getClients({
        current_page: currentPage.current,
        item_on_page: 10,
        search_key: isFilters.current ? filter.search_key : undefined,
        search_phone: isFilters.current ? filter.search_phone : undefined,
        search_phone_code:
          isFilters.current && filter.search_phone?.length > 0
            ? searchPhoneCode
            : undefined,
        my_struct: isFilters.current ? filter?.my_struct : undefined,
      }).then((resp) => {
        isLoading.current = false;
        handleResponse(
          resp,
          () => {
            if (resp?.data?.error === 0 && resp?.data.data?.clients?.length) {
              setAllCount(resp?.data?.data?.all_item ?? 0);
              setClients(
                isReset
                  ? resp?.data?.data?.clients
                  : [...clients, ...resp?.data.data?.clients]
              );
            }
          },
          () => {
            setIsAllPages(true);
            isReset && setClients([]);
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

  const handleGetClientsCount = () => {
    getClientCount().then((resp) => saveClientsCount(resp?.data?.count ?? 0));
  };

  useEffect(() => {
    handleGetClientsCount();
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
    handleGetClients(true);
  };

  const handleSelectAll = (isReset) => {
    const clientsIds = clients?.map((c) => c.id);
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
      />
      <List
        selected={selected}
        onSelect={handleSelectClient}
        clients={clients}
        innerRef={listRef}
        onDelete={handleDeleteClient}
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
