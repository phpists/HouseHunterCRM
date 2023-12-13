import { NavLink } from "react-router-dom";
import { styled } from "styled-components";

export const Dropdown = ({
  clientId,
  id,
  onToggleFavoriteStatus,
  isFavorite,
  onFindSimilar,
  isEdit,
}) => (
  <StyledDropdown className="dropdown">
    <div
      className="flex items-center justify-between"
      onClick={onToggleFavoriteStatus}
    >
      <span> {isFavorite ? "Із" : "До"} улюблених</span>
    </div>
    {onFindSimilar ? (
      <div
        className="flex items-center justify-between"
        onClick={onFindSimilar}
      >
        <span>Знайти схожі</span>
      </div>
    ) : null}
    <div className="flex items-center justify-between">
      <span>Завантажити</span>
    </div>
    <div className="flex items-center justify-between">
      <span>Історія тегів</span>
    </div>
    {isEdit && (
      <NavLink
        to={`/edit-object/${clientId}/${id}`}
        className="flex items-center justify-between"
      >
        <span>Редагувати</span>
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
  z-index: 3;
  div,
  a {
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
  g {
    opacity: 1;
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
