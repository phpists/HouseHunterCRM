import { useState } from "react";
import { ReactComponent as Star } from "../../assets/images/star-autoria.svg";
import styled from "styled-components";
import { PositionCard } from "../Ranger/Footer/PositionCard";
import { handleChangeRange } from "../../utilits";

// Styled container for the star rating component
const RatingContainer = styled.div`
  max-width: 600px;
  font-family: Arial, sans-serif;
  border-radius: 9px;
  padding: 10px;
  display: flex;
  border: 1px solid transparent;
  transition: all 0.1s;
  align-items: center;
  gap: 10px;

  &:hover {
    background: var(--card-bg-2, #969696);
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

const Authors = ({ data, onChangeFilter, onFocus, onBlur }) => {
  return (
    <RatingContainer>
      <Title>
        <p className="label">ТОП авторіа</p>
      </Title>
      <PositionCard
        title="Від"
        onFocus={onFocus}
        onBlur={onBlur}
        value={data?.street_base_object?.top_autoria_order_from}
        className="w-full !justify-start"
        onChange={(val) => {
          onChangeFilter("street_base_object", {
            ...data?.street_base_object,
            top_autoria_order_from: val,
          });
        }}
      />
    </RatingContainer>
  );
};

export default Authors;
