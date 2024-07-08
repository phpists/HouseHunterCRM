import { styled } from "styled-components";
import checkboxIcon from "../assets/images/checkbox-icon.svg";

export const CheckOption = ({
  label,
  className,
  value,
  onChange,
  error,
  onlyCheck,
  small,
}) => {
  return (
    <StyledCheckOption
      className={`flex items-center justify-between checkOptionWrapper ${className} ${
        error && "error-field"
      }`}
      onClick={() => (onChange ? onChange(value === "1" ? "0" : "1") : null)}
      onlyCheck={onlyCheck}
      small={small}
    >
      {label ? <span className="label">{label}</span> : null}
      <button
        className={`flex items-center justify-center ${
          value === "1" && "active"
        }`}
      >
        <img src={checkboxIcon} alt="" />
      </button>
    </StyledCheckOption>
  );
};

const StyledCheckOption = styled.div`
  transition: all 0.3s;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  cursor: pointer;
  ${({ onlyCheck }) =>
    !onlyCheck &&
    `
    padding: 7px 11px;
    border-radius: 9px;
  `}
  .label {
    text-transform: capitalize;
  }
  button {
    width: ${({ small }) => (small ? 14 : 19)}px !important;
    height: ${({ small }) => (small ? 14 : 19)}px !important;
    flex-shrink: 0;
    border-radius: ${({ small }) => (small ? 4 : 5)}px !important;
    border: 1.4px solid #fff;
    transition: all 0.3s;
    flex-shrink: 0;
    padding: 0 !important;
    img {
      opacity: 0;
      transition: all 0.3s;
    }
    &.active {
      background: var(--active-bg) !important;
      img {
        opacity: 1;
      }
    }
  }
  &:hover {
    ${({ onlyCheck }) =>
      !onlyCheck &&
      `
        background: var(--card-bg-2);
    `}
  }
  &.error-field {
    border: 1px solid red;
  }
`;
