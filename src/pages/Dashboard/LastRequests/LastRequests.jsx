import styled from "styled-components";
import { Title } from "./Title";
import { RequestCard } from "./RequestCard/RequestCard";
import { useEffect, useState } from "react";
import {
  useGetRubricsQuery,
  useLazyAddToFavoriteQuery,
  useLazyDeleteRequestQuery,
  useLazyGetLastRequestsQuery,
} from "../../../store/requests/requests.api";
import { handleResponse } from "../../../utilits";
import { Chat } from "../../../components/Chat/Chat";
import cogoToast from "cogo-toast";
import { retry } from "@reduxjs/toolkit/query";
import { Confirm } from "../../../components/Confirm/Confirm";

export const LastRequests = () => {
  const [getRequests] = useLazyGetLastRequestsQuery();
  const [requests, setRequests] = useState({});
  const { data: rubricsList } = useGetRubricsQuery();
  const [selectedChat, setSelectedChat] = useState(null);
  const [deleteRequest] = useLazyDeleteRequestQuery();
  const [addToFavorites] = useLazyAddToFavoriteQuery();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);

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

  const handleToggleFavorites = (idGroup, id) => {
    addToFavorites(idGroup).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success("Статус успішно змінено!", {
          hideAfter: 3,
          position: "top-right",
        });
        setRequests(
          Object.fromEntries(
            Object.entries(requests)?.map((r) => {
              if (r[0] === id) {
                return [
                  r[0],
                  {
                    ...r[1],
                    General_field_group: {
                      ...r[1]?.General_field_group,
                      favorite: !r[1]?.General_field_group?.favorite,
                    },
                  },
                ];
              }

              return r;
            })
          )
        );
      });
    });
  };

  const handleDelete = () => {
    deleteRequest({ id_groups: [deleteId?.id] }).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success(`Заявку успішно видалено!`, {
          hideAfter: 3,
          position: "top-right",
        });
        setRequests(
          Object.fromEntries(
            Object.entries(requests)?.filter((r) => r[0] !== deleteId?.id)
          )
        );
      });
    });
  };

  const handleOpenChat = (id_group, id) => {
    setSelectedChat(id_group);
    setRequests(
      Object.fromEntries(
        Object.entries(requests)?.map((r) => {
          if (r[0] === id) {
            return [
              r[0],
              {
                ...r[1],
                General_field_group: {
                  ...r[1]?.General_field_group,
                  new_messege: "0",
                },
              },
            ];
          }

          return r;
        })
      )
    );
  };
  return (
    <>
      {deleteModal && (
        <Confirm
          title="Видалити запит"
          onClose={() => setDeleteModal(false)}
          onSubmit={() => handleDelete()}
        />
      )}
      {selectedChat && (
        <Chat
          onClose={() => setSelectedChat(false)}
          requestObjectId={selectedChat}
        />
      )}

      <StyledLastRequests className="hide-scroll">
        <Title />
        <div className="list hide-scroll">
          {requests && Object.entries(requests)?.length
            ? Object.entries(requests)
                ?.slice(0, 3)
                ?.map((d, i) => {
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
                          rubricsList?.find(
                            (r) => r.id === requestData?.id_rubric
                          )?.name ?? "-",
                      }}
                      id={id}
                      onOpenChat={() =>
                        handleOpenChat(requestData?.id_group, d[0])
                      }
                      onToggleFavorite={() =>
                        handleToggleFavorites(requestData?.id_group, d[0])
                      }
                      onDelete={() => {
                        setDeleteModal(true);
                        setDeleteId({
                          idGroup: requestData?.id_group,
                          id: d[0],
                        });
                      }}
                    />
                  );
                })
            : null}
        </div>
      </StyledLastRequests>
    </>
  );
};

const StyledLastRequests = styled.div`
  padding: 20px;
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  .list {
    min-height: 200px;
    height: calc(100svh - 230px);
    max-height: 620px;
    overflow: auto;
    overflow-x: hidden;
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
  @media (max-width: 500px) {
    padding: 5px;
  }
`;
