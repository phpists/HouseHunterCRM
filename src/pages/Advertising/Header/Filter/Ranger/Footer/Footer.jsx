import { styled } from "styled-components";
import { Label } from "./Label";
import { Value } from "./Value";
import { Types } from "./Types";

export const Footer = ({
  label,
  values,
  types,
  activeType,
  onChangeType,
  type,
}) => (
  <StyledFooter className="flex items-center justify-between">
    <Label label={label} />
    <div className="flex items-center">
      <Value
        from={values[0]}
        to={values[1]}
        type={type ? type : types[activeType] ?? ""}
      />
      {types.length > 0 ? (
        <Types
          types={types}
          activeType={activeType}
          onChangeType={onChangeType}
        />
      ) : null}
    </div>
  </StyledFooter>
);

const StyledFooter = styled.div`
  margin-top: 13px;
`;
