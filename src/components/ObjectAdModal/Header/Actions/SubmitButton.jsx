import styled from "styled-components";

export const SubmitButton = ({ onClick, disabled }) => (
  <StyledSubmitButton
    className="flex items-center justify-center"
    onClick={onClick}
    disabled={disabled}
  >
    Рекламувати
  </StyledSubmitButton>
);

const StyledSubmitButton = styled.button`
  padding: 0 12px;
  background: #5d63ffb2;
  font-family: Overpass;
  font-size: 15px;
  font-weight: var(--font-weight-200);
  color: var(--color-2);
  line-height: 17.7px;
  letter-spacing: 0.02em;
  border-radius: 8px;
  height: 38px;
`;
