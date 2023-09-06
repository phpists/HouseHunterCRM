import { styled } from "styled-components";
import { StatusButton } from "./StatusButton";
import { Field } from "../../../../components/Field";

export const Header = () => {
  return (
    <StyledHeader className="flex items-center">
      <StatusButton type="not_actual" />
      <Field
        value="23.07.2023"
        label="звільняється з "
        className="header-field"
      />
      <StatusButton type="actual" />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 13px;
  .header-field {
    margin: 0 3px;
    flex-shrink: inherit;
  }
`;
