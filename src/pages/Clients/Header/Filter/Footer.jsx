import { styled } from "styled-components";
import { Button } from "../../../../components/Button";

export const Footer = () => (
  <StyledFooter className="flex items-center justify-between">
    <Button title="Скасувати" onClick={null} outline="true" className="btn" />
    <Button title="Застосувати" onClick={null} outline="true" className="btn" />
  </StyledFooter>
);

const StyledFooter = styled.div`
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
