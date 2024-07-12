import { styled } from "styled-components";
import { useState } from "react";
import { Toggle } from "../../../../components/Toggle";
import { NavLink } from "react-router-dom";
import { Button } from "../Button";

export const Dropdown = ({ open, data, onChangeField }) => {
  return (
    <StyledDropdown open={open}>
      <div className="flex items-center justify-between toggle-wrapper">
        <span>Зупинити надсилання</span>
        <Toggle
          value={Number(data?.general_group?.stop_showing) > 0}
          onChange={() =>
            onChangeField("general_group", {
              ...data.general_group,
              stop_showing:
                Number(data?.general_group?.stop_showing) <= 0 ? "1" : "0",
            })
          }
          className={
            Number(data?.general_group?.stop_showing) > 0
              ? "toggle--active "
              : "toggle"
          }
        />
      </div>
      <div className="flex items-center justify-between toggle-wrapper">
        <span>Приховувати опис клієнту</span>
        <Toggle
          value={Number(data?.general_group?.hide_title_client) > 0}
          onChange={() =>
            onChangeField("general_group", {
              ...data.general_group,
              hide_title_client:
                data?.general_group?.hide_title_client === "0" ? "1" : "0",
            })
          }
          className={
            Number(data?.general_group?.hide_title_client) > 0
              ? "toggle--active "
              : "toggle"
          }
        />
      </div>

      <div className="flex items-center justify-between toggle-wrapper">
        <span>Пуста підбірка</span>
        <Toggle
          value={data?.general_group?.folder_empty === "1"}
          onChange={() =>
            onChangeField("general_group", {
              ...data.general_group,
              folder_empty:
                data?.general_group?.folder_empty === "0" ? "1" : "0",
            })
          }
          className={
            data?.general_group?.folder_empty === "1"
              ? "toggle--active "
              : "toggle"
          }
        />
      </div>
      <div className="flex items-center justify-between toggle-wrapper">
        <span>Неактуально</span>
        <Toggle
          value={data?.general_group?.not_actual === "1"}
          onChange={() =>
            onChangeField("general_group", {
              ...data.general_group,
              not_actual: data?.general_group?.not_actual === "0" ? "1" : "0",
            })
          }
          className={
            data?.general_group?.not_actual === "1"
              ? "toggle--active "
              : "toggle"
          }
        />
      </div>
      <div>
        {data?.fields?.[0]?.id_group ? (
          <NavLink
            to={`/selections/${data?.fields?.[0]?.id_group}`}
            title="Перейти в підбірку"
            className="flex items-center justify-between toggle-wrapper"
          >
            <span>Перейти в підбірку</span>
          </NavLink>
        ) : null}
      </div>
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 320px;
  padding: 6px;
  border-radius: 14px;
  background: var(--bg-10);
  z-index: 6;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  backdrop-filter: blur(18.5px);
  color: var(--main-color);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  .toggle-wrapper {
    padding: 8px 10px;
    border-bottom: 1px solid var(--bg-10);
    gap: 10px;
  }
  .toggle {
    background: var(--dark-card-bg);
  }
  .toggle--active {
    background: #35c511;
  }
  .last-option {
    border: none;
  }
  ${({ open }) =>
    open &&
    `
    opacity: 1;
    visibility: visible;
  `}
  @media (min-width: 1350px) {
    display: none;
  }
`;
