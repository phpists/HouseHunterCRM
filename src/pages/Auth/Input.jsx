import { styled } from "styled-components";
import eye from "../../assets/images/eye.svg";
import eyeClosed from "../../assets/images/eye-close.svg";
import { useState } from "react";
import InputMask from "react-input-mask";

export const Input = ({ placeholder = "", password, className, phone }) => {
  const [showPassword, setShowPassword] = useState(!password);

  return (
    <StyledInput className={`${className}`}>
      {phone ? (
        <InputMask mask="+38(999)999-99-99" placeholder={placeholder} />
      ) : (
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete="off"
        />
      )}
      {password && (
        <img
          src={showPassword ? eye : eyeClosed}
          alt=""
          className="eye"
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </StyledInput>
  );
};

const StyledInput = styled.div`
  position: relative;
  width: 100%;
  input {
    height: 32px;
    padding: 8px 12px 6px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    transition: all 0.3s;
    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    &:hover,
    &:focus {
      background: #ffffff33;
    }
    &:focus {
      color: #2deb1d;
    }
    width: 100%;
  }
  .eye {
    position: absolute;
    right: 7px;
    top: 7px;
    transition: all 0.3s;
    opacity: 0.4;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
`;
