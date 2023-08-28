import { styled } from "styled-components";
import applePayIcon from "../../../../assets/images/apple-pay.svg";
import appleIcon from "../../../../assets/images/apple.svg";

export const ApplePay = () => (
  <StyledApplePay className="flex items-center justify-center">
    <img src={appleIcon} alt="" className="icon" />
    <img src={applePayIcon} alt="" className="icon-full" />
  </StyledApplePay>
);

const StyledApplePay = styled.div`
  flex-shrink: 0;
  border-radius: 7px;
  border: 1.2px solid #fff;
  overflow: hidden;
  padding: 6px 6px 3px;
  transition: all 0.3s;
  margin-right: 10px;
  width: 28px;
  height: 28px;
  .icon {
    height: 19px;
  }
  .icon-full {
    display: none;
    width: 46px;
  }
  &:hover {
    background: #000;
    border: 1px solid #000;
    padding: 6px 19px 3px;
    width: auto;
    .icon-full {
      display: block;
    }
    .icon {
      display: none;
    }
  }
`;
