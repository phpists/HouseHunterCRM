import { styled } from "styled-components";

export const StartButton = ({ onClick }) => (
  <StyledStartButton
    className="flex items-center justify-center"
    onClick={onClick}
  >
    Почати ведення
  </StyledStartButton>
);

const StyledStartButton = styled.button`
  border-radius: 14px;
  background: var(--bg-10);
  padding: 14px 10px 11px;
  color: var(--second-color);
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  transition: all 0.3s;
  width: 100%;
  &:hover {
    border: 1.6px solid #fff;
    color: var(--main-color);
  }
`;
