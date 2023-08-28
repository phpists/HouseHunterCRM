import { styled } from "styled-components";
import { ReactComponent as CloseIcon } from "../../../../../assets/images/close-edit-profile.svg";

export const Close = ({ onClose }) => (
  <StyledClose onClick={onClose}>
    <CloseIcon />
  </StyledClose>
);

const StyledClose = styled.div`
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    g {
      opacity: 1;
    }
  }
`;
