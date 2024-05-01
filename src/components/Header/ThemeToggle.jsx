import { useState } from "react";
import styled from "styled-components";
import sun from "../../assets/images/sun.svg";
import moon from "../../assets/images/moon.svg";
import { useActions } from "../../hooks/actions";
import { useAppSelect } from "../../hooks/redux";
import { handleSetTheme } from "../../utilits";

export const ThemeToggle = () => {
  const { changeTheme } = useActions();
  const { theme } = useAppSelect((state) => state.auth);

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    changeTheme(newTheme);
    handleSetTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <StyledThemeToggle
      className="flex items-center"
      active={theme === "dark"}
      onClick={handleToggle}
    >
      <div className="flex items-center justify-center">
        <img
          src={sun}
          alt=""
          className={`icon sun ${theme !== "dark" && "active"}`}
        />
        <img
          src={moon}
          alt=""
          className={`icon moon ${theme === "dark" && "active"}`}
        />
      </div>
    </StyledThemeToggle>
  );
};

const StyledThemeToggle = styled.div`
  padding: 2px;
  height: 20px;
  width: 34px;
  border-radius: 16px;
  background: ${({ active }) => (active ? "#7B80FF" : "#00000029")};
  justify-content: ${({ active }) => (active ? "end" : "start")};
  cursor: pointer;
  transition: all 0.5s;
  div {
    height: 16px;
    width: 16px;
    background: #ffffff;
    padding: 3px;
    border-radius: 100%;
    position: relative;
    overflow: hidden;
  }
  .sun {
    transform: translate(11%, 66%);
  }
  .moon {
    transform: translate(-156%, 10%);
  }
  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transition: all 0.5s;
    &.active {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
`;
