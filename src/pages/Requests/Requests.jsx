import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useState } from "react";
import {
  useLazyGetRequestsCountQuery,
  useLazyGetRequestsQuery,
  useLazyGetRubricsFieldsQuery,
} from "../../store/requests/requests.api";
import { useEffect } from "react";
import { useActions } from "../../hooks/actions";
import { useRef } from "react";
import { handleResponse } from "../../utilits";

const INIT_FILTERS = {
  id_rubric: "",
  id_location: "",
  price_currency: "1",
  price_min: "",
  price_max: "",
  only_company_obj: "0",
  only_street_base_obj: "0",
  only_my_obj: "1",
  only_my_structure: "0",
};

export const Requests = () => {
  const [getRequestsCount] = useLazyGetRequestsCountQuery();
  const [getRequests] = useLazyGetRequestsQuery();
  const [getRubricField] = useLazyGetRubricsFieldsQuery();
  const { saveRequestsCount } = useActions();
  const [requests, setRequests] = useState([]);
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const [isAllPages, setIsAllPages] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [filtersFields, setFilterFields] = useState([]);
  const filterActive = useRef(false);
  const [allCount, setAllCount] = useState(0);

  const handleGetRubricsFields = (id) => {
    getRubricField(id).then((resp) => {
      setFilterFields(resp?.data);
    });
  };

  const handleChangeFilter = (field, value, isChangeData) => {
    if (isChangeData) {
      setFilters(value);
    } else {
      setFilters({ ...filters, [field]: value });
      if (field === "id_rubric") {
        handleGetRubricsFields(value);
        setFilters({
          id_rubric: value,
          id_location: filters?.id_location,
          price_currency: filters?.price_currency,
          price_min: filters?.price_min,
          price_max: filters?.price_max,
        });
      }
    }
  };

  const handleSelect = (index) =>
    setSelected(
      !!selected.find((i) => i === index)
        ? selected.filter((i) => i !== index)
        : [...selected, index]
    );

  const handleGetRequestsCount = () =>
    getRequestsCount().then((resp) =>
      saveRequestsCount(resp?.data?.count ?? 0)
    );

  useEffect(() => {
    handleGetRequestsCount();
    // eslint-disable-next-line
  }, []);

  const handleFormatRequests = (data) => {
    return Object.fromEntries(
      Object.entries(data?.requests)
        ?.map((r) => {
          const requestData = Object.entries(r[1])[0][1] ?? {};
          const generalData = data[r[0]];
          return { ...requestData, ...generalData };
        })
        .map((r) => [r?.id_group, r])
    );
  };

  const handleGetRequests = (isReset) => {
    if ((!isLoading.current && !isAllPages) || isReset) {
      isLoading.current = true;
      let data = {
        current_page: currentPage.current,
        item_on_page: 10,
        only_favorite: isFavorite ?? undefined,
      };

      if (filterActive.current) {
        data = {
          ...data,
          filters,
        };
      }

      getRequests(data).then((resp) => {
        isLoading.current = false;
        handleResponse(
          resp,
          () => {
            console.log("here");
            if (resp?.data?.requests) {
              setAllCount(resp?.data.all_item ?? 0);
              if (Object.entries(resp?.data?.requests)?.length) {
                setRequests(
                  isReset
                    ? handleFormatRequests(resp?.data)
                    : { ...requests, ...handleFormatRequests(resp?.data) }
                );
              }
            } else if (isReset) {
              setRequests([]);
            } else {
              setIsAllPages(true);
            }
          },
          () => {
            console.log("here");
            setIsAllPages(true);
            isReset && setRequests([]);
          }
        );
      });
    }
  };

  const handleScroll = () => {
    if (
      listRef.current.offsetHeight + listRef.current.scrollTop <=
        listRef.current.scrollHeight - 200 ||
      isLoading.current
    ) {
      return;
    }
    currentPage.current += 1;
    handleGetRequests();
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
  }, [listRef, isLoading.current, isAllPages, requests]);

  useEffect(() => {
    handleGetRequests();
    // eslint-disable-next-line
  }, []);

  const handleDeleteRequestsSuccess = () => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).filter(
          (req) => !selected.find((s) => s === req[0])
        )
      )
    );

    if (selected === Object.entries(requests)) {
      handleGetRequests(true);
    }

    setSelected([]);
    handleGetRequestsCount();
  };

  const handleDeleteRequestSuccess = (id) => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).filter((req) => id !== req[0])
      )
    );
    handleGetRequestsCount();
  };

  const handleToggleFavoriteStatus = (id) => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).map((req) => {
          const reqId = req[0];

          if (reqId === id) {
            const request = {
              ...req[1],
              General_field_group: {
                ...req[1].General_field_group,
                favorite: !req[1].General_field_group.favorite,
              },
            };

            return [reqId, request];
          }
          return req;
        })
      )
    );
  };

  const handleToggleFavoritesStatus = () => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).map((req) => {
          const reqId = req[0];

          if (!!selected.find((s) => s === reqId)) {
            const request = {
              ...req[1],
              General_field_group: {
                ...req[1].General_field_group,
                favorite: !req[1].General_field_group.favorite,
              },
            };

            return [reqId, request];
          }
          return req;
        })
      )
    );
    setSelected([]);
  };

  useEffect(() => {
    handleGetRequests(true);
    // eslint-disable-next-line
  }, [isFavorite]);

  const handleApplyFilter = (isApply) => {
    filterActive.current = isApply;
    handleGetRequests(true);
    if (!isApply) {
      setFilters(INIT_FILTERS);
      setFilterFields([]);
    }
  };

  const handleSelectAll = (isReset) => {
    const requestsIds = Object.entries(requests)?.map((r) => r[0]);
    setSelected(isReset ? [] : requestsIds);
  };

  return (
    <StyledRequests>
      <Header
        selectedCount={selected.length}
        onDelete={handleDeleteRequestsSuccess}
        selected={selected}
        onFavorite={handleToggleFavoritesStatus}
        isFavorite={isFavorite}
        onIsFavotite={() => setIsFavorite(!isFavorite)}
        filters={filters}
        onChangeFilter={handleChangeFilter}
        filtersFields={filtersFields}
        onApplyFilter={handleApplyFilter}
        allCount={allCount}
        onSelectAll={handleSelectAll}
      />
      <List
        selected={selected}
        onSelect={handleSelect}
        data={requests}
        innerRef={listRef}
        onDeleteRequest={handleDeleteRequestSuccess}
        onFavorite={handleToggleFavoriteStatus}
      />
    </StyledRequests>
  );
};

const StyledRequests = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 15px 20px;
  position: relative;
  @media (max-width: 700px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
  }
`;
