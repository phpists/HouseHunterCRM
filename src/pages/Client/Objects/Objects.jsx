import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Actions } from "./Actions/Actions";
import { Card } from "./Card/Card";
import { useState } from "react";
import { ObjectModal } from "./ObjectModal";
import { MobileHeader } from "./MobileHeader/MobileHeader";
import { SelectItems } from "../../../components/SelectItems/SelectItems";
import { useLazyGetClientsRequestQuery } from "../../../store/clients/clients.api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useLazyDeleteRequestQuery } from "../../../store/requests/requests.api";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";

export const Objects = ({ selected, onSelect }) => {
  const { id } = useParams();
  const [requests, setRequests] = useState([]);
  const [getClientsRequests, { data: requestsData }] =
    useLazyGetClientsRequestQuery();
  const [openInfo, setOpenInfo] = useState(false);
  const requestsCurrentPage = useRef(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteRequest] = useLazyDeleteRequestQuery();

  const handleGetClientsRequests = () => {
    getClientsRequests({
      current_page: requestsCurrentPage.current,
      item_on_page: 40,
      id_client: id,
    }).then((resp) => {
      const data = resp?.data?.data;
      onSelect(Object.entries(data)[0][1]?.id ?? null);
      setRequests(data);
    });
  };
  useEffect(() => {
    handleGetClientsRequests();
  }, []);

  const handleDeleteRequestSuccess = (id) => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).filter((req) => id !== req[1]?.id)
      )
    );
  };

  const handleToggleFavoriteStatus = (id) => {
    setRequests(
      Object.fromEntries(
        Object.entries(requests).map((req) => {
          if (req[1]?.id === id) {
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

  const handleCancelDeleteRequest = () => {
    setDeleteModal(false);
  };

  const handleOnDeleteRequest = (id) => {
    setDeleteModal(true);
    setSelectedCard(id);
  };

  const handleDeleteRequest = () => {
    deleteRequest([selectedCard]).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Заявку успішно видалено!", {
          hideAfter: 3,
          position: "top-right",
        });
        handleDeleteRequestSuccess(selectedCard);
        setSelectedCard(null);
      })
    );
  };

  return (
    <StyledObjects>
      {openInfo && (
        <ObjectModal onClose={() => setOpenInfo(false)} id={selected} />
      )}
      {deleteModal && (
        <Confirm
          title="Видалити запит?"
          onClose={handleCancelDeleteRequest}
          onSubmit={handleDeleteRequest}
        />
      )}
      <Header requestsCount={0} />
      <div className="objects-content hide-scroll">
        <Actions />
        <MobileHeader />
        <SelectItems title="запитів" className="mobile-select" />
        {requests && Object.entries(requests)?.length
          ? Object.entries(requests).map((c, i) => (
              <Card
                key={1}
                selected={selected === c[1]?.id}
                onSelect={() => onSelect(c[1]?.id)}
                onOpenInfo={() => setOpenInfo(true)}
                date={c[1]?.dt_add}
                title={c[1]?.rubric}
                location={c[1]?.location}
                price={c[1]?.price_min}
                id={c[1]?.id}
                favorite={c[1]?.favorite}
                onChangeFavorite={() => handleToggleFavoriteStatus(c[1]?.id)}
                onDelete={() => handleOnDeleteRequest(c[1]?.id)}
              />
            ))
          : null}
      </div>
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  border-radius: 15px;
  background: #2b2b2b;
  .objects-content {
    padding: 10px;
    height: calc(100svh - 287px);
    overflow: auto;
  }
  .mobile-select {
    display: none;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  @media (max-width: 1400px) {
    .objects-content {
      height: auto;
    }
  }
  @media (max-width: 700px) {
    background: none;
    .mobile-select {
      display: flex;
    }
    .objects-content {
      padding: 0;
    }
  }
`;
