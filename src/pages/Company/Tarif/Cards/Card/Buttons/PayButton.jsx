import { styled } from "styled-components";
import { Button } from "../../../../../../components/Button";

export const PayButton = ({ onPay }) => (
  <StyledPayButton onClick={onPay}>
    <Button title="Оплатити" className="pay-btn" />
  </StyledPayButton>
);

const StyledPayButton = styled.div`
  .pay-btn {
    padding: 7px 17px 5px;
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%; /* 14.16px */
    letter-spacing: 0.24px;
    height: 26px;
    flex-shrink: 0;
    border-radius: 6px;
    border: 1.2px solid #fff;
    color: #248e09;
    &:hover {
      background: #2fa112;
      color: var(--main-color);
      border: 1.2px solid #248e09;
    }
  }
`;
