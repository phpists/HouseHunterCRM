import { styled } from "styled-components";
import { Ranger } from "../../../../components/Ranger/Ranger";

export const Price = ({
  values,
  onChange,
  currency,
  onChangeCurrency = () => null,
  error,
}) => {
  return (
    <StyledPrice
      error={error?.toString()}
      className={`${error && "error-field"}`}
    >
      <Ranger
        label="Ціновий діапазон"
        // mainTypes={[
        //   <>
        //     M<sup>2</sup>
        //   </>,
        //   "Обєкт",
        // ]}
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

const StyledPrice = styled.div`
  border-radius: 9px;
  ${({ error }) => error === "true" && "border: 1px solid red;"}
`;
