import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { SaveButton } from "./SaveButton";
import { SendClientButton } from "./SendClientButton";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleCheckAccess, handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import {
  useLazyAddToFavoritesQuery,
  useLazyDeleteObjectQuery,
} from "../../../store/objects/objects.api";
import { useGetAccessQuery } from "../../../store/auth/auth.api";

export const Header = ({ onSave, favorite, onToggleFavorite, loading }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteObject] = useLazyDeleteObjectQuery();
  const [addToFavorites] = useLazyAddToFavoritesQuery();
  const { accessData } = useGetAccessQuery();

  const handleDeleteRequest = () => {
    deleteObject([id]).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Заявку успішно видалено!", {
          hideAfter: 3,
          position: "top-right",
        });
        navigate("/objects");
      })
    );
  };

  const handleToggleFavorites = () => {
    if (id) {
      addToFavorites(id).then((resp) => {
        handleResponse(resp, () => {
          onToggleFavorite();
          cogoToast.success("Статус успішно змінено!", {
            hideAfter: 3,
            position: "top-right",
          });
        });
      });
    }
  };

  return (
    <>
      {" "}
      {deleteModal && (
        <Confirm
          title="Видалити об'єкт?"
          onClose={() => setDeleteModal(false)}
          onSubmit={handleDeleteRequest}
        />
      )}
      <StyledHeader className="flex items-center justify-between">
        <BackButton />
        <div className="btns-header flex items-center">
          <SaveButton onClick={onSave} loading={loading} />
          <SendClientButton />
          <IconButton
            Icon={StarIcon}
            className="icon-btn"
            onClick={handleToggleFavorites}
            active={favorite}
          />
          {handleCheckAccess(accessData, "objects", "delete") && (
            <IconButton
              Icon={RemoveIcon}
              className="icon-btn remove-btn"
              onClick={() => setDeleteModal(true)}
            />
          )}
        </div>
      </StyledHeader>
    </>
  );
};

const StyledHeader = styled.div`
  padding: 12px 38px 23px 2px;
  .remove-btn {
    margin-left: 10px;
  }
  .remove-btn:hover {
    path {
      fill: #fc4444;
    }
  }

  .icon-btn {
    border: 1.4px solid rgba(255, 255, 255, 0.2) !important;
    &:hover {
      border: 1.4px solid rgba(255, 255, 255, 0) !important;
    }
  }
  @media (max-width: 800px) {
    padding: 20px !important;
  }
  @media (max-width: 600px) {
    .btns-header {
      width: 100%;
    }
  }
`;
