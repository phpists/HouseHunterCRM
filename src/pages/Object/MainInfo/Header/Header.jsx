import { styled } from "styled-components";
import { StatusButton } from "./StatusButton";
import { Field } from "../../../../components/Field";
import { Date } from "./Date";

export const Header = () => {
  return (
    <StyledHeader className="flex items-center">
      <StatusButton type="actual" />
      <Date />
      <StatusButton type="not_actual" />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 13px;
`;
