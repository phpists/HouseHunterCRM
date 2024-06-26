import { styled } from "styled-components";
import { Types } from "./Types";

export const Header = ({
  label,
  mainTypes,
  typeValue,
  onChangeType,
  typeError,
}) => (
  <StyledHeader className="flex items-center justify-between">
    <div className="label">{label}</div>
    {mainTypes?.length > 0 && (
      <Types
        types={mainTypes}
        typeValue={typeValue}
        onChangeType={onChangeType}
        typeError={typeError}
      />
    )}
  </StyledHeader>
);

const StyledHeader = styled.div`
  margin-bottom: 16px;
  .label {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    z-index: 10;
    position: relative;
    text-transform: capitalize;
  }
`;
