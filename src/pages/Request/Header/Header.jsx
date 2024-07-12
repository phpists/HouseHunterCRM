import { styled } from "styled-components";
import { SaveButton } from "./SaveButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import { ReactComponent as RestoreIcon } from "../../../assets/images/refresh-icon.svg";
import { ReactComponent as DeleteInfoIcon } from "../../../assets/images/delete-info.svg";
import { ReactComponent as OpenIcon } from "../../../assets/images/open-folder.svg";
import { ReactComponent as EyeIcon } from "../../../assets/images/eye-access.svg";

import { IconButton } from "../../../components/IconButton";
import { Title } from "./Title";
import { Button } from "./Button";
import { MoreButton } from "./MoreButton/MoreButton";
import {
  useLazyAddToFavoriteQuery,
  useLazyDeleteRequestQuery,
  useLazyRestoreRequestsQuery,
} from "../../../store/requests/requests.api";
import { useEffect, useState } from "react";
import { Confirm } from "../../../components/Confirm/Confirm";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { handleCheckAccess, handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";
import { BackButton } from "../../../components/BackButton";
import { useAppSelect } from "../../../hooks/redux";
import { Id } from "../../../components/Id";
import { DeleteInfo } from "../../../components/DeleteInfo/DeleteInfo";

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
  const [confirmText, setConfimText] = useState("");
  const [deleteInfo, setDeleteInfo] = useState(false);
  const [deleteReason, setDeleteReason] = useState(null);

  const handleDeleteRequest = () => {
    deleteRequest({
      id_groups: [id],
      final_remove: isDeleted ? "1" : undefined,
      reasone_remove: confirmText,
    }).then((resp) =>
      handleResponse(resp, () => {
        setDeleteReason(confirmText);
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
        setDeleteReason(null);
        onToggleDeleted(false);
        cogoToast.success("Запит успішно відновлено", {
          hideAfter: 3,
          position: "top-right",
        });
      })
    );
  };

  useEffect(() => {
    setDeleteReason(data?.general_group?.reasone_remove ?? null);
  }, [data]);

  return (
    <StyledHeader className="flex items-center justify-between">
      {deleteModal && (
        <Confirm
          title={isDeleted ? "Видалити запит остаточно?" : "Видалити запит?"}
          onClose={() => setDeleteModal(false)}
          onSubmit={handleDeleteRequest}
          passwordCheck={isDeleted}
          confirmText={isDeleted ? null : confirmText}
          onChangeConfirmText={(val) => setConfimText(val)}
        />
      )}
      {deleteInfo ? (
        <DeleteInfo
          onClose={() => setDeleteInfo(false)}
          text={deleteReason ?? data?.general_group?.reasone_remove}
        />
      ) : null}
      <div className="flex title-wrapper">
        <div className="flex items-center">
          <BackButton onClick={() => navigate(-1)} />
          <Title />
        </div>
        <div className="mobile-action-btns flex items-center">
          {isDataLoading ? null : isDeleted ? (
            <>
              <div className="flex items-center">
                {deleteReason?.length > 0 ? (
                  <IconButton
                    Icon={DeleteInfoIcon}
                    className="restore-btn icon-btn mr-2.5 "
                    onClick={() => setDeleteInfo(true)}
                  />
                ) : null}
                <IconButton
                  Icon={RestoreIcon}
                  className="icon-btn restore-btn ml-auto"
                  onClick={handleRestoreRequest}
                />
              </div>
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
              <SaveButton onClick={onSave} loading={loading} />
              {id && (
                <>
                  <IconButton
                    Icon={StarIcon}
                    className="icon-btn"
                    onClick={handleToggleFavorites}
                    active={favorite}
                  />
                  <IconButton
                    Icon={EyeIcon}
                    className="icon-btn icon-margin "
                    onClick={() =>
                      onChangeField("general_group", {
                        ...data.general_group,
                        hide_title_client:
                          data?.general_group?.hide_title_client === "0"
                            ? "1"
                            : "0",
                      })
                    }
                    active={data?.general_group?.hide_title_client === "1"}
                  />
                  {handleCheckAccess(accessData, "requests", "delete") && (
                    <IconButton
                      Icon={RemoveIcon}
                      className="icon-btn remove-btn"
                      onClick={() => setDeleteModal(true)}
                    />
                  )}
                  {/* <Id id={id} /> */}
                </>
              )}
              <MoreButton data={data} onChangeField={onChangeField} />
            </>
          )}
        </div>
      </div>
      <div className="flex items-center bts">
        {isDataLoading ? null : isDeleted ? null : (
          <>
            <SaveButton onClick={onSave} loading={loading} />
            <Button
              title="Зупинити надсилання"
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
            {data?.fields?.[0]?.id_group ? (
              <NavLink
                to={`/selections/${data?.fields?.[0]?.id_group}`}
                title="Перейти в підбірку"
                className="ml-3"
              >
                <Button title={"Перейти в підбірку"} />
              </NavLink>
            ) : null}

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
            <IconButton
              Icon={EyeIcon}
              className="icon-btn icon-margin "
              onClick={() =>
                onChangeField("general_group", {
                  ...data.general_group,
                  hide_title_client:
                    data?.general_group?.hide_title_client === "0" ? "1" : "0",
                })
              }
              active={data?.general_group?.hide_title_client === "1"}
            />
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
          </>
        )}
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 20px;
  .icon-margin {
    margin-right: 10px;
  }
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
  .goToFolderLink {
    button {
      margin: 0 !important;
    }
  }
  @media (max-width: 1350px) {
    flex-direction: column;
    align-items: start;
    .icon-margin {
      display: none;
    }
    .bts {
      margin-top: 10px;
      justify-content: space-between;
      width: 100%;
      gap: 20px;
      display: none;
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
      margin-left: 10px;
    }
  }
`;
