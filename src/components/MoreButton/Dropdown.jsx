import { styled } from "styled-components";
import { ReactComponent as StarIcon } from "../../assets/images/card-star.svg";
import { ReactComponent as UserIcon } from "../../assets/images/card-user.svg";
import { ReactComponent as RemoveIcon } from "../../assets/images/remove.svg";
import { ReactComponent as EditIcon } from "../../assets/images/edit-company.svg";

export const Dropdown = ({
  onDelete,
  onFavorite,
  favorite,
  editLink,
  noFavorite,
  noDelete,
}) => (
  <StyledDropdown className="dropdown noClickable">
    {!noFavorite && (
      <div
        className="flex items-center justify-between noClickable"
        onClick={onFavorite}
      >
        <span className="noClickable">
          {favorite ? "З улюбленого" : "В улюблене"}
        </span>
        <StarIcon className={`star-icon ${favorite && "active"} noClickable`} />
      </div>
    )}
    <div className="flex items-center justify-between noClickable">
      <span className="noClickable">Передати</span>
      <UserIcon className="user-icon noClickable" />
    </div>
    {editLink && (
      <a
        className="flex items-center justify-between noClickable"
        href={editLink}
        rel="noreferrer"
      >
        <span className="noClickable">Редагувати</span>
        <EditIcon className="noClickable" />
      </a>
    )}
    {!noDelete && (
      <div
        className="flex items-center justify-between noClickable"
        onClick={onDelete}
      >
        <span className="noClickable">Видалити</span>
        <RemoveIcon className="remove-icon noClickable" />
      </div>
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
  top: -28px;
  right: 0px;
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
  .star-icon.active {
    fill: #3e46fb;
  }
  .user-icon path {
    fill: #3e46fb;
  }
  .remove-icon path {
    fill: #f14040;
  }
`;
