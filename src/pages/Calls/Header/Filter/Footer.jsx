import { styled } from "styled-components";
import { Button } from "../../../../components/Button";

export const Footer = ({ onApplyFilter, disabled }) => (
  <StyledFooter className="flex items-center justify-between">
    <Button
      title="Застосувати"
      onClick={() => onApplyFilter(true)}
      className="btn enter-btn"
      disabled={disabled}
    />
    <Button
      title="Скасувати"
      onClick={() => onApplyFilter(false)}
      className="btn cancel-btn"
    />
  </StyledFooter>
);

const StyledFooter = styled.div`
  margin: 20px;
  .btn {
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
  }
  .enter-btn {
    margin-right: 25px;
  }
  .cancel-btn {
    background: var(--bg-60);
  }
`;
