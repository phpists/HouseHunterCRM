import styled from "styled-components";

export const OpenButton = ({ onClick }) => (
  <StyledOpenButton onClick={onClick} className="toSelectionBtn">
    Перейти в підбірку
  </StyledOpenButton>
);

const StyledOpenButton = styled.button`
  margin-right: 4px;
  border-radius: 8px;
  background: var(--btn-transparent-bg);
  padding: 9px 18px 10px 18px;
  color: var(--white-color);
  text-align: center;
  leading-trim: both;
  text-edge: cap;
  font-family: Overpass;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 1.8; /* 12.98px */
  letter-spacing: 0.22px;
  transition: all 0.3s;
  height: 34px;
  width: 100%;
  white-space: nowrap;
  &:hover {
    background: rgba(255, 255, 255, 0.38);
    color: var(--main-color);
  }
  @media (max-width: 1520px) {
    font-size: 9px;
    padding: 9px 10px;
  }
  @media (max-width: 500px) {
    padding: 5px;
    font-size: 7px;
  }
`;
