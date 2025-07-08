import { useState } from "react";
import { ReactComponent as Star } from "../../assets/images/star-autoria.svg";
import styled from "styled-components";
import { PositionCard } from "../Ranger/Footer/PositionCard";
import { handleChangeRange } from "../../utilits";

// Styled container for the star rating component
const RatingContainer = styled.div`
  font-family: Arial, sans-serif;
  border-radius: 9px;
  padding: 10px;
  // display: flex;
  display: grid;
  grid-template-columns: 1fr 3fr;
  transition: all 0.1s;
  align-items: center;
  gap: 6px;

  &:hover {
    background: var(--card-bg-2, #969696);
  }

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: start;

    .input {
      width: 100%;
    }
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--main-color, #fff);
  font-family: Open Sans;
  font-size: 12px;
  line-height: 118%;
  letter-spacing: 0.3px;
  text-align: left;
  background: transparent;
  border: none;
  cursor: default;
  border-radius: 9px;
  transition: all 0.1s;
  white-space: nowrap;

  .label {
    white-space: nowrap;
  }

  span {
    font-size: 9px;
    opacity: 0.4;
    white-space: normal;
  }
`;

const Views = ({ data, onChangeFilter, onFocus, onBlur }) => {
  return (
    <RatingContainer>
      <Title>
        <p className="label">Перегляди</p>
      </Title>
      <div className="flex gap-1">
        <PositionCard
          title="Від"
          onFocus={onFocus}
          onBlur={onBlur}
          value={data?.street_base_object?.count_views_from}
          className="input"
          onChange={(val) => {
            onChangeFilter("street_base_object", {
              ...data?.street_base_object,
              count_views_from: val,
            });
          }}
        />
        <PositionCard
          title="До"
          onFocus={onFocus}
          onBlur={onBlur}
          value={data?.street_base_object?.count_views_to}
          className="input w-auto"
          onChange={(val) => {
            onChangeFilter("street_base_object", {
              ...data?.street_base_object,
              count_views_to: val,
            });
          }}
        />
      </div>
    </RatingContainer>
  );
};

export default Views;
