import { styled } from "styled-components";
import { PositionCard } from "./PositionCard";
import { SymbolSelect } from "./SymbolSelect";
import { useEffect, useRef, useState } from "react";

export const Footer = ({
  currency,
  values,
  onChange,
  mainType,
  currencyValue = 1,
  onChangeCurrency,
  onBlur,
  onFocus,
}) => {
  const currencies = ["₴", "$", "€"];
  const [fromInputFocused, setFromInputFocused] = useState(false);
  const [toInputFocused, setToInputFocused] = useState(false);

  const handleBlur = (type) => {
    setTimeout(() => {
      type === "from" && setFromInputFocused(false);
      type === "to" && setToInputFocused(false);
    }, 500);
  };

  const handleFocus = (type) => {
    onFocus && onFocus();
    setFromInputFocused(type === "from");
    setToInputFocused(type === "to");
  };

  useEffect(() => {
    if (!toInputFocused && !fromInputFocused) {
      onBlur();
    }
  }, [fromInputFocused, toInputFocused]);

  return (
    <StyledFooter className="flex items-center">
      <PositionCard
        title="Від"
        onChange={(val) => onChange([val, values[1]])}
        value={values[0]}
        className="from-card"
        mainType={
          mainType ? mainType : currency ? currencies[currencyValue - 1] : null
        }
        onBlur={() => handleBlur("from")}
        onFocus={() => handleFocus("from")}
      />
      <PositionCard
        title="До"
        onChange={(val) => onChange([values[0], val])}
        value={values[1]}
        className="to-card"
        mainType={
          mainType ? mainType : currency ? currencies[currencyValue - 1] : null
        }
        onBlur={() => handleBlur("to")}
        onFocus={() => handleFocus("to")}
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
