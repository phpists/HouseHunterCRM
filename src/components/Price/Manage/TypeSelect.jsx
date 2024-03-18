import { useState } from "react";
import { styled } from "styled-components";
import { PRICES_FOR_TITLE } from "../../../constants";

export const TypeSelect = ({ type, onChangeType, rubricId }) => {
  const TYPES =
    rubricId === "65" || rubricId === "66"
      ? [
          {
            title: "Об'єкт",
            value: "4",
          },
          {
            title: "100",
            value: "2",
          },
          {
            title: "Га",
            value: "3",
          },
        ]
      : [
          {
            title: "Об'єкт",
            value: "4",
          },
          {
            title: "м²",
            value: "1",
          },
        ];

  return (
    <StyledTypeSelect>
      {TYPES.map((opt, i) => (
        <div
          key={i}
          className={`flex items-end justify-center ${
            type === opt.value && "active"
          }`}
          onClick={() => onChangeType(opt.value)}
        >
          {opt.title}
        </div>
      ))}
    </StyledTypeSelect>
  );
};

const StyledTypeSelect = styled.div`
  display: flex;
  gap: 3px;
  div {
    border-radius: 5px;
    padding: 1px 4px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
    letter-spacing: 0.28px;
    cursor: pointer;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0);
    box-sizing: content-box;
    width: max-content;
    &.active {
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;
