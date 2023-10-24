import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useState } from "react";
import {
  useLazyGetRequestsCountQuery,
  useLazyGetRequestsQuery,
} from "../../store/requests/requests.api";
import { useEffect } from "react";
import { useActions } from "../../hooks/actions";
import { useRef } from "react";
import { handleResponse } from "../../utilits";

export const Requests = () => {
  const [getRequestsCount] = useLazyGetRequestsCountQuery();
  const [getRequests] = useLazyGetRequestsQuery();
  const { saveRequestsCount } = useActions();
  const [requests, setRequests] = useState([]);
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const [isAllPages, setIsAllPages] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

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
  }, []);

  const handleGetRequests = (isReset) => {
    if (!isLoading.current && !isAllPages) {
      isLoading.current = true;
      getRequests({
        current_page: currentPage.current,
        item_on_page: 10,
        only_favorite: isFavorite ?? undefined,
      }).then((resp) => {
        isLoading.current = false;
        handleResponse(
          resp,
          () => {
            if (Object.entries(resp?.data)?.length) {
              setRequests(
                isReset ? resp?.data : { ...requests, ...resp?.data }
              );
            }
          },
          () => setIsAllPages(true),
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
    handleGetRequests();
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.addEventListener("scroll", handleScroll);
      return () =>
        listRef.current &&
        listRef.current.removeEventListener("scroll", handleScroll);
    }
  }, [listRef, isLoading.current, isAllPages, requests]);

  useEffect(() => {
    handleGetRequests();
  }, []);

  const handleDeleteRequestsSuccess = () => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).filter(
          (req) => !selected.find((s) => s === req[0])
        )
      )
    );
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
          if (req[0] === id) {
            let request = [];
            request[0] = req[0];
            request[1] = { ...req[1], favorite: !req[1]?.favorite };
            return request;
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
          if (!!selected.find((s) => s === req[0])) {
            let request = [];
            request[0] = req[0];
            request[1] = { ...req[1], favorite: !req[1]?.favorite };
            return request;
          }
          return req;
        })
      )
    );
    setSelected([]);
  };

  useEffect(() => {
    handleGetRequests(true);
  }, [isFavorite]);

  return (
    <StyledRequests>
      <Header
        selectedCount={selected.length}
        onDelete={handleDeleteRequestsSuccess}
        selected={selected}
        onFavorite={handleToggleFavoritesStatus}
        isFavorite={isFavorite}
        onIsFavotite={() => setIsFavorite(!isFavorite)}
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
