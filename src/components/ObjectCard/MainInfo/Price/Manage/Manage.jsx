import styled from "styled-components";
import { SymbolSelect } from "./SymbolSelect";
import { TypeSelect } from "./TypeSelect";

export const Manage = () => {
  return (
    <StyledManage className="flex items-center">
      <SymbolSelect />
      <div className="divider" />
      <TypeSelect />
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
