import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { ReactComponent as Star } from "../../../../../assets/images/star-object.svg";
import { ReactComponent as Search } from "../../../../../assets/images/search-object.svg";
import { ReactComponent as History } from "../../../../../assets/images/history-object.svg";
import { ReactComponent as Prices } from "../../../../../assets/images/price-object.svg";
import { ReactComponent as Selection } from "../../../../../assets/images/home.svg";
import { ReactComponent as Edit } from "../../../../../assets/images/edit-company.svg";
import { ReactComponent as Eye } from "../../../../../assets/images/eye-access.svg";
import { ReactComponent as Link } from "../../../../../assets/images/link.svg";
import { ReactComponent as Comment } from "../../../../../assets/images/message-object.svg";
import { ReactComponent as RemoveIcon } from "../../../../../assets/images/remove.svg";
import { ReactComponent as ToObjectIcon } from "../../../../../assets/images/my-object.svg";
import cogoToast from "cogo-toast";

export const Dropdown = ({
  status,
  onSetStatus,
  onEditComment,
  onAdd,
  onSend,
  onCloseDropdown,
}) => {
  const navigate = useNavigate();

  return (
    <StyledDropdown className="dropdown" onClick={onCloseDropdown}>
      <div className="flex items-center justify-between" onClick={onSetStatus}>
        <span>{status === "1" ? "Не опрацьовано" : "Опрацьовано"}</span>
        <History className="selection-icon" />
      </div>
      <div className="flex items-center justify-between" onClick={onAdd}>
        <span>Додати клієнта</span> <Selection className="selection-icon" />
      </div>
      <div
        className="flex items-center justify-between"
        onClick={onEditComment}
      >
        <span>Додати коментар</span> <Comment className="selection-icon" />
      </div>
      {onSend && (
        <div className="flex items-center justify-between" onClick={onSend}>
          <span>Передати клієнта</span>{" "}
          <ToObjectIcon className="selection-icon" />
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
  font-weight: 400;
  line-height: 118%; /* 14.16px */
  letter-spacing: 0.24px;
  width: 180px;
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
