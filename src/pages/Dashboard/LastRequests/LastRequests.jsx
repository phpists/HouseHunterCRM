import styled from "styled-components";
import { Title } from "./Title";
import { RequestCard } from "./RequestCard/RequestCard";
import { useEffect, useState } from "react";
import {
  useGetRubricsQuery,
  useLazyGetLastRequestsQuery,
} from "../../../store/requests/requests.api";
import { handleResponse } from "../../../utilits";

export const LastRequests = () => {
  const [getRequests] = useLazyGetLastRequestsQuery();
  const [requests, setRequests] = useState({});
  const { data: rubricsList } = useGetRubricsQuery();

  const handleGetRequests = () => {
    getRequests().then((resp) => {
      handleResponse(
        resp,
        () => {
          if (Object.entries(resp?.data?.data)?.length) {
            setRequests(resp?.data?.data);
          }
        },
        () => {
          setRequests({});
        },
        true
      );
    });
  };

  useEffect(() => {
    handleGetRequests();
    // eslint-disable-next-line
  }, []);

  return (
    <StyledLastRequests>
      <Title />
      <div className="list hide-scroll">
        {requests && Object.entries(requests)?.length
          ? Object.entries(requests)?.map((d, i) => {
              if (typeof d !== "object") {
                return null;
              }

              const id = Object.entries(d[1])?.filter(
                (r) => r[0] !== "General_field_group"
              )[0][0];
              const generalFields = d[1]?.General_field_group ?? {};
              const requestData = Object.entries(d[1])?.filter(
                (r) => r[0] !== "General_field_group"
              )[0][1];

              return (
                <RequestCard
                  key={i}
                  data={{
                    ...requestData,
                    ...generalFields,
                    rubric_name:
                      rubricsList?.find((r) => r.id === requestData?.id_rubric)
                        ?.name ?? "-",
                  }}
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
