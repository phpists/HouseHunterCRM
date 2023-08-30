import { styled } from "styled-components";
import { ReactComponent as CheckIcon } from "../../../../../assets/images/circle-green-check.svg";

export const ClosedButton = ({ onClick }) => (
  <StyledClosedButton
    className="flex items-center justify-center"
    onClick={onClick}
  >
    <CheckIcon />
  </StyledClosedButton>
);

const StyledClosedButton = styled.div`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(18.5px);
  cursor: pointer;
  path {
    fill: #fff;
    opacity: 0.4;
  }
`;
