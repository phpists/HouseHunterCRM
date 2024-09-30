import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useState } from "react";
import {
  useLazyGetRequestsQuery,
  useLazyGetRubricsFieldsQuery,
  useLazyRestoreRequestsQuery,
} from "../../store/requests/requests.api";
import { useEffect } from "react";
import { useActions } from "../../hooks/actions";
import { useRef } from "react";
import { checkIsJSON, handleResponse, showAlert } from "../../utilits";
import { useAppSelect } from "../../hooks/redux";
import { useLocation } from "react-router-dom";

const INIT_FILTERS = {
  id_rubric: "",
  id_location: "",
  price_currency: "1",
  price_min: "",
  price_max: "",
  price_for: "4",
  only_company_obj: "0",
  only_street_base_obj: "0",
  only_my_obj: "1",
  only_my_structure: "0",
  showUnreadMessege: "0",
};

const Requests = () => {
  const location = useLocation();
  const [getRequests] = useLazyGetRequestsQuery();
  const [getRubricField] = useLazyGetRubricsFieldsQuery();
  const [restoreRequests] = useLazyRestoreRequestsQuery();
  const { saveRequestsCount } = useActions();
  const { requestsCount } = useAppSelect((state) => state.requests);
  const [requests, setRequests] = useState([]);
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const [isAllPages, setIsAllPages] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const prevFilters = localStorage.getItem("requestFilter");
  const [filters, setFilters] = useState(
    !!prevFilters && !!checkIsJSON(prevFilters)
      ? JSON.parse(prevFilters)
      : INIT_FILTERS
  );
  const [filtersFields, setFilterFields] = useState([]);
  const filterActive = useRef(!!prevFilters && !!JSON.parse(prevFilters));
  const [allCount, setAllCount] = useState(0);
  const isFirstRender = useRef(true);
  const [isDefaultFiltersSet, setIsDefaultFiltersSet] = useState(false);
  const [loading, setLoading] = useState(false);
  const dataRef = useRef([]);
  const allCountRef = useRef(0);
  const [actionLoading, setActionLoading] = useState(false);
  const firstRequest = useRef(true);
  const [isDeleted, setIsDeleted] = useState(filters?.show_deleted === "1");

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

  const handleGetRequests = (isReset, isGetCount) => {
    if ((!isLoading.current && !isAllPages) || isReset) {
      if (isReset) {
        listRef.current.scroll({ top: 0 });
        setRequests([]);
        setAllCount(0);
        setSelected([]);
        dataRef.current = [];
        allCountRef.current = 0;
      }

      isLoading.current = true;
      let data = {
        current_page: currentPage.current,
        item_on_page: 50,
        only_favorite: isFavorite ?? undefined,
      };

      if (filterActive.current) {
        data = {
          ...data,
          filters: Object.fromEntries(
            Object.entries(filters)?.filter((f) => f[1] !== "0")
          ),
        };
      }

      setLoading(true);

      if (isGetCount || firstRequest.current) {
        firstRequest.current = false;
        getRequests({ ...data, only_count_item: "1" }).then((resp) =>
          saveRequestsCount(Number(resp?.data?.all_item ?? 0))
        );
      }

      getRequests(data).then((resp) => {
        isLoading.current = false;
        isFirstRender.current = false;
        setLoading(false);
        handleResponse(
          resp,
          () => {
            if (resp?.data?.requests) {
              //   saveRequestsCount(resp?.data.all_item ?? 0);
              if (Object.entries(resp?.data?.requests)?.length) {
                const updatedCount = isReset
                  ? Object.entries(resp?.data?.requests)?.length
                  : allCountRef.current +
                    Object.entries(resp?.data?.requests)?.length;
                allCountRef.current = updatedCount;
                setAllCount(updatedCount);

                const updatedRequests = isReset
                  ? handleFormatRequests(resp?.data)
                  : {
                      ...dataRef.current,
                      ...handleFormatRequests(resp?.data),
                    };
                dataRef.current = updatedRequests;
                setRequests(updatedRequests);
              }
            } else if (isReset) {
              setRequests([]);
            } else {
              setIsAllPages(true);
            }
          },
          () => {
            setIsAllPages(true);
            if (isReset) {
              setRequests([]);
              setAllCount(0);
              //   saveRequestsCount(0);
              dataRef.current = [];
              allCountRef.current = 0;
            }
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

  const handleChangeRequestDeleted = (id, value) => {
    const updatedData = Object.fromEntries(
      Object.entries(requests).map((req) => {
        const reqId = req[0];

        if (reqId === id) {
          const request = {
            ...req[1],
            General_field_group: {
              ...req[1].General_field_group,
              deleted: value,
            },
          };

          return [reqId, request];
        }
        return req;
      })
    );
    dataRef.current = updatedData;
    setRequests(updatedData);
  };

  const handleDeleteRequestsSuccess = () => {
    handleGetRequests(true);
    setSelected([]);
  };

  const handleDeleteRequestSuccess = (id) => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).filter((req) => id !== req[0])
      )
    );
    saveRequestsCount(requestsCount - 1);
    setAllCount(allCount - 1);
  };

  const handleToggleFavoriteStatus = (id) => {
    const updatedData = Object.fromEntries(
      isFavorite
        ? Object.entries(requests).filter((req) => req[0] !== id)
        : Object.entries(requests).map((req) => {
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
    );
    dataRef.current = updatedData;
    setRequests(updatedData);
    if (isFavorite) {
      const updatedCount = allCount - 1;
      allCountRef.current = updatedCount;
      setAllCount(updatedCount);
    }
  };

  const handleToggleFavoritesStatus = () => {
    const updatedData = Object.fromEntries(
      isFavorite
        ? Object.entries(requests).filter(
            (req) => !selected.find((s) => s === req[0])
          )
        : Object.entries(requests).map((req) => {
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
    );
    setRequests(updatedData);
    dataRef.current = updatedData;
    setRequests(updatedData);
    if (isFavorite) {
      const updatedCount = allCount - selected.length;
      allCountRef.current = updatedCount;
      setAllCount(updatedCount);
      saveRequestsCount(requestsCount - selected.length);
    }
    setSelected([]);
  };

  const handleChangeComment = (comment_group, id) => {
    const updatedData = Object.fromEntries(
      Object.entries(requests).map((req) => {
        const reqId = req[0];

        if (reqId === id) {
          const request = {
            ...req[1],
            General_field_group: {
              ...req[1].General_field_group,
              comment_group,
            },
          };

          return [reqId, request];
        }
        return req;
      })
    );
    dataRef.current = updatedData;
    setRequests(updatedData);
  };

  const handleChangeNewCount = (count_objects, id) => {
    const updatedData = Object.fromEntries(
      Object.entries(requests).map((req) => {
        const reqId = req[0];

        if (reqId === id) {
          const request = {
            ...req[1],
            General_field_group: {
              ...req[1].General_field_group,
              count_objects,
            },
          };

          return [reqId, request];
        }
        return req;
      })
    );
    dataRef.current = updatedData;
    setRequests(updatedData);
  };

  const handleOpenChat = (id) => {
    const updatedData = Object.fromEntries(
      Object.entries(requests).map((req) => {
        const reqId = req[0];

        if (reqId === id) {
          const request = {
            ...req[1],
            General_field_group: {
              ...req[1].General_field_group,
              new_messege: "0",
            },
          };

          return [reqId, request];
        }
        return req;
      })
    );
    dataRef.current = updatedData;
    setRequests(updatedData);
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      currentPage.current = 0;
      setIsAllPages(false);
      //   setFilters(INIT_FILTERS);
      //   filterActive.current = false;
      handleGetRequests(true);
      // eslint-disable-next-line
    }
    // eslint-disable-next-line
  }, [isFavorite]);

  const handleApplyFilter = (isApply) => {
    currentPage.current = 0;
    setIsAllPages(false);
    filterActive.current = isApply;
    isApply && localStorage.setItem("requestFilter", JSON.stringify(filters));
    if (!isApply) {
      setFilters(INIT_FILTERS);
      setFilterFields([]);
      localStorage.removeItem("requestFilter");
    }
    setIsDeleted(isApply ? filters?.show_deleted === "1" : false);
    handleGetRequests(true, !isApply);
  };

  const handleSelectAll = (isReset, count) => {
    const requestsIds = Object.entries(requests)
      ?.map((r) => r[0])
      .slice(0, count ?? undefined);

    setSelected(isReset ? [] : requestsIds);
  };

  useEffect(() => {
    filterActive.current = false;
    const filterApply = location?.search?.split("=")[0];
    const prevFilters = localStorage.getItem("requestFilter");
    setIsDefaultFiltersSet(false);
    filterActive.current = false;
    isFirstRender.current = true;
    firstRequest.current = true;
    if (filterApply === "?showDeadline") {
      filterActive.current = true;
      setFilters({ showDeadline: "1" });
      setIsDefaultFiltersSet(true);
    } else if (filterApply === "?showUnreadMessege") {
      setFilters({
        only_my_obj: "1",
        showUnreadMessege: "1",
      });
      filterActive.current = true;
      setIsDefaultFiltersSet(true);
    } else if (filterApply === "?findWorker") {
      const defaultData = {
        id_rubric: "",
        id_location: "",
        price_currency: "1",
        price_min: "",
        price_max: "",
        price_for: "4",
        only_my_structure: "1",
      };
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

      filterActive.current = true;

      setFilters({ ...initFiltersObject, ...defaultData });
      setIsDeleted(initFiltersObject?.show_deleted === "1");

      setIsDefaultFiltersSet(true);
    } else if (!!prevFilters && !!checkIsJSON(prevFilters)) {
      filterActive.current = true;
      setFilters(JSON.parse(prevFilters) ?? INIT_FILTERS);
      setIsDefaultFiltersSet(true);
    } else {
      handleGetRequests(true);
    }
    // eslint-disable-next-line
  }, [location.search]);

  useEffect(() => {
    if (isFirstRender.current && isDefaultFiltersSet) {
      isFirstRender.current = false;
      handleGetRequests(true);
    }
    // eslint-disable-next-line
  }, [filters, isDefaultFiltersSet]);

  const handleRestoreRequest = (id, idGroup) => {
    restoreRequests([idGroup]).then((resp) =>
      handleResponse(resp, () => {
        handleDeleteRequestSuccess(id);
        showAlert("success", "Запит успішно відновлено");
      })
    );
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
        onChangeActionLoading={(val) => setActionLoading(val)}
        isDeleted={isDeleted}
      />
      <List
        selected={selected}
        onSelect={handleSelect}
        data={requests}
        innerRef={listRef}
        onDeleteRequest={handleDeleteRequestSuccess}
        onFavorite={handleToggleFavoriteStatus}
        loading={loading}
        actionLoading={actionLoading}
        onChangeComment={handleChangeComment}
        onOpenChat={handleOpenChat}
        onRestore={handleRestoreRequest}
        isDeletedRequests={filters?.show_deleted === "1"}
        onChangeNewCount={handleChangeNewCount}
      />
    </StyledRequests>
  );
};

const StyledRequests = styled.div`
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 15px 20px;
  position: relative;
  @media (max-width: 700px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
  }
  @media (max-width: 500px) {
    padding: 10px;
    margin-left: -10px;
  }
`;

export default Requests;
