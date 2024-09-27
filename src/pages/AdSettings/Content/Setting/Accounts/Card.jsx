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
}) => (
  <StyledCard className={`flex items-center`}>
    {expireAt ? (
      <div>
        <div className="value">{expireAt}</div>
        <div className="subtitle">Авторизація дійсна до</div>
      </div>
    ) : null}
    <div>
      <div className="value">{id}</div>
      <div className="subtitle">{oneAccount ? "Авторизовано" : "Id"} </div>
    </div>
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
          onClick={onRefresh}
          Icon={RefreshIcon}
          className="iconBtn reloadIcon"
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
    max-width: 120px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
