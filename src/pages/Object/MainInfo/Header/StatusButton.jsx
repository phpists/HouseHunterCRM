import { useState } from "react";
import { styled } from "styled-components";

const TYPES = {
  actual: {
    title: "Актуально",
    background: "rgba(80, 248, 53, 0.25)",
    color: "#50F835",
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
  padding: 10px 10px;
  border-radius: 6px;
  width: 150px;
  height: 46px;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  text-transform: uppercase;
  transition: all 0.3s;
  flex-shrink: 0;
  white-space: nowrap;
  width: auto;
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
  @media (max-width: 1300px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    font-size: 11px;
  }
`;
