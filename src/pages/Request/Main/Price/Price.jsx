import { styled } from "styled-components";
import { Ranger } from "../../Ranger/Ranger";

export const Price = () => {
  return (
    <StyledPrice>
      <Ranger
        label="Ціновий діапазон"
        mainTypes={[
          <>
            M<sup>2</sup>
          </>,
          "Обєкт",
        ]}
      />
    </StyledPrice>
  );
};

const StyledPrice = styled.div``;
