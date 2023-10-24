import { styled } from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";
import { useLazyAddToFavoriteQuery } from "../../../../store/requests/requests.api";
import { handleResponse } from "../../../../utilits";
import cogoToast from "cogo-toast";

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
}) => {
  const [addToFavorites] = useLazyAddToFavoriteQuery();

  const handleClick = (e) =>
    e.target.classList.contains("openInfo") ? onOpenInfo() : onSelect();

  const handleToggleFavorites = () => {
    addToFavorites(id).then((resp) => {
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
