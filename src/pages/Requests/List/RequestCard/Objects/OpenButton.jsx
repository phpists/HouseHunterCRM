import styled from "styled-components";

export const OpenButton = ({ link }) => (
  <StyledOpenButton href={link} className="toSelectionBtn">
    Перейти в добірку
  </StyledOpenButton>
);

const StyledOpenButton = styled.a`
  margin-right: 20px;
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
  font-weight: var(--font-weight-100);
  line-height: 1.8; /* 12.98px */
  letter-spacing: 0.22px;
  transition: all 0.3s;
  height: 34px;
  width: 100%;
  &:hover {
    background: rgba(255, 255, 255, 0.38);
    color: var(--main-color);
  }
`;
