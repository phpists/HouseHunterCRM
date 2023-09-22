import styled from "styled-components";
import { ReactComponent as Dots } from "../../../../../assets/images/options.svg";
import { Dropdown } from "./SelectItemsDropdown/Dropdown";

export const MoreButton = ({ openMore, onOpenMore }) => (
  <StyledMoreButton
    className={`flex items-center justify-center ${openMore && "open"}`}
    onClick={onOpenMore}
  >
    <Dots />
    {openMore && <Dropdown />}
  </StyledMoreButton>
);

const StyledMoreButton = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1.4px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(18.5px);
  margin: 14px 0 0 20px;
  z-index: 20;
  &:hover,
  &.open {
    border: 1.4px solid rgba(255, 255, 255, 1);
    z-index: 25;
    g {
      opacity: 1;
    }
  }
`;
