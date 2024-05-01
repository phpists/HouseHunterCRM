import { useRef } from "react";
import { styled } from "styled-components";

export const PositionCard = ({
  title,
  value,
  className,
  mainType,
  onChange,
  onBlur,
  onFocus,
}) => {
  const inputRef = useRef(null);

  const handlePressEnter = (e) => {
    if (e?.keyCode === 13) {
      onBlur && onBlur();
      inputRef.current.blur();
    }
  };

  return (
    <StyledPositionCard
      className={` flex items-baseline justify-between select-none ${className}`}
      onClick={() => inputRef.current.focus()}
    >
      <div className="title">{title}</div>
      <div className="value">
        <input
          value={
            Number(value) === 0 || !value
              ? ""
              : Number(value).toString() ?? undefined
          }
          type="number"
          placeholder=""
          onChange={(e) =>
            Number(e.target.value) >= 0
              ? onChange(Number(e.target.value))
              : null
          }
          onBlur={onBlur}
          onFocus={onFocus}
          ref={inputRef}
          onKeyDown={handlePressEnter}
        />
        {mainType ? <span>{mainType}</span> : null}
      </div>
    </StyledPositionCard>
  );
};

const StyledPositionCard = styled.div`
  padding: 3px 10px 1px 7px;
  border-radius: 7px;
  background: var(--bg-5);
  min-width: 113px;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0);
  cursor: pointer;
  .title {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    margin-right: 5px;
  }
  .value {
    color: var(--main-color);
    text-align: right;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    opacity: 0.4;
    transition: all 0.3s;
    input {
      width: 60px;
      margin-right: 0px;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
      }

      &[type="number"] {
        -moz-appearance: textfield; /* Firefox */
      }
    }
  }
  &:hover {
    border: 1px solid var(--bg-20);
    .value {
      opacity: 1;
    }
  }
  span {
    margin-left: 3px;
  }
  @media (max-width: 800px) {
    padding: 4px;
  }
`;
