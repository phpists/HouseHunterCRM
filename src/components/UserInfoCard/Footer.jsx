import { styled } from "styled-components";
import { Button } from "../Button";

export const Footer = ({ onSave, onReset, loading }) => (
  <StyledFooter className="flex items-center justify-between">
    <Button
      title="Застосувати"
      onClick={onSave}
      className="btn enter-btn"
      loading={loading}
    />
    <Button title="Скасувати" onClick={onReset} className="btn cancel-btn" />
  </StyledFooter>
);

const StyledFooter = styled.div`
  .btn {
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.3px;
    padding: 7px 20px 6px 20px;
    height: 31px;
    width: 50%;
    flex-shrink: 1;
    background: rgba(255, 255, 255, 0.6);
    &:hover {
      background: rgba(255, 255, 255, 1);
    }
  }
  .enter-btn {
    margin-right: 25px;
  }
`;
