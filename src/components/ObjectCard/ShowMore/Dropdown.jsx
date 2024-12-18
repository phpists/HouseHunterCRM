import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { ReactComponent as Star } from "../../../assets/images/star-object.svg";
import { ReactComponent as Search } from "../../../assets/images/search-object.svg";
import { ReactComponent as History } from "../../../assets/images/history-object.svg";
import { ReactComponent as Prices } from "../../../assets/images/price-object.svg";
import { ReactComponent as Selection } from "../../../assets/images/home.svg";
import { ReactComponent as Edit } from "../../../assets/images/edit-company.svg";
import { ReactComponent as Eye } from "../../../assets/images/eye-access.svg";
import { ReactComponent as Link } from "../../../assets/images/link.svg";
import { ReactComponent as Comment } from "../../../assets/images/message-object.svg";
import { ReactComponent as RemoveIcon } from "../../../assets/images/remove.svg";
import { ReactComponent as DownloadIcon } from "../../../assets/images/file.svg";
import { ReactComponent as ToObjectIcon } from "../../../assets/images/my-object.svg";
import { ReactComponent as PhoneIcon } from "../../../assets/images/phone-menu.svg";
import { ReactComponent as RestoreIcon } from "../../../assets/images/refresh-icon.svg";
import { ReactComponent as DeleteInfoIcon } from "../../../assets/images/delete-info.svg";
import { ReactComponent as MarketIcon } from "../../../assets/images/market.svg";
import { ReactComponent as RoketIcon } from "../../../assets/images/BiRocket.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/images/delete-info.svg";

import {
  useLazyAddStreetBaseObjectQuery,
  useLazyDownloadObjectQuery,
} from "../../../store/objects/objects.api";
import {
  handleDownloadFile,
  handleResponse,
  showAlert,
} from "../../../utilits";
import { useEffect, useState } from "react";

