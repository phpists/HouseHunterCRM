import { styled } from "styled-components";
import smallIcon from "../../../../assets/images/pay.svg";
import icon from "../../../../assets/images/liqPay.svg";
import { useLazyPayByLiqpayQuery } from "../../../../store/billing/billing.api";
import { handleResponse } from "../../../../utilits";
import cogoToast from "cogo-toast";

export const Liqpay = ({ value, onClose, refetchBalance }) => {
  const [pay] = useLazyPayByLiqpayQuery();

  const handlePay = () => {
    if (value > 0) {
      pay({ ammount: value }).then((resp) =>
        handleResponse(resp, () => {
          cogoToast.success("Успішно поповнено", {
            hideAfter: 3,
            position: "top-right",
          });
          onClose();
          refetchBalance();
        })
      );
    } else {
      cogoToast.error("Введіть суму поповнення", {
        hideAfter: 3,
        position: "top-right",
      });
    }
  };

  return (
    <StyledLiqpay
      className="flex items-center justify-center"
      onClick={handlePay}
    >
      <img src={smallIcon} alt="" className="icon" />
      <img src={icon} alt="" className="icon-full" />
    </StyledLiqpay>
  );
};
const StyledLiqpay = styled.div`
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
    height: 100%;
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
