import { styled } from "styled-components";
import { Field } from "../../../../../../components/Field";
import { ReactComponent as RemoveIcon } from "../../../../../../assets/images/remove.svg";

export const AdditionalPhone = ({ onRemove }) => (
  <StyledAdditionalPhone className="flex items-center">
    <Field value="+38 (097) 707-62-58" label="Телефон" className="field" />
    <div className="divider" />
    <div
      className="remove-btn flex items-center justify-center"
      onClick={onRemove}
    >
      <RemoveIcon />
    </div>
  </StyledAdditionalPhone>
);

const StyledAdditionalPhone = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content max-content;
  .divider {
    width: 1px;
    height: 22px;
    background: #fff;
    margin: 0 6px 0 5px;
    transition: all 0.3s;
    opacity: 0;
  }
  .remove-btn {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 8px;
    flex-shrink: 0;
    transition: all 0.3s;
    cursor: pointer;
    opacity: 0;
    transform: translateX(-10px);
    g {
      transition: all 0.3s;
    }
    &:hover {
      background: rgba(255, 255, 255, 0.2) !important;
      opacity: 1 !important;
      g {
        opacity: 1;
      }
    }
  }
  &:hover {
    .field {
      background: none;
    }
    background: rgba(255, 255, 255, 0.05);
    .remove-btn {
      opacity: 0.4;
      transform: translateX(0px);
    }
    .divider {
      opacity: 0.1;
    }
    .edit-btn {
      opacity: 0.4 !important;
      transform: translateX(0px) !important;
    }
  }
`;
