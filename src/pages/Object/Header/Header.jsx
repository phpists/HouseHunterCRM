import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { SaveButton } from "./SaveButton";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import { ReactComponent as RestoreIcon } from "../../../assets/images/refresh-icon.svg";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleCheckAccess, handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import {
  useLazyAddToFavoritesQuery,
  useLazyDeleteObjectQuery,
  useLazyRestoreObjectsQuery,
} from "../../../store/objects/objects.api";
import { ToClientButton } from "./ToClientButton";
import { useAppSelect } from "../../../hooks/redux";
import { DownloadButton } from "./DownloadButton";
import { Id } from "../../../components/Id";

export const Header = ({
  onSave,
  favorite,
  onToggleFavorite,
  loading,
  isDeleted,
  onChangeRestoreObject,
  isData,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteObject] = useLazyDeleteObjectQuery();
  const [addToFavorites] = useLazyAddToFavoritesQuery();
  const { accessData, user } = useAppSelect((state) => state.auth);
  const [restoreObjects] = useLazyRestoreObjectsQuery();

  const handleDeleteRequest = () => {
    deleteObject({
      id_objects: [id],
      final_remove: isDeleted ? "1" : undefined,
    }).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Об'єкт успішно видалено!", {
          hideAfter: 3,
          position: "top-right",
        });
        if (isDeleted) {
          navigate("/objects");
        } else {
          onChangeRestoreObject("1");
        }
      })
    );
  };

  const handleToggleFavorites = () => {
    if (id) {
      addToFavorites([id]).then((resp) => {
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

  const handleRestoreObject = () => {
    restoreObjects([id]).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success(`Oб'єкт успішно відновлено`, {
          hideAfter: 3,
          position: "top-right",
        });
        onChangeRestoreObject("0");
      })
    );
  };

  return (
    <>
      {deleteModal && (
        <Confirm
          title={isDeleted ? "Видалити об'єкт остаточно?" : "Видалити об'єкт?"}
          onClose={() => setDeleteModal(false)}
          onSubmit={handleDeleteRequest}
          passwordCheck={isDeleted}
        />
      )}
      <StyledHeader className="flex items-center justify-between">
        <BackButton />
        <div className="btns-header flex items-center">
          {!isData ? null : isDeleted ? (
            <>
              <ToClientButton />
              <IconButton
                Icon={RestoreIcon}
                className="icon-btn restore"
                onClick={handleRestoreObject}
              />
              {user?.struct_level === 1 && (
                <IconButton
                  Icon={RemoveIcon}
                  className="icon-btn remove-btn"
                  onClick={() => setDeleteModal(true)}
                />
              )}
            </>
          ) : (
            <>
              <SaveButton onClick={onSave} loading={loading} />
              {/* <SendClientButton /> */}
              <ToClientButton />
              {id ? (
                <>
                  <DownloadButton />
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
                  <Id id={id} />
                </>
              ) : null}
            </>
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
    border: 1.4px solid var(--bg-20) !important;
    &:hover {
      border: 1.4px solid rgba(255, 255, 255, 0) !important;
    }
  }
  .restore {
    path {
      opacity: 0.5;
      transition: all 0.3s;
    }
    &:hover {
      path {
        opacity: 1;
      }
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
