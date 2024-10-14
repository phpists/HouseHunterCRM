import styled from "styled-components";
import { IconButton } from "../../../../../components/IconButton";
import { ReactComponent as RemoveIcon } from "../../../../../assets/images/remove.svg";
import { ReactComponent as RefreshIcon } from "../../../../../assets/images/reload.svg";

export const Card = ({
  expireAt,
  email,
  id,
  name,
  onDelete,
  oneAccount,
  onRefresh,
  refreshing,
  expired,
}) => (
  <StyledCard className={`flex items-center`}>
    {expireAt ? (
      <div>
        <div className={`value ${expired && "expired"}`}>
          {expired ? "Переувійдіть у свій акаунт та видаліть старий" : expireAt}
        </div>
        <div className="subtitle">
          {expired
            ? `Авторизація дійсна до ${expireAt}`
            : "Авторизація дійсна до"}{" "}
        </div>
      </div>
    ) : null}
    {id?.length > 0 ? (
      <div>
        <div className="value">{id}</div>
        <div className="subtitle">{oneAccount ? "Авторизовано" : "Id"} </div>
      </div>
    ) : null}
    {email?.length > 0 ? (
      <div title={email}>
        <div className="value email">{email}</div>
        <div className="subtitle">Email</div>
      </div>
    ) : null}
    {name?.length > 0 ? (
      <div title={name}>
        <div className="value">{name}</div>
        <div className="subtitle">Ім'я</div>
      </div>
    ) : null}
    <div className="actions flex items-center gap-2">
      {onRefresh ? (
        <IconButton
          onClick={refreshing ? null : onRefresh}
          Icon={RefreshIcon}
          className={`iconBtn reloadIcon ${refreshing && "loading"}`}
          title="Оновити історію всіх оголошень"
        />
      ) : null}
      <IconButton onClick={onDelete} Icon={RemoveIcon} className="iconBtn" />
    </div>
  </StyledCard>
);

const StyledCard = styled.div`
  padding: 6.5px 10px;
  transition: all 0.3s;
  border-bottom: 1px solid var(--company-filter-dropdown-bg);
  border-radius: 0;
  ${({ last }) => last && "border: none;"}
  gap: 20px;
  .value {
    font-size: 14px;
    font-weight: var(--font-weight-200);
    line-height: 16.52px;
    letter-spacing: 0.02em;
    text-align: left;
    margin-bottom: 2px;
    min-width: 120px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &.expired {
      max-width: fit-content;
    }
  }
  .subtitle {
    font-size: 11px;
    font-weight: var(--font-weight-200);
    line-height: 14.98px;
    letter-spacing: 0.02em;
    text-align: left;
    opacity: var(--opacity-light);
  }
  .right {
    text-align: right;
  }
  .actions {
    margin-left: auto;
  }
  .iconBtn {
    &:hover {
      border: 1px solid #fff;
      background: var(--bg-20);
    }
  }

  .reloadIcon {
    &.loading {
      svg {
        animation: 2s infinite loading linear;
        @keyframes loading {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      }
    }
    svg {
      height: 13px;
      opacity: 0.5;
    }
    &:hover {
      svg {
        opacity: 1;
      }
    }
  }

  @media (max-width: 800px) {
    .value {
      font-size: 11px;
      min-width: 100px;
    }
    .subtitle {
      font-size: 8px;
    }
  }
  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .removeIcon {
      grid-column: 2/3;
    }
  }
`;
