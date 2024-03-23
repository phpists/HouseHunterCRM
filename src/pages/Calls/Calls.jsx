import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useEffect, useRef, useState } from "react";
import {
  useLazyAddCommentToCallQuery,
  useLazyGetCallsQuery,
  useLazySetStatusCallQuery,
} from "../../store/calls/calls.api";
import { checkIsArray, checkIsJSON, handleResponse } from "../../utilits";
import { useActions } from "../../hooks/actions";
import cogoToast from "cogo-toast";
import { useLocation } from "react-router-dom";
import { useGetPhonesCodesQuery } from "../../store/auth/auth.api";

const INIT_FILTERS = {
  search_key: "",
  //   id_worker_Search: "",
  type_call: [],
  call_my_struct: undefined,
  status: undefined,
  date_from: Math.floor(new Date().getTime() / 1000),
  date_to: Math.floor(new Date().getTime() / 1000),
  view: "0",
};

const Calls = () => {
  const location = useLocation();
  const [getCalls] = useLazyGetCallsQuery();
  const [setCallStatus] = useLazySetStatusCallQuery();
  const [addComment] = useLazyAddCommentToCallQuery();
  const { saveCallsCount } = useActions();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(null);
  const prevFilters = localStorage.getItem("callsFilter");
  const [filters, setFilters] = useState(
    !!prevFilters && !!checkIsJSON(prevFilters)
      ? JSON.parse(prevFilters)
      : INIT_FILTERS
  );
  const isFirstLoad = useRef(true);
  const [isDefaultFilterSet, setIsDefaultFilterSet] = useState(false);
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const [isAllPages, setIsAllPages] = useState(false);
  const [loading, setLoading] = useState(false);
  const isFilter = useRef(!!prevFilters && !!checkIsJSON(prevFilters));
  const allCountRef = useRef(0);
  const [allCount, setAllCount] = useState(0);
  const firstThousand = useRef([]);
  const [filterPhoneCode, setFilterPhoneCode] = useState("1");
  const { data: phonesCodes } = useGetPhonesCodesQuery();

  const handleChangePhoneCode = (val) => setFilterPhoneCode(val);

  const handleChangeFilter = (fieldName, value) => {
    setFilters({ ...filters, [fieldName]: value });
  };

  const handleSelect = (index) =>
    setSelected(
      !!selected.find((i) => i === index)
        ? selected.filter((i) => i !== index)
        : [...selected, index]
    );

  const handleFormatFilterDate = (d, isFrom) => {
    const date = new Date(d * 1000);

    date.setHours(isFrom ? 0 : 23);
    date.setMinutes(isFrom ? 0 : 59);
    date.setSeconds(isFrom ? 0 : 59);

    return Math.floor(date?.getTime() / 1000);
  };

  const handleGetCalls = (isReset) => {
    if ((!isLoading.current && !isAllPages) || isReset) {
      if (isReset) {
        listRef.current.scroll({ top: 0 });
        setSelected([]);
        currentPage.current = 0;
        setIsAllPages(false);
      }
      isLoading.current = true;
      setLoading(true);
      getCalls({
        filters: isFilter.current
          ? {
              ...filters,
              search_phone: filters?.search_phone
                ? `${
                    phonesCodes?.find((p) => p.id === filterPhoneCode)?.code ??
                    ""
                  }${filters?.search_phone
                    ?.replaceAll("-", "")
                    ?.replace("(", "")
                    ?.replace(")", "")
                    ?.replaceAll("_", "")}`
                : undefined,
              date_from: filters?.date_from
                ? handleFormatFilterDate(filters?.date_from, true)
                : undefined,
              date_to: filters?.date_to
                ? handleFormatFilterDate(filters?.date_to)
                : undefined,
            }
          : undefined,
        current_page: currentPage.current,
      }).then((resp) => {
        isLoading.current = false;
        setLoading(false);
        handleResponse(
          resp,
          () => {
            setData(
              isReset
                ? resp?.data?.data
                : [...checkIsArray(data), ...resp?.data?.data]
            );
            saveCallsCount(resp?.data?.all_item ?? 0);
            allCountRef.current = resp?.data?.all_item;
            setAllCount(resp?.data?.all_item);
            firstThousand.current = resp?.data?.first_1000;
          },
          () => {
            setIsAllPages(true);
            if (isReset) {
              setData([]);
              saveCallsCount(0);
              allCountRef.current = 0;
              setAllCount(0);
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
    handleGetCalls();
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
  }, [listRef, isLoading.current, isAllPages, data]);

  const handleSetCallStatus = (id_call, status) => {
    setCallStatus({ id_call, status }).then((resp) =>
      handleResponse(resp, () => {
        setData(data?.filter((call) => call.id !== id_call));
        const updatedCount = allCountRef.current - 1;
        saveCallsCount(updatedCount);
        allCountRef.current = updatedCount;
        setAllCount(updatedCount);
        cogoToast.success("Статус успішно змінено!", {
          hideAfter: 3,
          position: "top-right",
        });
      })
    );
  };

  const handleAddComment = (id_call, comment) => {
    addComment({ id_call, comment }).then((resp) =>
      handleResponse(resp, () => {
        handleResponse(resp, () => {
          cogoToast.success("Коментар успішно змінено!", {
            hideAfter: 3,
            position: "top-right",
          });
        });
        setData(
          data?.map((call) =>
            call.id === id_call ? { ...call, coment: comment } : call
          )
        );
      })
    );
  };

  const handleApplyFilter = (isApply) => {
    currentPage.current = 0;
    isFilter.current = isApply;
    if (isApply) {
      localStorage.setItem("callsFilter", JSON.stringify(filters));
    } else {
      setFilters(INIT_FILTERS);
      localStorage.removeItem("callsFilter");
    }
    handleGetCalls(true);
  };

  const handleSetCallsStatus = (status) => {
    Promise.all(
      selected?.map((id_call) =>
        setCallStatus({
          id_call,
          status,
        }).then((resp) => {
          handleResponse(resp, () => {
            cogoToast.success("Статус успішно змінено!", {
              hideAfter: 3,
              position: "top-right",
            });
          });
        })
      )
    ).then((resp) => {
      setData(data?.filter((call) => !selected.find((s) => s === call?.id)));
      const updatedCount = allCountRef.current - selected;
      saveCallsCount(updatedCount);
      allCountRef.current = updatedCount;
      setAllCount(updatedCount);
    });
  };

  useEffect(() => {
    const filterApply = location?.search?.split("=")[0];
    if (filterApply === "?view") {
      setFilters({ view: "0" });
      setIsDefaultFilterSet(true);
    } else {
      handleGetCalls(true);
      setIsDefaultFilterSet(true);
    } // eslint-disable-next-line
  }, [location.search]);

  useEffect(() => {
    if (isFirstLoad.current && isDefaultFilterSet) {
      const filterApply = location?.search?.split("=")[0];
      isFirstLoad.current = false;
      isFilter.current = !!filterApply;
      handleGetCalls(true);
    } // eslint-disable-next-line
  }, [filters, isDefaultFilterSet]);

  const handleSelectAll = (isReset, count) => {
    setSelected(isReset ? [] : firstThousand.current);
  };

  const handleSendCliens = (ids = []) => {
    setSelected([]);
    setData(data?.filter((d) => !ids.find((s) => s === d.client_id)));
  };

  const handleSendCalls = () => {
    setData(data?.filter((d) => !selected.find((s) => s === d.id)));
    setSelected([]);
  };

  return (
    <StyledCalls>
      <Header
        selectedCount={selected?.length}
        filters={filters}
        onChangeFilter={handleChangeFilter}
        onApplyFilter={handleApplyFilter}
        onSetCallsStatus={handleSetCallsStatus}
        onSelectAll={handleSelectAll}
        allCount={allCount}
        clients={
          data
            ?.filter((c) => selected?.includes(c.id))
            ?.map((c) => c?.client_id) ?? []
        }
        filterPhoneCode={filterPhoneCode}
        onChangeFilterPhoneCode={handleChangePhoneCode}
        onSendSuccess={handleSendCalls}
        calls={
          data
            ?.filter((c) => selected?.includes(c.id))
            ?.filter((c) => !c?.client_id)
            ?.map((c) => c?.id) ?? []
        }
      />
      <List
        selected={selected}
        onSelect={handleSelect}
        data={data ?? []}
        onSetStatus={handleSetCallStatus}
        onAddComment={handleAddComment}
        listRef={listRef}
        loading={loading}
        onSendSuccess={handleSendCliens}
      />
    </StyledCalls>
  );
};

const StyledCalls = styled.div`
  position: relative;
  padding: 15px 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  @media (max-width: 600px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
  }
`;

export default Calls;
