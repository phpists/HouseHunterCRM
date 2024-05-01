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
  color: var(--second-color);
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;

  span {
    color: var(--white-color);
  }
  .error {
    color: #ff4343;
    font-weight: 400;
  }
  @media (max-width: 500px) {
    font-size: 7px !important;
  }
`;
