import { styled } from "styled-components";
import { Button } from "../../Button";

export const BillButton = ({ onClick }) => (
  <StyledBillButton className="bill-btn" onClick={onClick}>
    <Button title="Поповнити" outline="true" className="pay-btn" />
  </StyledBillButton>
);

const StyledBillButton = styled.div`
  transition: all 0.3s;
  opacity: 0;
  position: absolute;
  right: 16px;
  top: 16px;
  .pay-btn {
    height: 32px;
    padding: 7px 17px 5px;
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    letter-spacing: 0.24px;
    margin-left: 26px;
  }
`;
