import styled from "styled-components";

export const Footer = () => (
  <StyledFooter>
    <button>Застосувати</button>
    <button className="cancel-btn">Скасувати</button>
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
    background: #fff;
    color: #2c2c2c;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    width: 100%;
  }
  .cancel-btn {
    background: rgba(255, 255, 255, 0.6);
    border: 1.6px solid transparent;
  }
`;
