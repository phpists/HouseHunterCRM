import styled from "styled-components";

export const Button = ({ onClick, disabled, title, cancel }) => (
  <StyledButton onClick={onClick} disabled={disabled} cancel={cancel}>
    {title}
  </StyledButton>
);

const StyledButton = styled.button`
  border-radius: 8px;
  background: ${({ cancel }) => (cancel ? "var(--bg-60)" : " var(--blue);")};

  padding: 9px 18px;
  color: ${({ cancel }) => (cancel ? "rgb(44, 44, 44)" : "#FFF")};
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 1; /* 17.7px */
  letter-spacing: 0.3px;
  transition: all 0.3s;
  width: 100%;
  height: 38px;
  &:hover {
    color: ${({ cancel }) => (cancel ? "var(--btn-color-hover-44)" : "#FFF")};
    background: ${({ cancel }) =>
      cancel ? "var(--color-2)" : "rgba(93, 99, 255, 1)"};
  }
`;
