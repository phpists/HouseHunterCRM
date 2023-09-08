import { styled } from "styled-components";
import { PositionCard } from "./PositionCard";
import { SymbolSelect } from "./SymbolSelect";

export const Footer = ({ currency, values, mainType }) => {
  return (
    <StyledFooter className="flex items-center">
      <PositionCard
        title="Від"
        value={values[0]}
        className="mr-2.5"
        mainType={mainType}
      />
      <PositionCard title="До" value={values[1]} mainType={mainType} />
      {currency && <SymbolSelect />}
    </StyledFooter>
  );
};

const StyledFooter = styled.div``;
