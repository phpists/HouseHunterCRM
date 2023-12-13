import styled from "styled-components";
import { Modal as CreateWorkerModal } from "../CreateUser/Modal/Modal";
import { useState } from "react";
import { Modal } from "../CreateRole/Modal/Modal";
import { useGetAccessQuery } from "../../../../store/auth/auth.api";
import { handleCheckAccess } from "../../../../utilits";

export const MobileHeader = () => {
  const [openCreateWorker, setOpenCreateWorker] = useState(false);
  const [openRoles, setOpenRoles] = useState(false);
  const { data: accessData } = useGetAccessQuery();

  return (
    <StyledMobileHeader>
      {openCreateWorker && (
        <CreateWorkerModal onClose={() => setOpenCreateWorker(false)} />
      )}
      {openRoles && <Modal onClose={() => setOpenRoles(false)} />}
      {handleCheckAccess(accessData, "structure", "add") && (
        <button onClick={() => setOpenCreateWorker(true)}>
          Створити працівника
        </button>
      )}
      {handleCheckAccess(accessData, "structure", "edit") && (
        <button className="active" onClick={() => setOpenRoles(true)}>
          Налаштування ролей
        </button>
      )}
    </StyledMobileHeader>
  );
};

const StyledMobileHeader = styled.div`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  color: #fff;
  text-align: center;
  font-family: Overpass;
  font-size: 13px;
  font-style: normal;
  font-weight: 200;
  line-height: 1;
  letter-spacing: 0.26px;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 10px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.3s;
    height: 31px;
    &:hover,
    &.active {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  @media (min-width: 850px) {
    display: none;
  }
`;
