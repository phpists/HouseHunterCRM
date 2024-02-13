import { styled } from "styled-components";
import { Button } from "../../../../components/Button";

export const Footer = ({ onReset, onSubmit }) => (
  <StyledFooter className="flex items-center justify-between">
    <Button
      title="Скасувати"
      onClick={onReset}
      outline="true"
      className="btn"
    />
    <Button
      title="Застосувати"
      onClick={onSubmit}
      outline="true"
      className="btn"
    />
  </StyledFooter>
);

const StyledFooter = styled.div`
  margin: 20px;
  .btn {
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    padding: 8px 18px;
    height: 32px;
  }
`;
