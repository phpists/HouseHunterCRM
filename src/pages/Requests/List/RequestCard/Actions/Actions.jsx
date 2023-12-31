import styled from "styled-components";
import { Button } from "./Button";
import { ReactComponent as StarIcon } from "../../../../../assets/images/card-star.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit-company.svg";
import { ReactComponent as RemoveIcon } from "../../../../../assets/images/remove.svg";
import { useNavigate } from "react-router-dom";
import { useLazyAddToFavoriteQuery } from "../../../../../store/requests/requests.api";
import { handleResponse } from "../../../../../utilits";
import cogoToast from "cogo-toast";

export const Actions = ({
  id,
  clientId,
  onDelete,
  favorite,
  onFavorite,
  idGroup,
  isEdit,
  isDelete,
}) => {
  const navigate = useNavigate();
  const [addToFavorites] = useLazyAddToFavoriteQuery();

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
    <StyledActions>
      <Button
        Icon={StarIcon}
        className="mb-2.5"
        onClick={handleToggleFavorites}
        active={favorite}
      />
      {isEdit && (
        <Button
          Icon={EditIcon}
          className="edit-btn mb-2.5"
          onClick={() => navigate(`/edit-request/${clientId}/${idGroup}`)}
        />
      )}
      {isDelete && (
        <Button Icon={RemoveIcon} className="remove-btn" onClick={onDelete} />
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
  @media (max-width: 1399.9px) {
    margin-left: 10px;
  }
`;
