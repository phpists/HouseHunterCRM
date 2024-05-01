import { styled } from "styled-components";

export const Footer = ({ onChangeActive, onClose }) => (
  <StyledFooter>
    <div onClick={onChangeActive}>Відмінити</div>
    <div onClick={onClose}>Закрити</div>
  </StyledFooter>
);

const StyledFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  div {
    color: var(--main-color);
    text-align: center;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    opacity: 0.4;
    transition: all 0.3s;
    padding: 6px 10px 5px;
    &:hover {
      opacity: 1;
      background: var(--card-bg-2);
    }
    &:first-child {
      border-right: 1px solid var(--bg-10);
    }
  }
`;
