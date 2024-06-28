import { styled } from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";
import { useLazyAddToFavoriteQuery } from "../../../../store/requests/requests.api";
import { handleDownloadFile, handleResponse } from "../../../../utilits";
import cogoToast from "cogo-toast";
import {
  useLazyAddToFavoritesQuery,
  useLazyDownloadObjectQuery,
} from "../../../../store/objects/objects.api";
import { useNavigate, useParams } from "react-router-dom";

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
  currency,
  price_for,
  dateTo,
  isDeleted,
  onRestore,
  onDeleteFinally,
}) => {
  const { id: clientId } = useParams();
  const [addRequestToFavorites] = useLazyAddToFavoriteQuery();
  const [addObjectToFavorites] = useLazyAddToFavoritesQuery();
  const navigate = useNavigate();
  const [downloadObject] = useLazyDownloadObjectQuery();

  const handleClick = (e) => {
    onSelect();

    if (
      !e.target.classList.contains("noClickable") &&
      e.target.classList.contains("openMore") &&
      isEdit
    ) {
      const url = !isEdit
        ? null
        : isObject
        ? `/edit-object/${clientId}/${id}`
        : `/edit-request/${clientId}/${id}`;
      url && navigate(url);
    } else if (!e.target.classList.contains("noClickable")) {
      onSelectItem();
      if (window.innerWidth <= 1400) {
        onOpenInfo();
      }
    }
  };

  const handleToggleFavorites = () => {
    isObject
      ? addObjectToFavorites([id]).then((resp) => {
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

  const handleDownload = () => {
    downloadObject(id).then((resp) => {
      handleResponse(resp, () => {
        const link = resp?.data?.link;
        link && handleDownloadFile(link);
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
        currency={currency}
        price_for={price_for}
        dateTo={dateTo}
        isDeleted={isDeleted}
        onRestore={onRestore}
        onDeleteFinally={onDeleteFinally}
        onDownload={isObject ? handleDownload : null}
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
        currency={currency}
        price_for={price_for}
        dateTo={dateTo}
        isDeleted={isDeleted}
        onRestore={onRestore}
        onDeleteFinally={onDeleteFinally}
        onDownload={isObject ? handleDownload : null}
      />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 0;
  border-radius: 15px;
  background: var(--card-bg);
  margin-bottom: 10px;
  transition: all 0.3s;
  cursor: pointer;
  .arrow-more {
    padding: 21px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
    }
    svg {
      transform: rotate(-45deg);
      opacity: 0.4;
      transition: all 0.3s;
      width: 24px;
      height: 24px;
      path {
        fill: #fff;
      }
    }
  }
  &:hover {
    background: var(--hover-card);
    .arrow-more {
      svg {
        opacity: 1;
        transform: rotate(0deg);
      }
    }
  }

  @media (max-width: 700px) {
    padding: 6px;
    .arrow-more {
      padding: 15px;
    }
  }

  ${({ selected }) => selected && "border: 1.4px solid #FFF;"}
`;
