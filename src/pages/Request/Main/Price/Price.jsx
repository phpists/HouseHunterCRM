import { styled } from "styled-components";
import { Ranger } from "../../../../components/Ranger/Ranger";
import { PRICES_FOR_TITLE } from "../../../../constants";

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
}) => {
  return (
    <StyledPrice
      error={error?.toString()}
      className={`${error && "error-field"}`}
    >
      <Ranger
        label="Ціновий діапазон"
        mainTypes={
          !isType
            ? undefined
            : !rubricId
            ? PRICES_FOR_TITLE
            : rubricId === "65" || rubricId === "66"
            ? [
                {
                  title: "Об'єкт",
                  value: "4",
                },
                {
                  title: "Сотка",
                  value: "2",
                },
                {
                  title: "Гектар",
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
              ]
        }
        typeValue={typeValue}
        onChangeType={onChangeType}
        currency
        big
        max={1000000}
        values={values}
        onChange={onChange}
        currencyValue={currency}
        onChangeCurrency={(val) => onChangeCurrency(val)}
        typeError={typeError}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </StyledPrice>
  );
};

const StyledPrice = styled.div`
  border-radius: 9px;
  ${({ error }) => error === "true" && "border: 1px solid red;"}
`;
