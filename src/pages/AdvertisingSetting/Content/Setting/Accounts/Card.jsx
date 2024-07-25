import styled from "styled-components";
import { IconButton } from "../../../../../components/IconButton";
import { ReactComponent as RemoveIcon } from "../../../../../assets/images/remove.svg";

export const Card = ({ expireAt, email, id, name, onDelete }) => (
  <StyledCard className={`flex items-center`}>
    <div>
      <div className="value">{expireAt}</div>
      <div className="subtitle">Авторизація дійсна до</div>
    </div>
    <div>
      <div className="value">{id}</div>
      <div className="subtitle">Id</div>
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
    <IconButton onClick={onDelete} Icon={RemoveIcon} className="removeIcon" />
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
  .removeIcon {
    margin-left: auto;
    &:hover {
      border: 1px solid #fff;
      background: var(--bg-20);
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
