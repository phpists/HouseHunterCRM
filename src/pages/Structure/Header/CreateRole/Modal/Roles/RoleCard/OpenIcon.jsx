import styled from "styled-components";
import { ReactComponent as Icon } from "../../../../../../../assets/images/role-icon.svg";

export const OpenIcon = ({ onClick, open }) => (
  <StyledOpenIcon className={`${open && "open"}`} onClick={onClick}>
    <Icon />
  </StyledOpenIcon>
);

const StyledOpenIcon = styled.div`
  cursor: pointer;
  transition: all 0.3s;
  &:hover,
  &.open {
    transform: rotate(135deg);
    g {
      opacity: 1 !important;
      fill: #fff;
    }
    path {
      fill-opacity: 1 !important;
    }
  }
`;
