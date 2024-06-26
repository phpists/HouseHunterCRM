import styled from "styled-components";

export const Footer = ({ onReset, onSave }) => (
  <StyledFooter>
    <button onClick={onSave}>Застосувати</button>
    <button className="cancel-btn" onClick={onReset}>
      Скасувати
    </button>
  </StyledFooter>
);

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 20px 6px;
    border-radius: 6px;
    border: 1.6px solid #fff;
    background: var(--active-bg);
    color: #2c2c2c;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    width: 100%;
  }
  .cancel-btn {
    background: var(--bg-60);
    border: 1.6px solid transparent;
  }
`;
