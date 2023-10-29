import { styled } from "styled-components";
import { PositionCard } from "./PositionCard";
import { SymbolSelect } from "./SymbolSelect";
import { useState } from "react";

export const Footer = ({
  currency,
  values,
  mainType,
  currencyValue = 1,
  onChangeCurrency,
}) => {
  const currencies = ["₴", "$", "€"];

  return (
    <StyledFooter className="flex items-center">
      <PositionCard
        title="Від"
        value={values[0]}
        className="from-card"
        mainType={
          mainType ? mainType : currency ? currencies[currencyValue - 1] : null
        }
      />
      <PositionCard
        title="До"
        value={values[1]}
        className="to-card"
        mainType={
          mainType ? mainType : currency ? currencies[currencyValue - 1] : null
        }
      />
      {currency && (
        <SymbolSelect
          active={currencyValue}
          onChange={(value) => onChangeCurrency(value)}
        />
      )}
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  .from-card {
    margin-right: 10px;
  }

  @media (max-width: 800px) {
    .from-card {
      margin-right: 4px;
    }
    .from-card,
    .to-card {
      min-width: 100px;
    }
  }
`;
