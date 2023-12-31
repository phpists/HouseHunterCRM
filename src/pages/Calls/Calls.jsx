import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useEffect, useState } from "react";
import {
  useLazyAddCommentToCallQuery,
  useLazyGetCallsQuery,
  useLazySetStatusCallQuery,
} from "../../store/calls/calls.api";
import { handleResponse } from "../../utilits";
import { useActions } from "../../hooks/actions";
import cogoToast from "cogo-toast";

const INIT_FILTERS = {
  search_key: "",
  //   id_worker_Search: "",
  type_call: [],
  call_my_struct: undefined,
  status: "0",
  date_from: new Date().getTime() / 1000 - 2629743,
  date_to: new Date().getTime() / 1000,
  view: "0",
};

export const Calls = () => {
  const [getCalls] = useLazyGetCallsQuery();
  const [setCallStatus] = useLazySetStatusCallQuery();
  const [addComment] = useLazyAddCommentToCallQuery();
  const { saveCallsCount } = useActions();
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState(INIT_FILTERS);

  const handleChangeFilter = (fieldName, value) => {
    setFilters({ ...filters, [fieldName]: value });
  };

  const handleSelect = (index) =>
    setSelected(
      !!selected.find((i) => i === index)
        ? selected.filter((i) => i !== index)
        : [...selected, index]
    );

  const handleGetCalls = (isApplyFilter) => {
    getCalls({ filters: isApplyFilter ? filters : undefined }).then((resp) => {
      setData(resp?.data?.data ?? null);
      saveCallsCount(resp?.data?.all_item ?? 0);
    });
  };

  useEffect(() => {
    handleGetCalls(false);
  }, []);

  const handleUpdateCall = (id, field, value) =>
    setData(data?.filter((call) => call.id !== id));

  const handleSetCallStatus = (id_call, status) => {
    setCallStatus({ id_call, status }).then((resp) =>
      handleResponse(resp, () => {
        handleUpdateCall(id_call, "status", status);
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
        handleUpdateCall(id_call, "coment", comment);
      })
    );
  };

  const handleApplyFilter = (isApply) => {
    handleGetCalls(isApply);
    !isApply && setFilters(INIT_FILTERS);
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
    });
  };

  return (
    <StyledCalls>
      <Header
        selectedCount={selected.length}
        filters={filters}
        onChangeFilter={handleChangeFilter}
        onApplyFilter={handleApplyFilter}
        onSetCallsStatus={handleSetCallsStatus}
      />
      <List
        selected={selected}
        onSelect={handleSelect}
        data={data ?? []}
        onSetStatus={handleSetCallStatus}
        onAddComment={handleAddComment}
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
