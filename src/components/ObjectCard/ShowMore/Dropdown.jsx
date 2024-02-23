import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { ReactComponent as Star } from "../../../assets/images/star-object.svg";
import { ReactComponent as Search } from "../../../assets/images/search-object.svg";
import { ReactComponent as History } from "../../../assets/images/history-object.svg";
import { ReactComponent as Prices } from "../../../assets/images/price-object.svg";
import { ReactComponent as Selection } from "../../../assets/images/home.svg";
import { ReactComponent as Edit } from "../../../assets/images/edit-company.svg";
import { ReactComponent as Eye } from "../../../assets/images/eye-access.svg";
import { ReactComponent as Link } from "../../../assets/images/link.svg";

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
}) => (
  <StyledDropdown className="dropdown">
    {link?.length > 0 && (
      <div onClick={() => window.open(link, "_blank")}>
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
        <span>Добавити в підбірку</span>{" "}
        <Selection className="selection-icon" />
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
        to={`/edit-object/${clientId}/${id}`}
        className="flex items-center justify-between"
      >
        <span>Редагувати</span> <Edit />
      </NavLink>
    )}
  </StyledDropdown>
);

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
  font-weight: 400;
  line-height: 118%; /* 14.16px */
  letter-spacing: 0.24px;
  width: 138px;
  overflow: hidden;
  top: 0;
  right: -5px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
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
    &:hover {
      background: #fff;
    }
  }
  div:first-child {
    border: none;
  }
  svg {
    flex-shrink: 0;
    width: 14px;
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
