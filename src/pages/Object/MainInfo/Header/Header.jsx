import { styled } from "styled-components";
import { StatusButton } from "./StatusButton";
import { Date } from "./Date";

export const Header = ({ className }) => {
  return (
    <StyledHeader className={`flex items-center ${className}`}>
      <StatusButton type="actual" />
      <Date />
      <StatusButton type="not_actual" />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 13px;
`;
