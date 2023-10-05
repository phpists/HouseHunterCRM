import { styled } from "styled-components";
import googlePayIcon from "../../../../assets/images/google-pay.svg";
import googleIcon from "../../../../assets/images/google.svg";

export const GooglePay = () => (
  <StyledGooglePay className="flex items-center justify-center">
    <img src={googleIcon} alt="" className="icon" />
    <img src={googlePayIcon} alt="" className="icon-full" />
  </StyledGooglePay>
);

const StyledGooglePay = styled.div`
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
    width: 49px;
  }

  @media (min-width: 600px) {
    &:hover {
      background: #fff;
      padding: 6px 19px 3px;
      width: auto;
      .icon-full {
        display: block;
      }
      .icon {
        display: none;
      }
    }
  }
`;
