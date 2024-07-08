import { useState } from "react";
import { styled } from "styled-components";

const TYPES = {
  actual: {
    title: "Актуально",
    background: "rgba(80, 248, 53, 0.25)",
    color: "var(--green-light-2)",
  },
  not_actual: {
    title: "Не актуально",
    background: "rgba(255, 29, 29, 0.25)",
    color: "#FF1D1D",
  },
};
export const StatusButton = ({ type, active, onChange }) => {
  return (
    <StyledStatusButton
      type={TYPES[type]}
      className={`flex items-center justify-center ${active && "active"}`}
      onClick={onChange}
    >
      {TYPES[type].title}
    </StyledStatusButton>
  );
};

const StyledStatusButton = styled.button`
  padding: 14px 36px;
  border-radius: 6px;
  background: var(--bg-15);
  color: var(--color-5);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  text-transform: uppercase;
  transition: all 0.3s;
  white-space: nowrap;
  margin-right: 10px;
  height: 38px;
  width: 160px;
  &:hover {
    color: ${({ type }) => type.color};
    background: ${({ type }) => type.background};
    opacity: 0.5;
  }

  &.active {
    color: ${({ type }) => type.color};
    background: ${({ type }) => type.background};
    opacity: 1 !important;
  }

  @media (max-width: 800px) {
    font-size: 11px;
    width: 50%;
    margin: 0;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;
