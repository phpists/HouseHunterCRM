import styled from "styled-components";

export const Button = ({ onClick, disabled, title, cancel }) => (
  <StyledButton onClick={onClick} disabled={disabled} cancel={cancel}>
    {title}
  </StyledButton>
);

const StyledButton = styled.button`
  border-radius: 8px;
  background: ${({ cancel }) =>
    cancel ? "rgba(255, 255, 255, 0.6)" : "rgba(93, 99, 255, 0.7)"};
  padding: 9px 18px;
  color: ${({ cancel }) => (cancel ? "rgb(44, 44, 44)" : "#fff")};
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 1; /* 17.7px */
  letter-spacing: 0.3px;
  transition: all 0.3s;
  width: 100%;
  height: 38px;
  &:hover {
    background: ${({ cancel }) =>
      cancel ? "rgba(255, 255, 255, 1)" : "rgba(93, 99, 255, 1)"};
  }
`;
