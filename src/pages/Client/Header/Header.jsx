import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { Title } from "./Title";
import { ActionButton } from "./ActionButton";
import { Divider } from "./Divider";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import { useLazyDeleteCientQuery } from "../../../store/clients/clients.api";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cogoToast from "cogo-toast";

export const Header = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deleteClient] = useLazyDeleteCientQuery();
  const [deleteModal, setDeleteModal] = useState();

  const handleDeleteClient = () => {
    deleteClient({ id_client: [id] }).then((resp) => {
      if (resp?.data?.error === 0) {
        cogoToast.success("Клієнта успішно видалено!", {
          hideAfter: 3,
          position: "top-right",
        });
        navigate("/clients");
      } else if (resp?.data?.error) {
        cogoToast.error(resp?.data?.messege ?? "Помилка", {
          hideAfter: 3,
          position: "top-right",
        });
      }
    });
  };

  return (
    <StyledHeader className="flex items-center justify-between">
      {deleteModal && (
        <Confirm
          title="Видалити клієнта?"
          onClose={() => setDeleteModal(false)}
          onSubmit={handleDeleteClient}
        />
      )}
      <div className="flex items-center">
        <BackButton />
        <Title />
      </div>
      <div className="flex items-center">
        <ActionButton
          title="Поставити задачу"
          onClick={null}
          className="mr-2.5 icon-btn"
        />
        <ActionButton
          title="Передати кліента"
          smallTitle="Передати"
          onClick={null}
          className="icon-btn send-client-btn"
        />
        <Divider />
        <IconButton
          Icon={StarIcon}
          className="mr-2.5 icon-btn"
          onClick={null}
        />
        <IconButton
          Icon={RemoveIcon}
          className="remove-btn icon-btn"
          onClick={() => setDeleteModal(true)}
        />
      </div>
    </StyledHeader>
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
