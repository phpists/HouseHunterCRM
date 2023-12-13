import styled from "styled-components";
import { Header } from "./Header";
import { SectionTitle } from "./SectionTitle";
import { TypeSelect } from "./TypeSelect/TypeSelect";
import { Roles } from "./Roles/Roles";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { AddButton } from "./AddButton/AddButton";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../../../../store/structure/structure.api";
import { Confirm } from "../../../../../components/Confirm/Confirm";

export const Modal = ({ onClose }) => {
  const controls = useAnimationControls();
  const { data: level, refetch } = useGetCompanyStructureLevelQuery();
  const { data: levels } = useGetAllPerimissionsLevelsQuery();
  const [confirm, setConfirm] = useState();
  const [confirmFunc, setConfirmFunc] = useState(null);

  const handleGetCurrentLevel = (level) =>
    levels
      ? Object.entries(levels)
          ?.map((l) => l[1])
          ?.find((l) => Number(l.level) === Number(level))
      : [];

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  const handleConfrim = (func) => {
    setConfirm(true);
    setConfirmFunc(() => func);
  };

  return (
    <>
      {confirm && (
        <Confirm
          title={
            "Ви точно хочете змінити формат компанії? (при зміні формату вся структура видалиться)"
          }
          onClose={() => setConfirm(false)}
          onSubmit={() => confirmFunc && confirmFunc()}
        />
      )}
      <StyledModal
        initial={{ opacity: 0, translateX: "100%" }}
        transition={{ duration: 0.4 }}
        animate={controls}
        className="hide-scroll"
      >
        <Header onClose={handleClose} />
        <div className="modal-content">
          <SectionTitle title="ФОрмат компанії" />
          <TypeSelect onConfirm={handleConfrim} />
          <SectionTitle title="налаштування доступів" />
          {level && levels && (
            <Roles
              level={level}
              levelData={handleGetCurrentLevel(level)}
              onRefetchData={refetch}
            />
          )}
          {/* <AddButton onRefetchData={refetch} /> */}
        </div>
      </StyledModal>
    </>
  );
};

const StyledModal = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  overflow: auto;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(12.5px);
  width: 438px;
  z-index: 10;
  .modal-content {
    padding: 0 45px 20px 20px;
  }
  @media (max-width: 600px) {
    width: 100%;
    border-left: none;
  }
`;
