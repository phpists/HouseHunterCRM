import { styled } from "styled-components";
import { Button } from "../../../components/Button";

export const Footer = ({ onSave, onReset, loading, className }) => (
  <StyledFooter className={`flex items-center justify-between ${className}`}>
    <Button
      title="Зберегти"
      onClick={onSave}
      className="btn enter-btn"
      disabled={loading}
      loading={loading}
    />
    <Button
      title="Скасувати"
      onClick={onReset}
      className="btn cancel-btn"
      disabled={loading}
    />
  </StyledFooter>
);

const StyledFooter = styled.div`
  margin-top: 20px;
  position: relative;
  z-index: 20;
  .btn {
    cursor: pointer;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 1.5;
    letter-spacing: 0.3px;
    padding: 7px 20px 6px 20px;
    height: 31px;
    width: 100%;
    flex-shrink: 1;
    background: var(--bg-60);
    transition: all 0.3s;
    &:hover {
      background: var(--active-bg) !important;
    }
  }
  .enter-btn {
    margin-right: 25px;
  }
`;
