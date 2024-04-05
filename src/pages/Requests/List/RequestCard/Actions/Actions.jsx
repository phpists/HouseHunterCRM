import styled from "styled-components";
import { Button } from "./Button";
import { ReactComponent as StarIcon } from "../../../../../assets/images/card-star.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit-company.svg";
import { ReactComponent as RemoveIcon } from "../../../../../assets/images/remove.svg";
import { ReactComponent as Refresh } from "../../../../../assets/images/refresh-icon.svg";
import { useNavigate } from "react-router-dom";
import { useLazyAddToFavoriteQuery } from "../../../../../store/requests/requests.api";
import { handleResponse } from "../../../../../utilits";
import cogoToast from "cogo-toast";
import { useAppSelect } from "../../../../../hooks/redux";

export const Actions = ({
  id,
  clientId,
  onDelete,
  favorite,
  onFavorite,
  idGroup,
  isEdit,
  isDelete,
  isAccess,
  isDeleted,
  onRestore,
  userId,
  onDeleteFinally,
}) => {
  const { user } = useAppSelect((state) => state.auth);
  const navigate = useNavigate();
  const [addToFavorites] = useLazyAddToFavoriteQuery();
  const isRestore = userId === user?.id || user?.struct_level === 1;

  const handleToggleFavorites = () => {
    addToFavorites(idGroup).then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success("Статус успішно змінено!", {
          hideAfter: 3,
          position: "top-right",
        });
        onFavorite(idGroup);
      });
    });
  };

  return (
    <StyledActions className="clickable">
      {isDeleted && isRestore && (
        <Button
          Icon={Refresh}
          className="edit-btn mb-2.5"
          onClick={onRestore}
        />
      )}
      {!isDeleted && (
        <Button
          Icon={StarIcon}
          className="mb-2.5"
          onClick={handleToggleFavorites}
          active={favorite}
        />
      )}

      {isEdit && isAccess && !isDeleted && (
        <Button
          Icon={EditIcon}
          className="edit-btn mb-2.5"
          onClick={() => navigate(`/edit-request/${clientId}/${idGroup}`)}
        />
      )}
      {isDelete && isAccess && !isDeleted && (
        <Button Icon={RemoveIcon} className="remove-btn" onClick={onDelete} />
      )}
      {isDeleted && user?.struct_level === 1 && (
        <Button Icon={RemoveIcon} className="remove-btn" onClick={onDelete} />
      )}

      {onDeleteFinally && (
        <Button
          Icon={RemoveIcon}
          className="remove-btn removeFinally mt-2.5"
          onClick={onDeleteFinally}
        />
      )}
    </StyledActions>
  );
};

const StyledActions = styled.div`
  .edit-btn {
    path {
      fill: #fff;
      opacity: 0.4;
    }
  }
  .remove-btn {
    &:hover {
      border: 1px solid rgba(255, 101, 101, 0.2);
      path {
        fill: #ff6c6c;
      }
    }
  }
  .removeFinally {
    border: 1px solid rgba(255, 101, 101, 0.2);
    path {
      fill: #ff6c6c;
    }
  }
  @media (max-width: 1399.9px) {
    margin-left: 10px;
  }
`;
