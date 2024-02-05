import { styled } from "styled-components";
import checkboxIcon from "../assets/images/checkbox-icon.svg";

export const CheckOption = ({ label, className, value, onChange, error }) => {
  return (
    <StyledCheckOption
      className={`flex items-center justify-between ${className} ${
        error && "error-field"
      }`}
    >
      <span className="label">{label}</span>
      <button
        className={`flex items-center justify-center ${
          value === "1" && "active"
        }`}
        onClick={() => (onChange ? onChange(value === "1" ? "0" : "1") : null)}
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
  color: #fff;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 100;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  .label {
    text-transform: capitalize;
  }
  button {
    width: 19px;
    height: 19px;
    flex-shrink: 0;
    border-radius: 5px;
    border: 1.4px solid #fff;
    transition: all 0.3s;
    img {
      opacity: 0;
      transition: all 0.3s;
    }
    &.active {
      background: #fff;
      img {
        opacity: 1;
      }
    }
  }
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  &.error-field {
    border: 1px solid red;
  }
`;
