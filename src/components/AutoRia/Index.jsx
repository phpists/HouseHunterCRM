import { useState } from "react";
import { ReactComponent as Star } from "../../assets/images/star-autoria.svg";
import styled from "styled-components";
import { PositionCard } from "../Ranger/Footer/PositionCard";

// Styled container for the star rating component
const RatingContainer = styled.div`
  max-width: 600px;
  font-family: Arial, sans-serif;
  border-radius: 9px;
  padding: 10px;
  // display: flex;
  display: grid;
  grid-template-columns: 3fr 1fr;
  border: 1px solid transparent;
  transition: all 0.1s;
  align-items: center;
  gap: 10px;

  &:hover {
    background: var(--card-bg-2, #969696);
  }
`;

const StarWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

// Styled star icon
const StyledStar = styled(Star)`
  width: 100%;
  height: 100%;
  fill: ${(props) => props.filled && "#969696"};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:hover ~ & {
    opacity: 1;
    fill: #969696;
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

const Index = ({ data, onChange, onBlur }) => {
  const [rating, setRating] = useState(
    data?.street_base_object?.index_overbuying_from
  );
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (index) => {
    const newRating = rating !== index + 1 ? index + 1 : undefined;
    onChange("street_base_object", {
      ...data?.street_base_object,
      index_overbuying_from: newRating,
    });
    setRating(newRating);
  };

  const handleStarHover = (index) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <RatingContainer>
      <Title>
        <p className="label">Індекс зацікавленості</p>
        <span>
          * {data?.street_base_object?.index_overbuying_from || 0}/10 це авто,
          де найбільший % лайків{" "}
        </span>
      </Title>
      <PositionCard
        title="iз 10"
        value={data?.street_base_object?.index_overbuying_from}
        className="w-full !justify-start"
        error={data?.street_base_object?.index_overbuying_from > 10}
        onChange={(val) => {
          onChange("street_base_object", {
            ...data?.street_base_object,
            index_overbuying_from: val,
          });
        }}
        onBlur={() => {
          onBlur();
          if (data?.street_base_object?.index_overbuying_from > 10) {
            onChange("street_base_object", {
              ...data?.street_base_object,
              index_overbuying_from: 10,
            });
          }
        }}
      />
      {/* <StarWrapper onMouseLeave={handleMouseLeave}>
        {[...Array(10)].map((_, index) => (
          <StyledStar
            key={index}
            filled={(hoverRating || rating) > index}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
          />
        ))}
      </StarWrapper> */}
    </RatingContainer>
  );
};

export default Index;
