import { styled } from "styled-components";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { Divider } from "./Divider";

export const MoreButton = ({ className }) => {
  return (
    <StyledMoreButton className="flex items-center more">
      <div className="btn-wrapper relative">
        <Button />
        <Dropdown />
      </div>
      <Divider />
    </StyledMoreButton>
  );
};

const StyledMoreButton = styled.div`
  position: relative;
  transition: all 0.3s;
  z-index: 2;
  opacity: 0;
  transform: translateX(-10px);
  .btn-wrapper:hover {
    .dropdown {
      opacity: 1;
      visibility: visible;
    }
  }
`;
