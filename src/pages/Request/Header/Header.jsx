import { styled } from "styled-components";
import { SaveButton } from "./SaveButton";
import { ReactComponent as StarIcon } from "../../../assets/images/card-star.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import { IconButton } from "../../../components/IconButton";
import { Title } from "./Title";
import { Button } from "./Button";
import { MoreButton } from "./MoreButton/MoreButton";
import {
  useLazyAddToFavoriteQuery,
  useLazyDeleteRequestQuery,
} from "../../../store/requests/requests.api";
import { useState } from "react";
import { Confirm } from "../../../components/Confirm/Confirm";
import { useNavigate, useParams } from "react-router-dom";
import { handleResponse } from "../../../utilits";
import cogoToast from "cogo-toast";

export const Header = ({
  onSave,
  favorite,
  onToggleFavorite,
  data,
  onChangeField,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addToFavorites] = useLazyAddToFavoriteQuery();
  const [deleteRequest] = useLazyDeleteRequestQuery();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteRequest = () => {
    deleteRequest([id]).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Заявку успішно видалено!", {
          hideAfter: 3,
          position: "top-right",
        });
        navigate("/requests");
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

  return (
    <StyledHeader className="flex items-center justify-between">
      {/* <BackButton /> */}
      {deleteModal && (
        <Confirm
          title="Видалити запит?"
          onClose={() => setDeleteModal(false)}
          onSubmit={handleDeleteRequest}
        />
      )}
      <div className="flex title-wrapper">
        <Title />
        <div className="mobile-action-btns flex items-center">
          <SaveButton className="desktop-save-btn" onClick={onSave} />
          {id && (
            <>
              <IconButton
                Icon={StarIcon}
                className="icon-btn"
                onClick={handleToggleFavorites}
                active={favorite}
              />
              <IconButton
                Icon={RemoveIcon}
                className="icon-btn remove-btn"
                onClick={() => setDeleteModal(true)}
              />
              <MoreButton />
            </>
          )}
        </div>
      </div>
      <div className="flex items-center bts">
        <SaveButton onClick={onSave} />
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
              not_actual: data?.general_group?.not_actual === "0" ? "1" : "0",
            })
          }
        />
        {id && (
          <div className="desktop-action-btns flex items-center">
            <IconButton
              Icon={StarIcon}
              className="icon-btn"
              onClick={handleToggleFavorites}
              active={favorite}
            />
            <IconButton
              Icon={RemoveIcon}
              className="icon-btn remove-btn"
              onClick={() => setDeleteModal(true)}
            />
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
