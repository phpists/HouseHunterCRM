import styled from "styled-components";
import { SymbolSelect } from "./SymbolSelect";
import { TypeSelect } from "./TypeSelect";

export const Manage = ({ onChangeCurrency, activeCurrency, priceFor }) => {
  return (
    <StyledManage className="flex items-center">
      <SymbolSelect
        onChangeCurrency={onChangeCurrency}
        activeCurrency={activeCurrency}
      />
      <div className="divider" />
      <TypeSelect priceFor={priceFor} />
    </StyledManage>
  );
};

const StyledManage = styled.div`
  padding: 6px 5px;

  .divider {
    width: 1px;
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    margin: 0 4px;
    flex-shrink: 0;
  }
`;
