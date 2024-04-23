import { styled } from "styled-components";
import { SaveButton } from "./SaveButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import { ReactComponent as RestoreIcon } from "../../../assets/images/refresh-icon.svg";
import { IconButton } from "../../../components/IconButton";
import { Title } from "./Title";
import { Button } from "./Button";
import { MoreButton } from "./MoreButton/MoreButton";
import {
  useLazyAddToFavoriteQuery,
  useLazyDeleteRequestQuery,
  useLazyRestoreRequestsQuery,
} from "../../../store/requests/requests.api";
import { useState } from "react";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useNavigate, useParams } from "react-router-dom";
import { handleCheckAccess, handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { BackButton } from "../../../components/BackButton";
import { useAppSelect } from "../../../hooks/redux";
import { Id } from "../../../components/Id";

export const Header = ({
  onSave,
  favorite,
  onToggleFavorite,
  data,
  onChangeField,
  loading,
  isDeleted,
  onToggleDeleted,
  isDataLoading,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addToFavorites] = useLazyAddToFavoriteQuery();
  const [deleteRequest] = useLazyDeleteRequestQuery();
  const [restoreRequests] = useLazyRestoreRequestsQuery();
  const [deleteModal, setDeleteModal] = useState(false);
  const { accessData, user } = useAppSelect((state) => state.auth);

  const handleDeleteRequest = () => {
    deleteRequest({
      id_groups: [id],
      final_remove: isDeleted ? "1" : undefined,
    }).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Запит успішно видалено!", {
          hideAfter: 3,
          position: "top-right",
        });
        isDeleted ? navigate("/requests") : onToggleDeleted(true);
      })
    );
  };

  const handleToggleFavorites = () => {
    addToFavorites(id).then((resp) => {
      handleResponse(resp, () => {
        onToggleFavorite();
        cogoToast.success("Статус успішно змінено!", {
          hideAfter: 3,
          position: "top-right",
        });
      });
    });
  };

  const handleRestoreRequest = () => {
    restoreRequests([id]).then((resp) =>
      handleResponse(resp, () => {
        onToggleDeleted(false);
        cogoToast.success("Запит успішно відновлено", {
          hideAfter: 3,
          position: "top-right",
        });
      })
    );
  };

  return (
    <StyledHeader className="flex items-center justify-between">
      {deleteModal && (
        <Confirm
          title={isDeleted ? "Видалити запит остаточно?" : "Видалити запит?"}
          onClose={() => setDeleteModal(false)}
          onSubmit={handleDeleteRequest}
          passwordCheck={isDeleted}
        />
      )}
      <div className="flex title-wrapper">
        <div className="flex items-center">
          <BackButton onClick={() => navigate(-1)} />
          <Title />
        </div>
        <div className="mobile-action-btns flex items-center">
          {isDataLoading ? null : isDeleted ? (
            <>
              {" "}
              <IconButton
                Icon={RestoreIcon}
                className="icon-btn restore-btn ml-auto"
                onClick={handleRestoreRequest}
              />
              {user?.struct_level === 1 ? (
                <IconButton
                  Icon={RemoveIcon}
                  className="icon-btn remove-btn"
                  onClick={() => setDeleteModal(true)}
                />
              ) : null}
            </>
          ) : (
            <>
              <SaveButton
                className="desktop-save-btn"
                onClick={onSave}
                loading={loading}
              />
              {id && (
                <>
                  <IconButton
                    Icon={StarIcon}
                    className="icon-btn"
                    onClick={handleToggleFavorites}
                    active={favorite}
                  />

                  {handleCheckAccess(accessData, "requests", "delete") && (
                    <IconButton
                      Icon={RemoveIcon}
                      className="icon-btn remove-btn"
                      onClick={() => setDeleteModal(true)}
                    />
                  )}
                  {/* <Id id={id} /> */}
                  <MoreButton data={data} onChangeField={onChangeField} />
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex items-center bts">
        {isDataLoading ? null : isDeleted ? null : (
          <>
            <SaveButton onClick={onSave} loading={loading} />
            <Button
              title="Призупинити показ"
              active={Number(data?.general_group?.stop_showing) > 0}
              onClick={() =>
                onChangeField("general_group", {
                  ...data.general_group,
                  stop_showing:
                    Number(data?.general_group?.stop_showing) <= 0 ? "1" : "0",
                })
              }
            />
            <Button
              title="Пуста підбірка"
              active={data?.general_group?.folder_empty === "1"}
              onClick={() =>
                onChangeField("general_group", {
                  ...data.general_group,
                  folder_empty:
                    data?.general_group?.folder_empty === "0" ? "1" : "0",
                })
              }
            />
            <Button
              title={
                data?.general_group?.not_actual === "0"
                  ? "Актуально"
                  : "Неактуально"
              }
              onClick={() =>
                onChangeField("general_group", {
                  ...data.general_group,
                  not_actual:
                    data?.general_group?.not_actual === "0" ? "1" : "0",
                })
              }
            />
          </>
        )}
        {id && !isDataLoading && (
          <div className="desktop-action-btns flex items-center">
            {isDeleted ? (
              <>
                <IconButton
                  Icon={RestoreIcon}
                  className="icon-btn restore-btn"
                  onClick={handleRestoreRequest}
                />
                {user?.struct_level === 1 ? (
                  <IconButton
                    Icon={RemoveIcon}
                    className="icon-btn remove-btn"
                    onClick={() => setDeleteModal(true)}
                  />
                ) : null}
              </>
            ) : (
              <>
                <IconButton
                  Icon={StarIcon}
                  className="icon-btn"
                  onClick={handleToggleFavorites}
                  active={favorite}
                />
                {handleCheckAccess(accessData, "requests", "delete") && (
                  <IconButton
                    Icon={RemoveIcon}
                    className="icon-btn remove-btn"
                    onClick={() => setDeleteModal(true)}
                  />
                )}
                <Id id={id} />
              </>
            )}
          </div>
        )}
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;
  .remove-btn {
    margin-left: 10px;
  }
  .remove-btn:hover {
    path {
      fill: #fc4444;
    }
  }
  .mobile-action-btns {
    display: none;
  }
  .restore-btn {
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
  @media (max-width: 1250px) {
    flex-direction: column;
    align-items: start;
    .bts {
      margin-top: 10px;
      justify-content: space-between;
      width: 100%;
      gap: 20px;
      button {
        width: 100%;
        margin: 0;
      }
    }
    .title-wrapper {
      justify-content: space-between;
      width: 100%;
    }
    .desktop-action-btns {
      display: none;
    }

    .mobile-action-btns {
      display: flex;
    }
    .desktop-save-btn {
      display: none;
    }
  }

  @media (max-width: 800px) {
    .mobile-action-btns {
      width: 100%;
    }
    .bts {
      display: none;
    }
    .desktop-save-btn {
      display: block;
    }
    .remove-btn {
      margin-left: 12px;
    }
  }
`;
