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
  useLazySetStatusTelegramOrderQuery,
  useLazySetTelegramCommentOrderQuery,
} from "../../store/calls/calls.api";
import {
  checkIsArray,
  checkIsJSON,
  getFirstDay,
  handleFormatDate,
  handleResponse,
  removePhoneMask,
  showAlert,
} from "../../utilits";
import { useActions } from "../../hooks/actions";
import { useLocation } from "react-router-dom";
import { useAppSelect } from "../../hooks/redux";

const INIT_FILTERS = {
  search_key: "",
  //   id_worker_Search: "",
  call_my_struct: undefined,
  status: "0",
  date_from: Math.floor(getFirstDay(true, false, 7).getTime() / 1000),
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
  const [setTelegramOrderStatus] = useLazySetStatusTelegramOrderQuery();

  const handleChangeFilter = (fieldName, value, isUpdate) => {
    if (isUpdate) {
      setFilters(value);
    } else if (fieldName === "type_call") {
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

  useEffect(() => {
    setAllCount(data?.length);
  }, [data]);

  const handleGetgetTelegramOrders = () => {
    const sendData = {
      filters: isFilter.current
        ? {
            ...filters,
            ...(filters?.type_call?.length > 0
              ? [{ type_call: filters?.type_call }]
              : []),
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
      const data = resp?.data?.data ?? [];
      saveCallsCount(resp?.data?.all_item ?? 0);

      setTelegramTypes(
        resp?.data?.type
          ? Object.entries(resp?.data?.type)?.map((v) => ({
              value: v[0],
              title: v[1],
            }))
          : []
      );
      const telegramData = Array.isArray(data) ? data : [data];
      setData(telegramData?.map((a) => ({ ...a, id: a?.id_order ?? a?.id })));
    });
  };

  const handleGetOrders = (isReset) => {
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
              ...(filters?.type_call?.length > 0
                ? [{ type_call: filters?.type_call }]
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
        setData([]);
      }

      getOrders(sendData).then((resp) => {
        isLoading.current = false;
        setLoading(false);
        const ordersResp = resp?.data?.data ?? [];
        const types = resp?.data?.type;
        const formatedOrdersResp = ordersResp?.map((o) => ({
          ...o,
          type: o?.type === "1" ? "Запит на пошук" : types[o?.type],
        }));

        setOrdersTypes(types);
        setIsAllPages(ordersResp?.length === 0);
        handleResponse(
          resp,
          () => {
            setData(
              isReset
                ? formatedOrdersResp
                : [...checkIsArray(data), ...formatedOrdersResp]
            );
            saveCallsCount(resp?.data?.all_item ?? 0);
            const respItemsCount = resp?.data?.data?.length;
            const updatedCount = isReset
              ? respItemsCount
              : allCountRef.current + respItemsCount;
            allCountRef.current = updatedCount;
          },
          () => {
            setIsAllPages(true);
            if (isReset) {
              setData([]);
              //   saveCallsCount(0);
              allCountRef.current = 0;
              setAllCount(0);
            }
          },
          true
        );
      });
    }
  };

  useEffect(() => {
    currentPage.current = 0;
    if (activeType === "site") {
      handleGetOrders(true);
    } else if (activeType === "telegram") {
      handleGetgetTelegramOrders();
    } else {
      handleGetCalls();
    }
  }, [activeType]);

  const handleGetCalls = (isReset) => {
    if (
      ((!isLoading.current && !isAllPages) || isReset) &&
      editActiveType === "phone"
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
              ...(filters?.type_call?.length > 0
                ? [{ type_call: filters?.type_call }]
                : []),
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
              date_from: Math.floor(
                getFirstDay(true, false, 7).getTime() / 1000
              ),
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
          },
          () => {
            if (resp?.data?.error !== 0 && resp?.error !== 32) {
              //   showAlert("error", resp?.data?.messege ?? "Помилка");
            }
            setIsAllPages(true);
            if (isReset) {
              setData([]);
              //   saveCallsCount(0);
              allCountRef.current = 0;
              setAllCount(0);
            }
          },
          true
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
  }, [listRef, isLoading.current, isAllPages, data, activeType]);

  const handleSetCallStatus = (id_call, status) => {
    setCallStatus({ id_call, status }).then((resp) =>
      handleResponse(resp, () => {
        setData(data?.filter((call) => call.id !== id_call));
        const updatedCount = allCountRef.current - 1;
        saveCallsCount(callsCount - 1);
        allCountRef.current = updatedCount;
        showAlert("success", "Статус успішно змінено!");
      })
    );
  };

  const handleAddComment = (id_call, comment, type, onSuccess) => {
    if (type === "telegram") {
      setTelegramOrderComment({ id_order: id_call, comment }).then((resp) =>
        handleResponse(resp, () => {
          handleResponse(resp, () => {
            showAlert("success", "Коментар успішно змінено!");
          });

          onSuccess && onSuccess();
          setData(
            data?.map((call) =>
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
            showAlert("success", "Коментар успішно змінено!");
          });
          onSuccess && onSuccess();
          setData(
            data?.map((call) =>
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
            showAlert("success", "Коментар успішно змінено!");
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
      setActiveType("phone");
      setEditActiveType("phone");
      localStorage.setItem("callsActiveType", "phone");
    }

    editActiveType === "phone"
      ? handleGetCalls(true)
      : editActiveType === "site"
      ? handleGetOrders(true)
      : handleGetgetTelegramOrders();
  };

  const handleSetCallsStatus = (status) => {
    if (editActiveType === "phone") {
      Promise.all(
        selected?.map((id_call) =>
          setCallStatus({
            id_call,
            status,
          }).then((resp) => {
            handleResponse(resp, () => {
              showAlert("success", "Статус успішно змінено!");
            });
          })
        )
      ).then((resp) => {
        setData(data?.filter((call) => !selected.find((s) => s === call?.id)));
        const updatedCount = allCountRef.current - selected?.length;
        saveCallsCount(callsCount - selected?.length);
        allCountRef.current = updatedCount;
      });
    } else if (editActiveType === "site") {
    } else {
      Promise.all(
        selected?.map((id_call) =>
          setTelegramOrderStatus({ id_order: id_call, status }).then((resp) => {
            handleResponse(resp, () => {
              showAlert("success", "Статус успішно змінено!");
            });
          })
        )
      ).then((resp) => {
        setData(data?.filter((call) => !selected.find((s) => s === call?.id)));
        saveCallsCount(callsCount - selected?.length);
        setSelected([]);
      });
    }
  };

  useEffect(() => {
    const filterApply = location?.search?.split("=")[0];
    setIsDefaultFilterSet(false);
    isFirstLoad.current = true;
    if (filterApply === "?view") {
      setActiveType("phone");
      setEditActiveType("phone");
      setFilters({
        status: "0",
        date_from: Math.floor(getFirstDay(true, true, 7).getTime() / 1000),
        date_to: Math.floor(new Date().getTime() / 1000),
      });
      setIsDefaultFilterSet(true);
    } else if (filterApply === "?telegram") {
      setActiveType("telegram");
      setEditActiveType("telegram");
      setFilters({
        status: "0",
        date_from: Math.floor(getFirstDay(true, true, 7).getTime() / 1000),
        date_to: Math.floor(new Date().getTime() / 1000),
      });
      setShowTelegram("show");
      setIsDefaultFilterSet(true);
    } else if (filterApply === "?site") {
      setActiveType("site");
      setEditActiveType("site");
      setFilters({
        status: "0",
        date_from: Math.floor(getFirstDay(true, true, 7).getTime() / 1000),
        date_to: Math.floor(new Date().getTime() / 1000),
      });
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
    setData(data.filter((o) => o.id_order !== id));
  };

  const handleToggleOrderStatus = (id) => {
    setData(data.filter((o) => o.id !== id));
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
        showTelegram={activeType === "telegram"}
        telegramCalls={
          data
            ?.filter((c) => selected?.includes(c.id_order))
            ?.map((c) => c?.id_order) ?? []
        }
        orders={
          data?.filter((c) => selected?.includes(c.id))?.map((c) => c?.id) ?? []
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
        showTelegram={showTelegram || filters?.type_call?.length === 0}
        refreshTelegramCalls={handleGetgetTelegramOrders}
        onToggleTelegramOrderStatus={handleToggleTelegramOrderStatus}
        onToggleOrderStatus={handleToggleOrderStatus}
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
