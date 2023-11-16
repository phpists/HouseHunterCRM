import styled from "styled-components";

export const FooterDelete = ({ noDelete, onSave, onReset }) => (
  <StyledFooter noDelete={noDelete}>
    <button className="submit-btn" onClick={onSave}>
      Застосувати
    </button>
    {!noDelete && (
      <button className="cancel-btn" onClick={onReset}>
        Видалити
      </button>
    )}
  </StyledFooter>
);

const StyledFooter = styled.div`
  display: grid;
  grid-template-columns: ${({ noDelete }) => (noDelete ? "1fr" : "1fr 1fr")};
  gap: 14px;
  button {
    padding: 7px 20px 6px 20px;
    border-radius: 6px;
    color: #2c2c2c;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }

  .submit-btn {
    color: #2c2c2c;
    border: 1.6px solid #fff;
    background: #fff;
  }
  .cancel-btn {
    color: #ff4343;
    background: rgba(255, 67, 67, 0.3);
  }
`;
