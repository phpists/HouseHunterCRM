import { styled } from "styled-components";
import { NoRole } from "./NoRole";
import { ActiveRole } from "./ActiveRole";
import { Dropdown } from "./Dropdown";

export const Role = () => (
  <StyledRole>
    {/* <NoRole /> */}
    <ActiveRole />
    <Dropdown />
  </StyledRole>
);

const StyledRole = styled.button`
  position: relative;
  &:focus {
    .active-role {
      border-radius: 7px 7px 0 0;
    }
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
`;
