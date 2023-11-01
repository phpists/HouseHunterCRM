import styled from "styled-components";
import { Header } from "./Header";
import { SectionTitle } from "./SectionTitle";
import { TypeSelect } from "./TypeSelect/TypeSelect";
import { Roles } from "./Roles/Roles";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { AddButton } from "./AddButton/AddButton";
import { useGetPerimissionsQuery } from "../../../../../store/structure/structure.api";

export const Modal = ({ onClose }) => {
  const controls = useAnimationControls();
  const { data, refetch } = useGetPerimissionsQuery();

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  return (
    <StyledModal
      initial={{ opacity: 0, translateX: "100%" }}
      transition={{ duration: 0.4 }}
      animate={controls}
      className="hide-scroll"
    >
      <Header onClose={handleClose} />
      <div className="modal-content">
        {/* <SectionTitle title="ФОрмат компанії" />
        <TypeSelect /> */}
        <SectionTitle title="налаштування доступів" />
        <Roles data={data} onRefetchData={refetch} />
        <AddButton onRefetchData={refetch} />
      </div>
    </StyledModal>
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
