import { styled } from "styled-components";
import { Button } from "../../../components/Button";

export const Footer = ({ onSave, onReset, loading }) => (
  <StyledFooter className="flex items-center justify-between">
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
  margin: 20px;
  .btn {
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.3px;
    padding: 7px 20px 6px 20px;
    height: 31px;
    width: 100%;
    flex-shrink: 1;
    background: var(--bg-60);
    transition: all 0.3s;
    &:hover {
      background: var(--active-bg);
    }
  }
  .enter-btn {
    margin-right: 25px;
  }
`;
