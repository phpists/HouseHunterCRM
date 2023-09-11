import { styled } from "styled-components";
import { Ranger } from "../../../../components/Ranger/Ranger";

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
        currency
        big
      />
    </StyledPrice>
  );
};

const StyledPrice = styled.div``;
