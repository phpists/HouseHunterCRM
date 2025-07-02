import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../../../assets/images/close.svg";
import { handleCopy } from "../../../../utilits";

export const Tag = ({
  Icon,
  title,
  titleHtml,
  subtitle,
  hoverTitle,
  className,
  iIcom,
  onRemove,
  copy,
  сopyValue,
  onClick,
}) => (
  <StyledTag
    className={`flex items-center clickable select-none ${className}`}
    title={hoverTitle ?? title}
    onClick={(e) => {
      onClick && onClick();
      return copy
        ? (() => {
            e.stopPropagation();
            handleCopy(сopyValue ?? title);
          })()
        : null;
    }}
  >
    {Icon ? Icon : null}
    {iIcom ? <i className={iIcom} /> : null}
    <div className="title clickable">
      {title}
      {titleHtml}
      {subtitle}
    </div>
    {onRemove ? (
      <button
        className="flex items-center justify-center notClickable !m-0"
        onClick={onRemove}
      >
        <CloseIcon className="notClickable  !m-0" />
      </button>
    ) : null}
  </StyledTag>
);

const StyledTag = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 6px;
  border-radius: 5px;
  background: var(--tag-bg-2);
  color: var(--tag-color-2);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 1;
  letter-spacing: 0.22px;
  height: max-content;

  svg {
    margin-right: 4px;
    height: 12px;
    width: 12px;
  }
  &.green {
    background: var(--green-tag-bg);
  }
`;
