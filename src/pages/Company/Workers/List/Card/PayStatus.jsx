import { styled } from "styled-components";
import { handleFormatDate } from "../../../../../utilits";

export const PayStatus = ({ status, billingTo, onOpenTarif }) => (
  <StyledPayStatus
    status={status}
    className="notClickable"
    onClick={onOpenTarif}
  >
    <div className="title notClickable">
      {!status ? (
        "Потребує оплати"
      ) : (
        <>
          <span className="notClickable">Сплачено до</span>{" "}
          {isNaN(billingTo)
            ? billingTo
            : handleFormatDate(Number(billingTo) * 1000, true)}
        </>
      )}
    </div>
    <div className="subtitle notClickable">Білінг</div>
  </StyledPayStatus>
);

const StyledPayStatus = styled.div`
  padding: 7px 10px 6px;
  width: 100%;
  border-radius: 9px;
  transition: all 0.3s;
  text-align: left;
  cursor: pointer;
  .title {
    color: ${({ status }) => (status ? "var(--green-light-2)" : "#ff5151")};
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  span {
    color: var(--green-light-3);
  }
  .subtitle {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  &:hover {
    background: ${({ status }) =>
      status ? "rgba(255,255,255,0.05)" : "#FF43431A"};
  }
`;
