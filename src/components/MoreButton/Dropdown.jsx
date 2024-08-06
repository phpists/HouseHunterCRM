import { styled } from "styled-components";
import { ReactComponent as StarIcon } from "../../assets/images/card-star.svg";
import { ReactComponent as UserIcon } from "../../assets/images/card-user.svg";
import { ReactComponent as RemoveIcon } from "../../assets/images/remove.svg";
import { ReactComponent as EditIcon } from "../../assets/images/edit-company.svg";
import { ReactComponent as RestoreIcon } from "../../assets/images/refresh-icon.svg";
import { ReactComponent as DownloadIcon } from "../../assets/images/file.svg";
import { ReactComponent as DeleteInfo } from "../../assets/images/delete-info.svg";
import { ReactComponent as Link } from "../../assets/images/link.svg";

export const Dropdown = ({
  onDelete,
  onFavorite,
  favorite,
  editLink,
  noFavorite,
  noDelete,
  onSend,
  isDeleted,
  onRestore,
  onDeleteFinally,
  onDownload,
  onOpenDeleteReason,
  urlResource,
}) => (
  <StyledDropdown className="dropdown noClickable">
    {isDeleted ? (
      <>
        {onOpenDeleteReason && (
          <div
            className="flex items-center justify-between noClickable"
            onClick={onOpenDeleteReason}
          >
            <span className="noClickable">Причина видалення</span>
            <DeleteInfo className="refresh noClickable" />
          </div>
        )}
        {onRestore && (
          <div
            className="flex items-center justify-between noClickable"
            onClick={onRestore}
          >
            <span className="noClickable">Відновити</span>
            <RestoreIcon className="refresh noClickable" />
          </div>
        )}
        {urlResource && (
          <div
            className="flex items-center justify-between noClickable"
            onClick={() => window.open(urlResource, "_blank")}
          >
            <span className="noClickable">Посилання на ресурс</span>
            <Link className="refresh noClickable" />
          </div>
        )}
        {/* {!noDelete && !onDeleteFinally && (
          <div
            className="flex items-center justify-between noClickable"
            onClick={onDelete}
          >
            <span className="noClickable">Видалити</span>
            <RemoveIcon className="remove-icon noClickable" />
          </div>
        )} */}
      </>
    ) : (
      <>
        {!noFavorite && (
          <div
            className="flex items-center justify-between noClickable"
            onClick={onFavorite}
          >
            <span className="noClickable">
              {favorite ? "З улюбленого" : "В улюблене"}
            </span>
            <StarIcon
              className={`star-icon ${favorite && "active"} noClickable`}
            />
          </div>
        )}

        {onSend && (
          <div
            className="flex items-center justify-between noClickable"
            onClick={onSend}
          >
            <span className="noClickable">Передати</span>
            <UserIcon className="user-icon noClickable" />
          </div>
        )}
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
        {urlResource && (
          <div
            className="flex items-center justify-between noClickable"
            onClick={() => window.open(urlResource, "_blank")}
          >
            <span className="noClickable">Посилання на оголошення</span>
            <Link className="refresh noClickable" />
          </div>
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
        {onDownload && (
          <div
            className="flex items-center justify-between noClickable"
            onClick={onDownload}
          >
            <span className="noClickable">Завантажити</span>
            <DownloadIcon className="noClickable user-icon" />
          </div>
        )}
      </>
    )}
    {onDeleteFinally && (
      <div
        className="flex items-center justify-between noClickable"
        onClick={onDeleteFinally}
      >
        <span className="noClickable">Видалити остаточно</span>
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
  font-weight: var(--font-weight-light);
  line-height: 118%; /* 14.16px */
  letter-spacing: 0.24px;
  width: 188px;
  overflow: hidden;
  top: -28px;
  right: 0px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  z-index: 100;
  div,
  a {
    padding: 5px 5px 5px 6px;
    background: rgba(255, 255, 255, 0.7);
    transform: all 0.3s;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    &:hover {
      background: var(--active-bg);
    }
  }
  div:first-child {
    border: none;
  }
  svg {
    height: 15px;
    width: 15px;
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
  .refresh {
    path {
      fill: #3e46fb;
    }
  }
`;
