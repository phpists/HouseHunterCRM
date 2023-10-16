import { styled } from "styled-components";
import { Button } from "../../../Button";

export const Footer = () => (
  <StyledFooter className="flex items-center justify-between">
    <Button title="Застосувати" onClick={null} className="btn enter-btn" />
    <Button
      title="Скасувати"
      onClick={null}
      className="btn cancel-btn"
      disabled
    />
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
    width: 100%;
    flex-shrink: 1;
  }
  .enter-btn {
    margin-right: 25px;
  }
  .cancel-btn {
    background: rgba(255, 255, 255, 0.6);
  }
`;
