import styled from "styled-components";
import { CheckOption } from "../../../CheckOption";
import { Tag } from "./Tag";

export const Card = ({
  icon,
  title,
  active,
  onClick,
  onChangeActiveTab,
  noAuth,
  selected,
}) => (
  <StyledCard icon={icon}>
    <div
      className={`card-content flex items-center ${selected && "selected"}`}
      onClick={onChangeActiveTab}
    >
      <div className="icon" />
      <span className="card-title" title={title}>
        {title}
      </span>
      {noAuth ? null : (
        <div className="status-wrapper">
          <Tag title="Рекламується" color="green" />
          <div className="status-wrapper-label">з 05.06.2024</div>
        </div>
      )}
    </div>
  </StyledCard>
);

const StyledCard = styled.div`
  display: grid;
  align-items: center;
  cursor: pointer;
  .card-content {
    background: var(--second-bg);
    padding: 10px;
    border-radius: 6px;
    gap: 10px;
    &.selected {
      background: var(--color-40-rgb);
    }
    .icon {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      background: url(${({ icon }) => icon}) center/cover no-repeat;
    }
  }
  .status-wrapper {
    margin-left: auto;
    .status-wrapper-label {
      opacity: 0.5;
      font-size: 11px;
      line-height: 15px;
      height: 13px;
      font-weight: var(--font-weight-200);
      margin-top: 2px;
    }
  }
  .card-title {
    font-size: 14px;
    line-height: 16.8px;
    font-weight: var(--font-weight-200);
    color: var(--color-2);
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: nowrap;
  }
`;
