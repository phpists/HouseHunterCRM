import { styled } from "styled-components";
import { Ranger } from "../../../../components/Ranger/Ranger";
import { PRICES_FOR_TITLE_FILTERS } from "../../../../constants";

export const Price = ({
  values,
  onChange,
  currency,
  onChangeCurrency = () => null,
  error,
  isType,
  allTypes,
  rubricId,
  typeValue,
  onChangeType,
  typeError,
  onBlur,
  onFocus,
  hideCurrency,
}) => {
  return (
    <StyledPrice
      error={error?.toString()}
      className={`${error && "error-field"}`}
    >
      <Ranger
        label="Ціна"
        typeValue={typeValue}
        onChangeType={onChangeType}
        max={1000000}
        values={values}
        onChange={onChange}
        currencyValue={currency}
        onChangeCurrency={(val) => onChangeCurrency(val)}
        typeError={typeError}
        onFocus={onFocus}
        onBlur={onBlur}
        noRange
      />
    </StyledPrice>
  );
};

const StyledPrice = styled.div`
  border-radius: 9px;
  ${({ error }) => error === "true" && "border: 1px solid red;"}
`;
