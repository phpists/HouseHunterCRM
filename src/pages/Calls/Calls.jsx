import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useEffect, useRef, useState } from "react";
import {
  useLazyAddCommentToCallQuery,
  useLazyGetCallsQuery,
  useLazyGetOrdersQuery,
  useLazyGetOrdersTelegrambotQuery,
  useLazySetOrderCommentQuery,
  useLazySetStatusCallQuery,
  useLazySetTelegramCommentOrderQuery,
} from "../../store/calls/calls.api";
import {
  checkIsArray,
  checkIsJSON,
  getFirstDay,
  handleFormatDate,
  handleResponse,
  removePhoneMask,
} from "../../utilits";
import { useActions } from "../../hooks/actions";
import cogoToast from "cogo-toast";
import { useLocation } from "react-router-dom";
import { useGetPhonesCodesQuery } from "../../store/auth/auth.api";
import { useAppSelect } from "../../hooks/redux";
import { XHOUSE_COMPANY_ID } from "../../constants";
import { useGetCompanyInfoQuery } from "../../store/billing/billing.api";

const INIT_FILTERS = {
  search_key: "",
  //   id_worker_Search: "",
  type_call: [],
  call_my_struct: undefined,
  status: undefined,
  date_from: Math.floor(getFirstDay(true).getTime() / 1000),
  date_to: Math.floor(new Date().getTime() / 1000),
};

