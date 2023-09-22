import styled from "styled-components";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";

export const ShowMore = () => {
  return (
    <StyledShowMore>
      <Button />
      <Dropdown />
    </StyledShowMore>
  );
};

const StyledShowMore = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
`;