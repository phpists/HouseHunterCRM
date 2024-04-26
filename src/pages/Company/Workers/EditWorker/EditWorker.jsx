import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { MainInfo } from "./MainInfo/MainInfo";
import { SectorTitle } from "../SectorTitle";
import { Info } from "./Info/Info";
import { PersonalData } from "./PerfonalData/PersonalData";
import { PersonalBills } from "./PesonalBills/PersonalBills";
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { useLazyGetWorkerByIdQuery } from "../../../../store/structure/structure.api";
import { handleResponse } from "../../../../utilits";

export const EditWorker = ({ onClose, id }) => {
  const controls = useAnimationControls();
  const [formData, setFormData] = useState({});
  const [getWorker] = useLazyGetWorkerByIdQuery();

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  useEffect(() => {
    getWorker(id).then((resp) =>
      handleResponse(
        resp,
        () => {
          setFormData(resp?.data[0]);
        },
        onClose
      )
    );
  }, [id]);

  return (
    <StyledEditWorker
      className="hide-scroll"
      initial={{ opacity: 0, translateX: "100%" }}
      transition={{ duration: 0.4 }}
      animate={controls}
    >
      <Header onClose={handleClose} />
      <div className="content hide-scroll">
        <SectorTitle title="Загальна інформація" />
        <Info formData={formData} />
        <SectorTitle title="Персональні дані" />
        <PersonalData />
        <SectorTitle title="Персональні Рахунки" />
        <PersonalBills />
      </div>
    </StyledEditWorker>
  );
};

const StyledEditWorker = styled(motion.div)`
  position: fixed;
  right: 42px;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(12.5px);
  height: calc(100svh - 147px);
  top: 106px;
  width: 361px;
  overflow: auto;
  @supports (-webkit-touch-callout: none) {
    background: #2c2c2c;
  }
  .content {
    padding: 15px 11px;
    overflow: auto;
    height: calc(100svh - 172px - 25px - 70px);
  }
  @media (max-width: 1600px) {
    height: calc(100svh - 185px);
  }
  @media (max-width: 1200px) {
    right: 24px;
    height: calc(100svh - 187px);
    top: 98px;
  }
  @media (max-width: 800px) {
    top: 170px;
  }
  @media (max-width: 600px) {
    width: calc(100svw - 48px);
    border: none;
  }
`;
