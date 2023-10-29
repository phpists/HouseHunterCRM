import { styled } from "styled-components";
import { Ranger } from "../../../../components/Ranger/Ranger";

export const Price = ({
  values,
  onChange,
  currency,
  onChangeCurrency = () => null,
}) => {
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
        max={1000000}
        values={values}
        onChange={onChange}
        currencyValue={currency}
        onChangeCurrency={(val) => onChangeCurrency(val)}
      />
    </StyledPrice>
  );
};

const StyledPrice = styled.div``;
