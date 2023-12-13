import { styled } from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";
import { useLazyAddToFavoriteQuery } from "../../../../store/requests/requests.api";
import { handleResponse } from "../../../../utilits";
import cogoToast from "cogo-toast";
import { useLazyAddToFavoritesQuery } from "../../../../store/objects/objects.api";

export const Card = ({
  selected,
  onSelect,
  onOpenInfo,
  date,
  title,
  location,
  price,
  id,
  favorite,
  onChangeFavorite,
  onDelete,
  isObject,
  onSelectItem,
  isEdit,
  isDelete,
}) => {
  const [addRequestToFavorites] = useLazyAddToFavoriteQuery();
  const [addObjectToFavorites] = useLazyAddToFavoritesQuery();

  const handleClick = (e) => {
    if (e.target.classList.contains("openInfo")) {
      onSelect();
      if (window.innerWidth <= 1400) {
        onOpenInfo();
      }
    } else if (!e.target.classList.contains("noClickable")) {
      onSelectItem();
    }
  };

  const handleToggleFavorites = () => {
    isObject
      ? addObjectToFavorites(id).then((resp) => {
          handleResponse(resp, () => {
            onChangeFavorite();
            cogoToast.success("Статус успішно змінено!", {
              hideAfter: 3,
              position: "top-right",
            });
          });
        })
      : addRequestToFavorites(id).then((resp) => {
          handleResponse(resp, () => {
            onChangeFavorite();
            cogoToast.success("Статус успішно змінено!", {
              hideAfter: 3,
              position: "top-right",
            });
          });
        });
  };

  return (
    <StyledCard onClick={handleClick} selected={selected}>
      <DesktopContent
        date={date}
        title={title}
        location={location}
        price={price}
        id={id}
        onFavorite={handleToggleFavorites}
        favorite={favorite}
        onDelete={onDelete}
        isObject={isObject}
        isEdit={isEdit}
        isDelete={isDelete}
      />
      <MobileContent
        date={date}
        title={title}
        location={location}
        price={price}
        id={id}
        onFavorite={handleToggleFavorites}
        favorite={favorite}
        onDelete={onDelete}
        isObject={isObject}
        isEdit={isEdit}
        isDelete={isDelete}
      />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 6px 6px 6px 6px;
  border-radius: 15px;
  background: #3d3d3d;
  margin-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: #484848;
  }

  @media (max-width: 700px) {
    padding: 6px;
  }

  ${({ selected }) => selected && "border: 1.4px solid #FFF;"}
`;
