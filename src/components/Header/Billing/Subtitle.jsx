import { styled } from "styled-components";
import { useAppSelect } from "../../../hooks/redux";
import { handleCheckBilling } from "../../../utilits";

export const Subtitle = ({ subtitle }) => {
  const { user } = useAppSelect((state) => state.auth);

  return (
    <StyledSubtitle>
      {subtitle ? (
        subtitle
      ) : handleCheckBilling(user?.billing_to ?? "") ? (
        <>
          Сплачено до <span>{user?.billing_to?.split(" ")[0] ?? ""}</span>
        </>
      ) : (
        <span className="error">Акаунт не оплачений</span>
      )}
    </StyledSubtitle>
  );
};

const StyledSubtitle = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;

  span {
    color: rgba(255, 255, 255, 0.6);
  }
  .error {
    color: #ff4343;
    font-weight: 400;
  }
  @media (max-width: 500px) {
    font-size: 9px !important;
  }
`;
