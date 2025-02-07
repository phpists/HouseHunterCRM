import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../../../assets/images/plus.svg";

export const Button = ({ onClick }) => (
  <StyledButton onClick={onClick}>
    <PlusIcon />
  </StyledButton>
);

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1.4px solid var(--bg-20);
  margin-right: 15px;
  &:hover {
    background: var(--bg-20);
    g {
      opacity: 1;
    }
  }
  &:active {
    border: 1.2px solid #fff;
  }
`;
