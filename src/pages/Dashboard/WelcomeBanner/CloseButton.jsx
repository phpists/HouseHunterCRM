import styled from "styled-components";
import closeIcon from "../../../assets/images/close-welcome.svg";

export const CloseButton = ({ onClose }) => (
  <StyledCloseButton onClick={onClose}>
    <img src={closeIcon} alt="" />
  </StyledCloseButton>
);

const StyledCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;
