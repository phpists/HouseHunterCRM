import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useEffect, useState } from "react";
import {
  useLazyGetClientsCountQuery,
  useLazyGetClientsQuery,
} from "../../store/clients/clients.api";
import { useActions } from "../../hooks/actions";
import { useRef } from "react";
import { handleResponse } from "../../utilits";

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
      }).then((resp) => {
        isLoading.current = false;
        handleResponse(
          resp,
          () => {
            if (resp?.data?.error === 0 && resp?.data.data?.length) {
              setClients(
                isReset ? resp?.data?.data : [...clients, ...resp?.data.data]
              );
            }
          },
          () => setIsAllPages(true),
          true
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
        listRef.current.removeEventListener("scroll", handleScroll);
    }
  }, [listRef, isLoading.current, isAllPages, clients]);

  const handleApplyFilters = (isApply) => {
    isFilters.current = isApply;
    handleGetClients(true);
  };

  return (
    <StyledClients>
      <Header
        favoritesFilter={favoritesFilter}
        onToggleFavoriteFilter={() => setFavoritesFilter(!favoritesFilter)}
        onRefreshData={() => handleGetClients(true)}
        selectedCount={10}
        filter={filter}
        onChangeFilter={handleChangeFilter}
        searchPhoneCode={searchPhoneCode}
        onChangeSearchCode={(val) => setSearchPhoneCode(val)}
        onApplyFilters={handleApplyFilters}
      />
      <List
        selected={selected}
        onSelect={handleSelectClient}
        clients={clients}
        innerRef={listRef}
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
