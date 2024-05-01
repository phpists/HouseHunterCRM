import { styled } from "styled-components";

export const Button = ({ title, className, disabled, onClick, active }) => (
  <StyledButton
    className={`${className} ${active && "active"}`}
    disabled={disabled}
    onClick={onClick}
  >
    {title}
  </StyledButton>
);

const StyledButton = styled.button`
  color: var(--main-color);
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  padding: 6px 14px 6px;
  border-radius: 8px;
  opacity: 1;
  border: 1px solid transparent;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  leading-trim: both;
  text-edge: cap;
  height: 32px;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 10px;
  border-radius: 8px;
  border: var(--second-color-border);
  opacity: 0.4;
  white-space: nowrap;
  &:hover,
  &.active {
    opacity: 1;
    border: 1px solid rgba(255, 255, 255, 0);
    background: var(--bg-20);
  }
`;
