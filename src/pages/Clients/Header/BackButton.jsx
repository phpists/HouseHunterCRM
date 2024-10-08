import { styled } from "styled-components";
import { ReactComponent as Arrow } from "../../../assets/images/arrow-right.svg";

export const BackButton = ({ onClick }) => (
  <StyledBackButton
    className="flex items-center justify-center"
    onClick={onClick}
  >
    <Arrow />
  </StyledBackButton>
);

const StyledBackButton = styled.button`
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 5px;
  transition: all 0.3s;
  backdrop-filter: blur(18.5px);
  cursor: pointer;
  margin: 0 8px 3px 0;
  flex-shrink: 0;
  g {
    opacity: 1;
  }
  &:hover {
    background: var(--bg-20);
  }
  &:active {
    background: var(--second-color);
  }
`;
