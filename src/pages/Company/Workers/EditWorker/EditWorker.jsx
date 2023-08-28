import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { MainInfo } from "./MainInfo/MainInfo";
import { SectorTitle } from "../SectorTitle";
import { Info } from "./Info/Info";
import { PersonalData } from "./PerfonalData/PersonalData";
import { PersonalBills } from "./PesonalBills/PersonalBills";
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

export const EditWorker = ({ onClose }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimationControls();

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  const handleScrollContent = (e) => {
    if (e.target.scrollTop === 0 && isScrolled) {
      setIsScrolled(false);
    } else if (e.target.scrollTop > 0 && !isScrolled) {
      setIsScrolled(true);
    }
  };

  return (
    <StyledEditWorker
      isScrolled={isScrolled}
      className="hide-scroll"
      initial={{ opacity: 0, translateX: "100%" }}
      transition={{ duration: 0.4 }}
      animate={controls}
    >
      <Header onClose={handleClose} />
      <MainInfo isScrolled={isScrolled} />
      <div className="content hide-scroll" onScroll={handleScrollContent}>
        <SectorTitle title="Загальна інформація" />
        <Info />
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
  height: calc(100svh - 172px);
  top: 132px;
  width: 361px;
  overflow: auto;
  .content {
    padding: 15px 11px;
    overflow: auto;
    height: calc(
      100svh - 172px - ${({ isScrolled }) => (isScrolled ? 85 : 240)}px - 70px
    );
  }
`;
