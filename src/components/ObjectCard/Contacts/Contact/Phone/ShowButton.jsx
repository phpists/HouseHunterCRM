import styled from "styled-components";
import { Button } from "../../../../Button";

export const ShowButton = ({
  onClick,
  className,
  title = "Показати телефон",
  error,
}) => (
  <StyledShowButton
    onClick={onClick}
    className={`${className}`}
    error={error?.toString()}
  >
    <span>{title}</span>
  </StyledShowButton>
);

const StyledShowButton = styled.button`
  border-radius: 8px;
  padding: 9px 18px 6px 18px;
  background: rgba(255, 255, 255, 0.18);
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  transition: all 0.3s;
  height: 38px;
  &:hover {
    background: rgba(255, 255, 255, 0.38);
    color: rgba(255, 255, 255, 1);
  }
  ${({ error }) =>
    error === "true" &&
    `
    color: #ff4343 !important;
    background: rgba(255, 67, 67, 0.3) !important;
    cursor: not-allowed;
  `}

  @media (max-width: 500px) {
    width: max-content;
  }
`;
