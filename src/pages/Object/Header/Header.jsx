import { styled } from "styled-components";
import { BackButton } from "./BackButton";
import { SaveButton } from "./SaveButton";
import { IconButton } from "../../../components/IconButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import { ReactComponent as RestoreIcon } from "../../../assets/images/refresh-icon.svg";
import { ReactComponent as DeleteInfoIcon } from "../../../assets/images/delete-info.svg";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleCheckAccess, handleResponse, showAlert } from "../../../utilits";
import {
  useLazyAddToFavoritesQuery,
  useLazyDeleteObjectQuery,
  useLazyRestoreObjectsQuery,
} from "../../../store/objects/objects.api";
import { ToClientButton } from "./ToClientButton";
import { useAppSelect } from "../../../hooks/redux";
import { DownloadButton } from "./DownloadButton";
import { Id } from "../../../components/Id";
import { DeleteInfo } from "../../../components/DeleteInfo/DeleteInfo";
import { MlsButton } from "./MlsButton";

export const Header = ({
  onSave,
  favorite,
  onToggleFavorite,
  loading,
  isDeleted,
  onChangeRestoreObject,
  isData,
  reasonRemove,
  mls,
  onToggleMls,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteObject] = useLazyDeleteObjectQuery();
  const [addToFavorites] = useLazyAddToFavoritesQuery();
  const { accessData, user } = useAppSelect((state) => state.auth);
  const [restoreObjects] = useLazyRestoreObjectsQuery();
  const [deleteInfo, setDeleteInfo] = useState(false);
  const [confirmText, setConfimText] = useState("");
  const [deleteReason, setDeleteReason] = useState(null);

  const handleDeleteRequest = () => {
    deleteObject({
      id_objects: [id],
      final_remove: isDeleted ? "1" : undefined,
      reasone_remove: confirmText,
    }).then((resp) =>
      handleResponse(resp, () => {
        setDeleteReason(confirmText);
        showAlert("success", "Автомобіль успішно видалено!");
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
          showAlert("success", "Автомобіль успішно видалено!");
        });
      });
    }
  };

  const handleRestoreObject = () => {
    restoreObjects([id]).then((resp) =>
      handleResponse(resp, () => {
        showAlert("success", "Oб'єкт успішно відновлено");
        onChangeRestoreObject("0");
        setDeleteReason(null);
      })
    );
  };

  useEffect(() => {
    setDeleteReason(reasonRemove);
  }, [reasonRemove]);

  return (
    <>
      {deleteModal && (
        <Confirm
          title={
            isDeleted ? "Видалити автомобільостаточно?" : "Видалити автомобіль?"
          }
          onClose={() => setDeleteModal(false)}
          onSubmit={handleDeleteRequest}
          passwordCheck={isDeleted}
          confirmText={isDeleted ? null : confirmText}
          onChangeConfirmText={(val) => setConfimText(val)}
        />
      )}
      {deleteInfo ? (
        <DeleteInfo onClose={() => setDeleteInfo(false)} text={deleteReason} />
      ) : null}
      <StyledHeader className="flex items-center justify-between">
        <BackButton />
        <div className="btns-header flex items-center">
          {!isData ? null : isDeleted ? (
            <>
              <ToClientButton />
              {deleteReason?.length > 0 ? (
                <IconButton
                  Icon={DeleteInfoIcon}
                  className="restore-btn icon-btn mr-2.5 restore "
                  onClick={() => setDeleteInfo(true)}
                />
              ) : null}
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
              <MlsButton onClick={onToggleMls} active={mls === "1"} />
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
