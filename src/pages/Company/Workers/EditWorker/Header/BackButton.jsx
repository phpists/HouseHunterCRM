import { styled } from "styled-components";
import { ReactComponent as ArrowIcon } from "../../../../../assets/images/arrow-right.svg";

export const BackButton = ({ onClose }) => (
  <StyledBackButton
    className="flex items-center justify-center"
    onClick={onClose}
  >
    <ArrowIcon />
  </StyledBackButton>
);

const StyledBackButton = styled.div`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1.4px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s;
  cursor: pointer;
  g {
    transition: all 0.3s;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    g {
      opacity: 1;
    }
  }
`;
