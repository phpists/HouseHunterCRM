import { styled } from "styled-components";
import { ReactComponent as StarIcon } from "../../assets/images/card-star.svg";
import { ReactComponent as UserIcon } from "../../assets/images/card-user.svg";
import { ReactComponent as RemoveIcon } from "../../assets/images/remove.svg";

export const Dropdown = ({ onDelete, onFavorite, favorite }) => (
  <StyledDropdown className="dropdown">
    <div className="flex items-center justify-between" onClick={onFavorite}>
      <span>{favorite ? "З улюбленого" : "В улюблене"}</span>
      <StarIcon className={`star-icon ${favorite && "active"}`} />
    </div>
    <div className="flex items-center justify-between">
      <span>Передати</span>
      <UserIcon className="user-icon" />
    </div>
    <div className="flex items-center justify-between" onClick={onDelete}>
      <span>Видалити</span>
      <RemoveIcon className="remove-icon" />
    </div>
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
  div {
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
