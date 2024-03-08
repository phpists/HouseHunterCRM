import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { Title } from "./Title";
import { ActionButton } from "./ActionButton";
import { Divider } from "./Divider";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import {
  useLazyAddClientToFavoriteQuery,
  useLazyDeleteCientQuery,
} from "../../../store/clients/clients.api";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cogoToast from "cogo-toast";
import { handleCheckAccess, handleResponse } from "../../../utilits";
import { useGetAccessQuery } from "../../../store/auth/auth.api";
import { SendModal } from "../../Clients/SendModal";
import { useAppSelect } from "../../../hooks/redux";

export const Header = ({ favorite }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deleteClient] = useLazyDeleteCientQuery();
  const [deleteModal, setDeleteModal] = useState();
  const { accessData } = useAppSelect((state) => state.auth);
  const [addClientToFavorite] = useLazyAddClientToFavoriteQuery();
  const [status, setStatus] = useState(false);
  const [sendClient, setSendClient] = useState(null);

  const handleDeleteClient = () => {
    deleteClient({ id_client: [id] }).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success("Клієнта успішно видалено!", {
          hideAfter: 3,
          position: "top-right",
        });
        navigate("/clients");
      });
    });
  };

  const handleAddClientToFavorite = () => {
    addClientToFavorite(id).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success("Статус успішно обновлено", {
          hideAfter: 3,
          position: "top-right",
        });
        setStatus(!status);
      });
    });
  };

  useEffect(() => {
    setStatus(favorite);
  }, [favorite]);

  const handleSuccessSend = () => {
    navigate("/clients");
    setSendClient(null);
  };

  return (
    <>
      {deleteModal && (
        <Confirm
          title="Видалити клієнта?"
          onClose={() => setDeleteModal(false)}
          onSubmit={handleDeleteClient}
        />
      )}
      {sendClient ? (
        <SendModal
          onSendSuccess={handleSuccessSend}
          onClose={() => setSendClient(null)}
          clients={[sendClient]}
        />
      ) : null}
      <StyledHeader className="flex items-center justify-between">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/clients")}
        >
          <BackButton />
          <Title />
        </div>
        <div className="flex items-center">
          {/* <ActionButton
      title="Поставити задачу"
      onClick={null}
      className="mr-2.5 icon-btn"
    /> */}
          <ActionButton
            title="Передати кліента"
            smallTitle="Передати"
            onClick={() => setSendClient(id)}
            className="mr-2.5 icon-btn send-client-btn"
          />
          {/* <Divider /> */}
          <IconButton
            Icon={StarIcon}
            className="mr-2.5 icon-btn"
            onClick={handleAddClientToFavorite}
            active={status}
          />
          {handleCheckAccess(accessData, "clients", "delete") ? (
            <IconButton
              Icon={RemoveIcon}
              className="remove-btn icon-btn"
              onClick={() => setDeleteModal(true)}
            />
          ) : null}
        </div>
      </StyledHeader>
    </>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 15px;
  .remove-btn:hover {
    path {
      fill: #fc4444;
    }
  }
  @media (max-width: 700px) {
    .send-client-btn {
      width: 77px;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
    }
  }
`;