export const Dropdown = ({
  clientId,
  id,
  onToggleFavoriteStatus,
  isFavorite,
  onFindSimilar,
  isEdit,
  onHide,
  onAddToSelection,
  onOpenTagsHistory,
  onOpenPriceHistory,
  link,
  isHideObjects,
  onOpenCommetHistory,
  onDelete,
  isStreetBase,
  searchTag,
  onFocus,
  onMarkPhone,
  onClose,
  isDeleted,
  onRestore,
  onDeleteFinally,
  onOpenDeleteReason,
  onFastSelection,
  onAdvertise,
  onAdvertiseTelegram,
  ad,
  onDeleteHistory,
  onDeleteAd,
  idRubric,
}) => {
  const NO_AD_RUBRICS = ["60", "70", "72", "73", "74"];
  const noAd = NO_AD_RUBRICS.includes(idRubric);
  const [addStreetBaseObject] = useLazyAddStreetBaseObjectQuery();
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const [downloadObject] = useLazyDownloadObjectQuery();

  useEffect(() => {
    setAdded(false);
  }, [id]);

  const handleAddStreetBaseObject = () => {
    addStreetBaseObject(id).then((resp) =>
      handleResponse(resp, () => {
        showAlert("success", "Об'єкт успішно додано");
        setAdded(true);
      })
    );
  };

  const handleDownload = () => {
    downloadObject(id).then((resp) => {
      handleResponse(resp, () => {
        const link = resp?.data?.link;
        link && handleDownloadFile(link);
      });
    });
  };

  const handleAdDisabled = () => {
    showAlert("error", "Дана рубрика для реклами не підримується");
  };

  return (
    <StyledDropdown className="dropdown">
      {isDeleted ? (
        <>
          {isEdit && (
            <NavLink
              onClick={() => onFocus()}
              to={`/edit-${ad ? "ad" : "object"}/${clientId}/${id}${
                searchTag ?? ""
              }`}
              className="flex items-center justify-between"
              onFocus={(e) => {
                e.preventDefault();
                onFocus();
              }}
              onMouseDown={(e) => {
                if (window.event?.which === 2) {
                  window
                    .open(
                      `/edit-${ad ? "ad" : "object"}/${clientId}/${id}${
                        searchTag ?? ""
                      }`,
                      "_blank"
                    )
                    .focus();
                }
              }}
            >
              <span>Редагувати </span> <Edit />
            </NavLink>
          )}
          {onOpenDeleteReason && (
            <div
              className="flex items-center justify-between"
              onClick={onOpenDeleteReason}
            >
              <span>Причина видалення </span>{" "}
              <DeleteInfoIcon className="selection-icon" />
            </div>
          )}
          {onRestore && (
            <div
              className="flex items-center justify-between"
              onClick={onRestore}
            >
              <span>Відновити </span> <RestoreIcon className="selection-icon" />
            </div>
          )}
          {onDelete && !onDeleteFinally && (
            <div
              className="flex items-center justify-between"
              onClick={onDelete}
            >
              <span>Видалити</span> <RemoveIcon className="selection-icon" />
            </div>
          )}
        </>
      ) : ad ? (
        <>
          {onDeleteHistory && (
            <div
              className="flex items-center justify-between"
              onClick={onDeleteHistory}
            >
              <span>Видалити з історії</span>{" "}
              <RemoveIcon className="selection-icon" />
            </div>
          )}
          {onDeleteAd && (
            <div
              className="flex items-center justify-between"
              onClick={onDeleteAd}
            >
              <span>Деактивувати об'єкт на ресурсі</span>{" "}
              <DeleteIcon className="selection-icon" />
            </div>
          )}
          {isEdit && (
            <NavLink
              onClick={() => onFocus()}
              to={`/edit-${ad ? "ad" : "object"}/${clientId}/${id}${
                searchTag ?? ""
              }`}
              className="flex items-center justify-between"
              onFocus={(e) => {
                e.preventDefault();
                onFocus();
              }}
              onMouseDown={(e) => {
                if (window.event?.which === 2) {
                  window
                    .open(
                      `/edit-${ad ? "ad" : "object"}/${clientId}/${id}${
                        searchTag ?? ""
                      }`,
                      "_blank"
                    )
                    .focus();
                }
              }}
            >
              <span>Редагувати </span> <Edit />
            </NavLink>
          )}{" "}
          {link?.length > 0 && (
            <div
              className="flex items-center justify-between"
              onClick={() => window.open(link, "_blank")}
            >
              Перейти на першоджерело
              <Link className="selection-icon" />
            </div>
          )}
          {onFindSimilar ? (
            <div
              className="flex items-center justify-between"
              onClick={onFindSimilar}
            >
              <span>Знайти оригінальний обєкт</span> <Search />
            </div>
          ) : null}
        </>
      ) : (
        <>
          {" "}
          {link?.length > 0 && (
            <div
              className="flex items-center justify-between"
              onClick={() => window.open(link, "_blank")}
            >
              Перейти на першоджерело
              <Link className="selection-icon" />
            </div>
          )}
          {onToggleFavoriteStatus && (
            <div
              className="flex items-center justify-between"
              onClick={onToggleFavoriteStatus}
            >
              <span> {isFavorite ? "Із" : "До"} улюблених</span> <Star />
            </div>
          )}
          {onFindSimilar ? (
            <div
              className="flex items-center justify-between"
              onClick={onFindSimilar}
            >
              <span>Знайти схожі</span> <Search />
            </div>
          ) : null}
          {onOpenTagsHistory && (
            <div
              className="flex items-center justify-between"
              onClick={onOpenTagsHistory}
            >
              <span>Історія тегів</span> <History />
            </div>
          )}
          {onOpenCommetHistory && (
            <div
              className="flex items-center justify-between"
              onClick={onOpenCommetHistory}
            >
              <span>Історія коментарів</span>{" "}
              <Comment className="selection-icon" />
            </div>
          )}
          {onOpenPriceHistory && (
            <div
              className="flex items-center justify-between"
              onClick={onOpenPriceHistory}
            >
              <span>Графік змін цін</span> <Prices />
            </div>
          )}
          {onAddToSelection && (
            <div
              className="flex items-center justify-between"
              onClick={onAddToSelection}
            >
              <span>Додати в підбірку</span>{" "}
              <Selection className="selection-icon" />
            </div>
          )}
          {onFastSelection && (
            <div
              className="flex items-center justify-between"
              onClick={onFastSelection}
            >
              <span>Швидка підбірка</span>{" "}
              <Selection className="selection-icon" />
            </div>
          )}
          {isStreetBase && !added && (
            <div
              className="flex items-center justify-between"
              onClick={handleAddStreetBaseObject}
            >
              <span>Додати обєкт до себе</span>{" "}
              <ToObjectIcon className="selection-icon" />
            </div>
          )}
          {onHide && (
            <div className="flex items-center justify-between" onClick={onHide}>
              <span>{isHideObjects ? "Показати" : "Приховати"}</span>{" "}
              <Eye className="selection-icon" />
            </div>
          )}
          {isEdit && (
            <NavLink
              onClick={() => onFocus()}
              to={`/edit-${ad ? "ad" : "object"}/${clientId}/${id}${
                searchTag ?? ""
              }`}
              className="flex items-center justify-between"
              onFocus={(e) => {
                e.preventDefault();
                onFocus();
              }}
              onMouseDown={(e) => {
                if (window.event?.which === 2) {
                  window
                    .open(
                      `/edit-${ad ? "ad" : "object"}/${clientId}/${id}${
                        searchTag ?? ""
                      }`,
                      "_blank"
                    )
                    .focus();
                }
              }}
            >
              <span>Редагувати </span> <Edit />
            </NavLink>
          )}
          {onAdvertise && (
            <div
              className={`flex items-center justify-between ${
                noAd && "disabled"
              }`}
              onClick={noAd ? handleAdDisabled : onAdvertise}
            >
              <span>Рекламувати</span> <RoketIcon className="selection-icon" />
            </div>
          )}{" "}
          {onAdvertiseTelegram && (
            <div
              className="flex items-center justify-between"
              onClick={onAdvertiseTelegram}
            >
              <span>Рекламувати в телеграм</span>{" "}
              <MarketIcon className="selection-icon" />
            </div>
          )}
          {onDelete && (
            <div
              className="flex items-center justify-between"
              onClick={onDelete}
            >
              <span>Видалити</span> <RemoveIcon className="selection-icon" />
            </div>
          )}
          <div
            className="flex items-center justify-between"
            onClick={handleDownload}
          >
            <span>Завантажити</span> <DownloadIcon className="selection-icon" />
          </div>
          {onMarkPhone && (
            <div
              className="flex items-center justify-between"
              onClick={() => {
                onMarkPhone();
                onClose();
              }}
            >
              <span>Мітка номерів об'єкту</span>{" "}
              <PhoneIcon className="selection-icon" />
            </div>
          )}
        </>
      )}
      {onDeleteFinally && (
        <div
          className="flex items-center justify-between"
          onClick={onDeleteFinally}
        >
          <span>Видалити остаточно</span>{" "}
          <RemoveIcon className="selection-icon" />
        </div>
      )}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(8.5px);
  color: #000;
  font-family: Overpass;
  font-size: 12px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 118%; /* 14.16px */
  letter-spacing: 0.24px;
  width: 220px;
  overflow: hidden;
  top: 0;
  right: -5px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.1s;
  z-index: 333;
  div,
  a {
    display: flex;
    text-align: left;
    padding: 5px 5px 5px 6px;
    background: rgba(255, 255, 255, 0.7);
    transform: all 0.3s;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      background: var(--active-bg);
    }
    &.disabled {
      opacity: 0.8;
      cursor: not-allowed;
    }
  }
  div:first-child {
    border: none;
  }
  svg {
    flex-shrink: 0;
    width: 14px;
    height: 15px;
  }
  g {
    opacity: 1;
  }

  .selection-icon path {
    fill: #3e46fb;
  }

  .star-icon path {
    stroke: #3e46fb;
  }
  .user-icon path {
    fill: #3e46fb;
  }
  .remove-icon path {
    fill: #f14040;
  }
`;
