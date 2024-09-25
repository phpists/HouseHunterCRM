import styled from "styled-components";

export const Button = ({ disabled, title, active, onClick }) => (
  <StyledButton
    className={`flex items-center justify-center mt-2 ${active && "active"}`}
    disabled={disabled}
    onClick={onClick}
  >
    {title}
  </StyledButton>
);

const StyledButton = styled.button`
  height: 38px;
  border: 1px solid var(--color-2);
  font-weight: var(--font-weight-200);
  color: var(--color-2);
  font-size: 15px;
  line-height: 17.7px;
  letter-spacing: 0.02em;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  min-width: max-content;
  padding: 0 25px;
  transition: all 0.3s;
  &.active {
    background: var(--color-2);
    color: var(--main-bg);
    font-weight: 700;
  }
`;