const Calls = ({ companyId }) => {
  const location = useLocation();
  const [getCalls] = useLazyGetCallsQuery();
  const [getTelegramOrders] = useLazyGetOrdersTelegrambotQuery();
  const [getOrders] = useLazyGetOrdersQuery();
  const [setCallStatus] = useLazySetStatusCallQuery();
  const [addComment] = useLazyAddCommentToCallQuery();
  const [setTelegramOrderComment] = useLazySetTelegramCommentOrderQuery();
  const [setOrderComment] = useLazySetOrderCommentQuery();
  const { saveCallsCount } = useActions();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(null);
  const [telegramData, setTelegramData] = useState([]);
  const [orders, setOrders] = useState([]);
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
  const [filterPhoneCode, setFilterPhoneCode] = useState("1");
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const { callsCount } = useAppSelect((state) => state.calls);
  const [showTelegram, setShowTelegram] = useState(true);
  const [activeType, setActiveType] = useState(
    localStorage.getItem("callsActiveType") ?? "phone"
  );
  const [editActiveType, setEditActiveType] = useState(
    localStorage.getItem("callsActiveType") ?? "phone"
  );
  const [ordersTypes, setOrdersTypes] = useState([]);
  const [telegramTypes, setTelegramTypes] = useState([]);

  const handleChangePhoneCode = (val) => setFilterPhoneCode(val);
  const handleChangeActiveType = (type) => {
    setEditActiveType(type);
    localStorage.setItem("callsActiveType", type);
  };

  const handleChangeFilter = (fieldName, value) => {
    if (fieldName === "type_call") {
      if (value?.includes("telegram")) {
        setShowTelegram(showTelegram === "show" ? false : "show");
      } else {
        setFilters({ ...filters, [fieldName]: value });
        setShowTelegram(false);
      }
    } else {
      setFilters({ ...filters, [fieldName]: value });
    }
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

  const handleGetgetTelegramOrders = () => {
    if (XHOUSE_COMPANY_ID.includes(companyId)) {
      const sendData = {
        filters: isFilter.current
          ? {
              ...filters,
              ...(removePhoneMask(filters?.search_phone)?.length > 0
                ? [{ search_phone: removePhoneMask(filters?.search_phone) }]
                : []),
              date_from: filters?.date_from
                ? handleFormatFilterDate(filters?.date_from, true)
                : undefined,
              date_to: filters?.date_to
                ? handleFormatFilterDate(filters?.date_to)
                : undefined,
            }
          : {
              date_from: Math.floor(getFirstDay(true).getTime() / 1000),
              date_to: Math.floor(new Date().getTime() / 1000),
            },
      };
      getTelegramOrders(sendData).then((resp) => {
        const orders = resp?.data?.data ?? [];
        saveCallsCount(resp?.data?.all_item ?? 0);

        setTelegramTypes(
          resp?.data?.type
            ? Object.entries(resp?.data?.type)?.map((v) => ({
                value: v[0],
                title: v[1],
              }))
            : []
        );
        setTelegramData(Array.isArray(orders) ? orders : [orders]);
      });
    }
  };

  const handleGetOrders = (isReset) => {
    if (XHOUSE_COMPANY_ID.includes(companyId)) {
      if ((!isLoading.current && !isAllPages) || isReset) {
        if (isReset) {
          listRef.current.scroll({ top: 0 });
          setSelected([]);
          currentPage.current = 0;
          setIsAllPages(false);
        }
        isLoading.current = true;
        setLoading(true);

        const sendData = {
          filters: isFilter.current
            ? {
                ...Object.fromEntries(
                  Object.entries(filters)?.filter((v) => v[1])
                ),
                ...(removePhoneMask(filters?.search_phone)?.length > 0
                  ? [{ search_phone: removePhoneMask(filters?.search_phone) }]
                  : []),
                date_from: filters?.date_from
                  ? handleFormatFilterDate(filters?.date_from, true)
                  : undefined,
                date_to: filters?.date_to
                  ? handleFormatFilterDate(filters?.date_to)
                  : undefined,
              }
            : {
                date_from: Math.floor(getFirstDay(true).getTime() / 1000),
                date_to: Math.floor(new Date().getTime() / 1000),
              },
          current_page: currentPage.current,
        };

        if (currentPage.current === 0 || isReset) {
          setOrders([]);
        }

        getOrders(sendData).then((resp) => {
          isLoading.current = false;
          setLoading(false);
          const ordersResp = resp?.data?.data ?? [];
          const types = resp?.data?.type;
          const formatedOrdersResp = ordersResp?.map((o) => ({
            ...o,
            type: types[o?.type],
          }));

          setOrdersTypes(types);
          setIsAllPages(ordersResp?.length === 0);
          handleResponse(
            resp,
            () => {
              setOrders(
                isReset
                  ? formatedOrdersResp
                  : [...checkIsArray(orders), ...formatedOrdersResp]
              );
              saveCallsCount(resp?.data?.all_item ?? 0);
              const respItemsCount = resp?.data?.data?.length;
              const updatedCount = isReset
                ? respItemsCount
                : allCountRef.current + respItemsCount;
              allCountRef.current = updatedCount;
              setAllCount(updatedCount);
            },
            () => {
              setIsAllPages(true);
              if (isReset) {
                setOrders([]);
                //   saveCallsCount(0);
                allCountRef.current = 0;
                setAllCount(0);
              }
            }
          );
        });
      }
    }
  };

  useEffect(() => {
    if (activeType === "site") {
      handleGetOrders(true);
    } else if (activeType === "telegram") {
      handleGetgetTelegramOrders();
    }
  }, [activeType]);

  const handleGetCalls = (isReset) => {
    if (
      ((!isLoading.current && !isAllPages) || isReset) &&
      activeType === "phone"
    ) {
      if (isReset) {
        listRef.current.scroll({ top: 0 });
        setSelected([]);
        currentPage.current = 0;
        setIsAllPages(false);
      }
      isLoading.current = true;
      setLoading(true);

      const sendData = {
        filters: isFilter.current
          ? {
              ...filters,
              search_phone:
                removePhoneMask(filters?.search_phone)?.length > 0
                  ? removePhoneMask(filters?.search_phone)
                  : undefined,
              date_from: filters?.date_from
                ? handleFormatFilterDate(filters?.date_from, true)
                : undefined,
              date_to: filters?.date_to
                ? handleFormatFilterDate(filters?.date_to)
                : undefined,
            }
          : {
              date_from: Math.floor(getFirstDay(true).getTime() / 1000),
              date_to: Math.floor(new Date().getTime() / 1000),
            },
        current_page: currentPage.current,
      };

      if (currentPage.current === 0 || isReset) {
        setData([]);
        getCalls({ ...sendData, only_count_item: "1" }).then((resp) =>
          saveCallsCount(Number(resp?.data?.all_item ?? 0))
        );
      }

      getCalls(sendData).then((resp) => {
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
            // saveCallsCount(resp?.data?.all_item ?? 0);
            const respItemsCount = resp?.data?.data?.length;
            const updatedCount = isReset
              ? respItemsCount
              : allCountRef.current + respItemsCount;
            allCountRef.current = updatedCount;
            setAllCount(updatedCount);
          },
          () => {
            setIsAllPages(true);
            if (isReset) {
              setData([]);
              //   saveCallsCount(0);
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

    if (activeType === "phone") {
      handleGetCalls();
    }

    if (activeType === "site") {
      handleGetOrders();
    }
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
  }, [listRef, isLoading.current, isAllPages, data, activeType, orders]);

  const handleSetCallStatus = (id_call, status) => {
    setCallStatus({ id_call, status }).then((resp) =>
      handleResponse(resp, () => {
        setData(data?.filter((call) => call.id !== id_call));
        const updatedCount = allCountRef.current - 1;
        saveCallsCount(callsCount - 1);
        allCountRef.current = updatedCount;
        setAllCount(updatedCount);
        cogoToast.success("Статус успішно змінено!", {
          hideAfter: 3,
          position: "top-right",
        });
      })
    );
  };

  const handleAddComment = (id_call, comment, type, onSuccess) => {
    if (type === "telegram") {
      setTelegramOrderComment({ id_order: id_call, comment }).then((resp) =>
        handleResponse(resp, () => {
          handleResponse(resp, () => {
            cogoToast.success("Коментар успішно змінено!", {
              hideAfter: 3,
              position: "top-right",
            });
          });
          onSuccess && onSuccess();
          setTelegramData(
            telegramData?.map((call) =>
              call.id_order === id_call
                ? {
                    ...call,
                    comment: comment,
                    comment_date: handleFormatDate(new Date(), true),
                  }
                : call
            )
          );
        })
      );
    } else if (type === "site") {
      setOrderComment({ id_order: id_call, comment }).then((resp) =>
        handleResponse(resp, () => {
          handleResponse(resp, () => {
            cogoToast.success("Коментар успішно змінено!", {
              hideAfter: 3,
              position: "top-right",
            });
          });
          onSuccess && onSuccess();
          setOrders(
            orders?.map((call) =>
              call.id === id_call
                ? {
                    ...call,
                    comment: comment,
                    comment_date: handleFormatDate(new Date(), true),
                  }
                : call
            )
          );
        })
      );
    } else {
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
              call.id === id_call
                ? {
                    ...call,
                    coment: comment,
                    comment_date: handleFormatDate(new Date(), true),
                  }
                : call
            )
          );
        })
      );
    }
  };

  const handleApplyFilter = (isApply) => {
    currentPage.current = 0;
    isFilter.current = isApply;
    if (isApply) {
      localStorage.setItem("callsFilter", JSON.stringify(filters));
      setActiveType(editActiveType);
    } else {
      setFilters(INIT_FILTERS);
      localStorage.removeItem("callsFilter");
      setShowTelegram(false);
      setActiveType(undefined);
      setEditActiveType(undefined);
      localStorage.setItem("callsActiveType", "empty");
    }
    activeType === "phone"
      ? handleGetCalls(true)
      : activeType === "site"
      ? handleGetOrders(true)
      : handleGetgetTelegramOrders();
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
      const updatedCount = allCountRef.current - selected?.length;
      saveCallsCount(callsCount - selected?.length);
      allCountRef.current = updatedCount;
      setAllCount(updatedCount);
    });
  };

  useEffect(() => {
    const filterApply = location?.search?.split("=")[0];
    if (filterApply === "?view") {
      setFilters({
        view: "0",
        type_call: [],
        call_my_struct: undefined,
        status: undefined,
      });
      setIsDefaultFilterSet(true);
    } else if (filterApply === "?telegram") {
      setFilters(INIT_FILTERS);
      setShowTelegram("show");
      setIsDefaultFilterSet(true);
    } else {
      handleGetCalls(true);
    } // eslint-disable-next-line
  }, [location.search]);

  useEffect(() => {
    if (isFirstLoad.current && isDefaultFilterSet) {
      const filterApply = location?.search?.split("=")[0];
      isFirstLoad.current = false;
      isFilter.current = !!filterApply;
      handleGetCalls(true);
    } // eslint-disable-next-line
  }, [isDefaultFilterSet]);

  const handleSelectAll = (isReset, count) => {
    setSelected(isReset ? [] : data?.map((c) => c.id));
  };

  const handleSendCliens = (ids = []) => {
    setSelected([]);
    setData(data?.filter((d) => !ids.find((s) => s === d.client_id)));
  };

  const handleSendCalls = () => {
    setData(data?.filter((d) => !selected.find((s) => s === d.id)));
    setSelected([]);
  };

  const handleClientAdded = (id_call, callData) => {
    setData(
      data?.map((call) =>
        call.id === id_call ? { ...call, ...callData } : call
      )
    );
  };

  const handleToggleTelegramOrderStatus = (id) => {
    setTelegramData(
      telegramData.map((o) =>
        o.id_order === id ? { ...o, status: o?.status === "1" ? "0" : "1" } : o
      )
    );
  };

  const handleToggleOrderStatus = (id) => {
    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status: o?.status === "1" ? "0" : "1" } : o
      )
    );
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
        allCount={
          allCount + (activeType === "telegram" ? telegramData?.length : 0)
        }
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
        showTelegram={activeType === "telegram"}
        telegramCalls={
          telegramData
            ?.filter((c) => selected?.includes(c.id_order))
            ?.map((c) => c?.id_order) ?? []
        }
        orders={
          orders?.filter((c) => selected?.includes(c.id))?.map((c) => c?.id) ??
          []
        }
        refreshTelegramCalls={handleGetgetTelegramOrders}
        activeType={editActiveType}
        onChangeActiveType={handleChangeActiveType}
        ordersTypes={ordersTypes}
        telegramTypes={telegramTypes}
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
        onAddClient={handleClientAdded}
        telegramData={telegramData}
        showTelegram={showTelegram || filters?.type_call?.length === 0}
        refreshTelegramCalls={handleGetgetTelegramOrders}
        onToggleTelegramOrderStatus={handleToggleTelegramOrderStatus}
        onToggleOrderStatus={handleToggleOrderStatus}
        orders={orders}
        refreshOrders={handleGetOrders}
        activeType={activeType}
      />
    </StyledCalls>
  );
};

const StyledCalls = styled.div`
  position: relative;
  padding: 15px 20px;
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  @media (max-width: 600px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
  }
  @media (max-width: 500px) {
    padding: 10px;
    margin-left: -10px;
  }
`;

export default Calls;
