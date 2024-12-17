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
import { handleResponse, showAlert } from "../../../utilits";
import { Chat } from "../../../components/Chat/Chat";
import { Confirm } from "../../../components/Confirm/Confirm";

export const LastRequests = () => {
  const [getRequests] = useLazyGetLastRequestsQuery();
  const [requests, setRequests] = useState({
    "8560b429c68dadfaaea7b0651a920a05": {
      General_field_group: {
        show_street_base: "1",
        mls: "0",
        structure: "0",
        not_actual: "0",
        folder_empty: "0",
        stop_showing: "0",
        dt_deadline: "1730109978",
        cl_fullname: "Новий клієнт ",
        dt_add: "1730110967",
        client_hash: "df71d048fef15bc51ac5367d2347a05f",
        favorite: false,
        count_object: "4218",
        dt_view_client: "",
        countLike: 0,
        countDislike: 0,
        new_messege: null,
      },
      e127dbc63b2277f87d3f913d2accbc56: {
        id_request: "e127dbc63b2277f87d3f913d2accbc56",
        id_group: "8560b429c68dadfaaea7b0651a920a05",
        id_rubric: "57",
        id_location: '["43"]',
        id_location_street: "0",
        type_obj_house: "0",
        type_obj_apartment: "0",
        type_obj_commerce: "0",
        type_obj_garage: "0",
        type_obj_hotel: "0",
        type_obj_land: "0",
        price_min: "0",
        price_max: "0",
        room_min: "0",
        address_storey: "0",
        storey_count: "0",
        area_total_min: "0",
        area_total_max: "0",
        area_plot_sotka_min: "0",
        area_plot_sotka_max: "0",
        price_currency: "1",
        price_for: "4",
      },
    },
  });
  const { data: rubricsList } = useGetRubricsQuery();
  const [selectedChat, setSelectedChat] = useState(null);
  const [deleteRequest] = useLazyDeleteRequestQuery();
  const [addToFavorites] = useLazyAddToFavoriteQuery();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);

  //   const handleGetRequests = () => {
  //     getRequests().then((resp) => {
  //       handleResponse(
  //         resp,
  //         () => {
  //           if (Object.entries(resp?.data?.data)?.length) {
  //             setRequests(resp?.data?.data);
  //           }
  //         },
  //         () => {
  //           setRequests({});
  //         },
  //         true
  //       );
  //     });
  //   };

  //   useEffect(() => {
  //     handleGetRequests();
  //     // eslint-disable-next-line
  //   }, []);

  const handleToggleFavorites = (idGroup, id) => {
    addToFavorites(idGroup).then((resp) => {
      handleResponse(resp, () => {
        showAlert("success", "Статус успішно змінено");

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
        showAlert("success", "Заявку успішно видалено!");
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
