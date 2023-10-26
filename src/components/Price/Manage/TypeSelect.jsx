import { useState } from "react";
import { styled } from "styled-components";

export const TypeSelect = ({ priceFor }) => {
  const options = [
    { title: "За м²", value: 1 },
    { title: "За Сотку", value: 2 },
    { title: "За гектар", value: 3 },
    { title: "За об’єкт", value: 4 },
  ];

  return (
    <StyledTypeSelect>
      {options
        .filter((opt) => priceFor === opt.value)
        .map((opt, i) => (
          <div
            key={i}
            className={`flex items-end justify-center ${
              priceFor === opt.value && "active"
            }`}
            //   onClick={() => setActive(i)}
          >
            {opt.title}
          </div>
        ))}
    </StyledTypeSelect>
  );
};

const StyledTypeSelect = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
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
    &.active {
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
`;
