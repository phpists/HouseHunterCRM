import styled from "styled-components";

export const Footer = ({ onClose, onSubmit, disabled }) => (
  <StyledFooter>
    <button onClick={onClose}>Відмінити</button>
    <button onClick={onSubmit} disabled={disabled}>
      Створити
    </button>
  </StyledFooter>
);

const StyledFooter = styled.div`
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  border-top: 1px solid var(--bg-10);
  display: grid;
  grid-template-columns: 1fr 1fr;
  button {
    padding: 6px 10px 5px;
    transition: all 0.3s;
    color: var(--second-color);
    &:hover {
      background: var(--bg-20);
      color: var(--color-2);
    }
    &:disabled {
      background: rgba(255, 255, 255, 0);
      color: var(--second-color);
    }
  }
  button:nth-child(1) {
    border-right: 1px solid var(--bg-10);
  }
`;
