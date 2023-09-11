import { styled } from "styled-components";
import { ReactComponent as CloseIcon } from "../../../../../assets/images/close.svg";

export const Close = ({ onClose }) => (
  <StyledClose className="flex items-center justify-center" onClick={onClose}>
    <CloseIcon />
  </StyledClose>
);

const StyledClose = styled.div`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 5px;
  backdrop-filter: blur(18.5px);
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    g {
      opacity: 1;
    }
  }
`;
