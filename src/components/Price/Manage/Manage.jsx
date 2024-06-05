import styled from "styled-components";
import { SymbolSelect } from "./SymbolSelect";
import { TypeSelect } from "./TypeSelect";
import { ReactComponent as CloseIcon } from "../../../assets/images/close.svg";

export const Manage = ({
  onChangeCurrency,
  activeCurrency,
  priceFor,
  type,
  onChangeType,
  rubricId,
  onClose,
  noSelectCurrency,
  allTypes,
}) => {
  return (
    <>
      <StyledManage className="flex items-center">
        {noSelectCurrency ? null : (
          <SymbolSelect
            onChangeCurrency={onChangeCurrency}
            activeCurrency={activeCurrency}
          />
        )}
        {type ? (
          <>
            {noSelectCurrency ? null : <div className="divider" />}
            <TypeSelect
              type={type}
              onChangeType={onChangeType}
              rubricId={rubricId}
              allTypes={allTypes}
            />
          </>
        ) : null}
      </StyledManage>
      <CloseIcon className="close-icon" onClick={onClose} />
    </>
  );
};

const StyledManage = styled.div`
  padding: 6px 5px;

  .divider {
    width: 1px;
    height: 20px;
    background: var(--bg-10);
    margin: 0 4px;
    flex-shrink: 0;
  }
`;
