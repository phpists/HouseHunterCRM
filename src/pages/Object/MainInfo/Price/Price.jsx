import { styled } from "styled-components";
import { Field } from "../../../../components/Field";
import { Divider } from "./Divider";
import { SymbolSelect } from "./SymbolSelect";
import { TypeSelect } from "./TypeSelect";

export const Price = () => {
  return (
    <StyledPrice className="flex items-center">
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
    .value {
      color: #50f835;
    }
  }
`;
