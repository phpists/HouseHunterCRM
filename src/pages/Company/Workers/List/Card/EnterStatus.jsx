import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useLazyEditProfileQuery } from "../../../../../store/auth/auth.api";
import { useLazyEditWorkerQuery } from "../../../../../store/structure/structure.api";
import { useLazyToggleActiveWorkerStatusQuery } from "../../../../../store/billing/billing.api";
import { handleResponse } from "../../../../../utilits";
import cogoToast from "cogo-toast";

export const EnterStatus = ({ status, id, isCurrentUser }) => {
  const [stat, setStat] = useState(status);
  const [toggleActiveStatus] = useLazyToggleActiveWorkerStatusQuery();

  useEffect(() => {
    setStat(status);
  }, [status]);

  const handleToggleStatus = () => {
    toggleActiveStatus({ id_worker: id, status: stat ? "0" : "1" }).then(
      (resp) =>
        handleResponse(resp, () => {
          setStat(!stat);
          cogoToast.success("Статус успішно змінено", {
            hideAfter: 3,
            position: "top-right",
          });
        })
    );
  };

  return (
    <StyledEnterStatus
      status={stat}
      className="notClickable"
      isCurrentUser={isCurrentUser}
      onClick={isCurrentUser ? () => null : handleToggleStatus}
    >
      <div className="title notClickable">
        {stat ? "Дозволено" : "Заборонено"}
      </div>
      <div className="subtitle notClickable">Вхід</div>
    </StyledEnterStatus>
  );
};

const StyledEnterStatus = styled.div`
  padding: 7px 10px 6px;
  width: 100%;
  border-radius: 9px;
  transition: all 0.3s;
  cursor: pointer;
  text-align: left;
  .title {
    color: ${({ status }) => (status ? "var(--green-light-2)" : "#ff5151")};
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
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
  ${({ isCurrentUser, status }) =>
    !isCurrentUser &&
    `
    &:hover {
    background: ${status ? "rgba(255,255,255,0.05)" : "#FF43431A"}}
  }
  `}
`;
