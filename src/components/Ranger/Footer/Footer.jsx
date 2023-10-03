import { styled } from "styled-components";
import { PositionCard } from "./PositionCard";
import { SymbolSelect } from "./SymbolSelect";
import { useState } from "react";

export const Footer = ({ currency, values, mainType }) => {
  const [activeCurrency, setActiveCurrency] = useState("$");

  return (
    <StyledFooter className="flex items-center">
      <PositionCard
        title="Від"
        value={values[0]}
        className="from-card"
        mainType={mainType ? mainType : currency ? activeCurrency : null}
      />
      <PositionCard
        title="До"
        value={values[1]}
        className="to-card"
        mainType={mainType ? mainType : currency ? activeCurrency : null}
      />
      {currency && (
        <SymbolSelect
          active={activeCurrency}
          onChange={(value) => setActiveCurrency(value)}
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
