import styled from "styled-components";
import { Loader } from "../../../../../components/Loader";

export const Footer = ({ onSave, onCancel, loading }) => (
  <StyledFooter>
    <button className="submit-btn" onClick={onSave} disabled={loading}>
      {loading ? <Loader className="loader-wrapper" /> : "Застосувати"}
    </button>
    <button className="cancel-btn" onClick={onCancel} disabled={loading}>
      Скасувати
    </button>
  </StyledFooter>
);

const StyledFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin: 20px;
  button {
    padding: 7px 20px 6px 20px;
    border-radius: 6px;
    color: #2c2c2c;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    height: 30px;
    .loader-wrapper {
      width: 120px;
    }
  }

  .submit-btn {
    color: #2c2c2c;
    border: 1.6px solid #fff;
    background: var(--active-bg);
  }
  .cancel-btn {
    color: #ff4343;
    background: rgba(255, 67, 67, 0.3);
  }
`;
