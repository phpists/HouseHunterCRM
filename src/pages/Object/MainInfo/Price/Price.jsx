import { styled } from "styled-components";
import { Field } from "../../../../components/Field";
import { Divider } from "./Divider";
import { SymbolSelect } from "./SymbolSelect";
import { TypeSelect } from "./TypeSelect";

export const Price = ({ className }) => {
  return (
    <StyledPrice className={`flex items-center ${className}`}>
      <Field value="22 000₴" label="Ціна" className="field" full />
      <Divider />
      <SymbolSelect />
      <TypeSelect />
    </StyledPrice>
  );
};

const StyledPrice = styled.div`
  border-radius: 10px;
  background: #3d3d3d;
  padding: 8px 15px;
  .field {
    flex-shrink: initial;
    width: 120px;
    .value {
      color: #50f835;
    }
  }
  @media (max-width: 800px) {
    .field {
      width: 77px;
      padding-left: 0;
      padding-right: 0;
      flex-shrink: 0;
      &:hover {
        background: none;
      }
      .edit-btn {
        display: none;
      }
    }
  }
`;
