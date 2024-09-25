import styled from "styled-components";

export const OutlineButton = ({ disabled, title, onClick }) => (
  <StyledOutlineButton
    className="flex items-center justify-center"
    disabled={disabled}
    onClick={onClick}
  >
    {title}
  </StyledOutlineButton>
);

const StyledOutlineButton = styled.button`
  height: 38px;
  border: 1px solid var(--color-2);
  font-weight: var(--font-weight-200);
  color: var(--color-2);
  font-size: 15px;
  line-height: 17.7px;
  letter-spacing: 0.02em;
  text-align: center;
  border-radius: 8px;
  width: 120px;
  min-width: max-content;
  padding: 0 25px;
`;
