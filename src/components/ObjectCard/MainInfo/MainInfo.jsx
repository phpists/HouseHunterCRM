import styled from "styled-components";
import { Price } from "../../Price/Price";
import { Tags } from "./Tags/Tags";
import { PRICES_FOR_TITLE } from "../../../constants";

export const MainInfo = ({
  className,
  data,
  currency,
  onChangeCurrency,
  type,
  onChangeType,
}) => {
  const TYPES = ["", "metr", "sotka", "hektar", "object"];
  const CURRENCIES = ["uah", "usd", "eur"];

  return (
    <StyledMainInfo className={`${className} clickable`}>
      <Price
        price={data?.[`price_per_${TYPES[type]}_${CURRENCIES[currency]}`]}
        currency={currency}
        onChangeCurrency={onChangeCurrency}
        priceFor={
          PRICES_FOR_TITLE?.find((p) => p.value === (type || data?.price_for))
            ?.title ?? undefined
        }
        rubricId={data?.id_rubric}
        type={type}
        onChangeType={onChangeType}
      />
      <Tags data={data} />
    </StyledMainInfo>
  );
};

const StyledMainInfo = styled.div`
  padding: 10px;
  border-radius: 9px;
  background: var(--bg-80);
  min-height: 200px;
  margin-right: 10px;
  width: 220px;
  height: 32px;
  @media (max-width: 1399.9px) {
    height: 250px;
    width: calc((100% - 210px - 20px) / 2);
    margin-right: 0;
  }
`;
