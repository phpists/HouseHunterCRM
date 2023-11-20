import styled from "styled-components";
import { Title } from "./Title";
import { RequestCard } from "./RequestCard/RequestCard";
import { useEffect, useState } from "react";
import { useLazyGetRequestsQuery } from "../../../store/requests/requests.api";
import { handleResponse } from "../../../utilits";

export const LastRequests = () => {
  const [getRequests] = useLazyGetRequestsQuery();
  const [requests, setRequests] = useState([]);

  const handleGetRequests = () => {
    getRequests({ current_page: 0, item_on_page: 15 }).then((resp) => {
      handleResponse(
        resp,
        () => {
          if (Object.entries(resp?.data)?.length) {
            setRequests(resp?.data);
          }
        },
        () => {
          setRequests([]);
        },
        true
      );
    });
  };

  useEffect(() => {
    handleGetRequests();
  }, []);

  return (
    <StyledLastRequests>
      <Title />
      <div className="list hide-scroll">
        {requests?.requests && Object.entries(requests?.requests)?.length
          ? Object.entries(requests?.requests)?.map((d, i) => {
              if (typeof d !== "object") {
                return null;
              }

              const id = Object.entries(d[1])[0][0];
              const generalFields = requests[d[0]] ?? {};
              const requestData = d[1];

              return (
                <RequestCard
                  key={i}
                  data={{ ...requestData, ...generalFields }}
                  id={id}
                />
              );
            })
          : null}
      </div>
    </StyledLastRequests>
  );
};

const StyledLastRequests = styled.div`
  padding: 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  .list {
    min-height: 200px;
    height: calc(100svh - 230px);
    max-height: 620px;
    overflow: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: max-content;
    gap: 10px;
  }
  @media (max-width: 1100px) {
    .list {
      max-height: max-content;
      height: max-content;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 800px) {
    .list {
      grid-template-columns: 1fr;
    }
  }
`;
