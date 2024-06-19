import { styled } from "styled-components";
import checkboxIcon from "../assets/images/checkbox-icon.svg";

export const CheckOption = ({ label, className, value, onChange, error }) => {
  return (
    <StyledCheckOption
      className={`flex items-center justify-between checkOptionWrapper ${className} ${
        error && "error-field"
      }`}
      onClick={() => (onChange ? onChange(value === "1" ? "0" : "1") : null)}
    >
      <span className="label">{label}</span>
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
  padding: 7px 11px;
  border-radius: 9px;
  transition: all 0.3s;
  color: var(--main-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  cursor: pointer;
  .label {
    text-transform: capitalize;
  }
  button {
    width: 19px !important;
    height: 19px !important;
    flex-shrink: 0;
    border-radius: 5px !important;
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
    background: var(--card-bg-2);
  }
  &.error-field {
    border: 1px solid red;
  }
`;
