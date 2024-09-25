import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../assets/images/close-.svg";

export const CloseButton = ({ onClick }) => (
  <StyledCloseButton
    className="flex items-center justify-center"
    onClick={onClick}
  >
    <CloseIcon />
  </StyledCloseButton>
);

const StyledCloseButton = styled.button`
  padding: 14px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 30px;
  svg {
    height: 22px;
  }
`;
