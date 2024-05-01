import styled from "styled-components";
import { ReactComponent as Client } from "../../../assets/images/client.svg";

export const ClientButton = ({ active, onClick }) => (
  <StyledClientButton onClick={onClick} className={`${active && "active"}`}>
    <Client />
  </StyledClientButton>
);

const StyledClientButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1.4px solid var(--bg-20);
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  margin-right: 40px;
  svg {
    opacity: 0.4;
    transition: all 0.3s;
  }
  &:hover,
  &.active {
    background: var(--bg-20);
    svg {
      opacity: 1;
    }
  }
  &:active {
    border: 1.2px solid #fff;
  }
`;
