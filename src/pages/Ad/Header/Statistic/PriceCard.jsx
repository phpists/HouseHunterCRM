import styled from "styled-components";
import { Price } from "../../../../components/Price/Price";
import { useState } from "react";
import {
  PRICES_FOR_TITLE,
  PRICES_FOR_TITLE_FILTERS,
} from "../../../../constants";

export const PriceCard = ({ title, cardType, data }) => {
  const [type, setType] = useState("4");
  const [currency, setCurrency] = useState("1");
  const TYPES = [
    "",
    "price_per_metr",
    "price_per_sotka",
    "hektar",
    "per_object_usd",
  ];
  const CURRENCIES = ["uah", "usd", "eur"];

  return (
    <StyledPriceCard>
      <div>{title}</div>
      <Price
        price={data?.[`${cardType}_${TYPES[type]}`]}
        currency={currency}
        onChangeCurrency={(val) => setCurrency(val)}
        priceFor={
          PRICES_FOR_TITLE?.find((p) => p.value === (type || data?.price_for))
            ?.title ?? undefined
        }
        rubricId={data?.id_rubric}
        type={type}
        onChangeType={(val) => setType(val)}
        noSelectCurrency
        allTypes
        noPriceTitle={"0$"}
      />
    </StyledPriceCard>
  );
};

const StyledPriceCard = styled.div`
    margin-bottom: 10px;
`;
