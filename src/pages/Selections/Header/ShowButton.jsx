import styled from "styled-components";
import { ReactComponent as EyeIcon } from "../../../assets/images/eye.svg";
import { ReactComponent as EyeCloseIcon } from "../../../assets/images/eye-close.svg";

export const ShowButton = ({ active, onClick }) => (
  <StyledShowButton onClick={onClick}>
    {active ? <EyeIcon /> : <EyeCloseIcon />}
  </StyledShowButton>
);

const StyledShowButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1.4px solid var(--bg-20);
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  svg {
    opacity: 0.4;
    transition: all 0.3s;
  }
  &:hover {
    background: var(--bg-20);
    svg {
      opacity: 1;
    }
  }
  &:active {
    border: 1.2px solid #fff;
  }
`;
