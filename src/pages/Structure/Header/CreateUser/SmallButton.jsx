import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../../../assets/images/plus.svg";

export const SmallButton = ({ onClick }) => (
  <StyledSmallButton
    className="flex items-center justify-center"
    onClick={onClick}
  >
    <PlusIcon />
  </StyledSmallButton>
);

const StyledSmallButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1.4px solid var(--bg-20);
  transition: all 0.3s;
  &:hover {
    background: var(--bg-20);
    border: 1.4px solid rgba(255, 255, 255, 0);
    g {
      opacity: 1;
    }
  }
`;
