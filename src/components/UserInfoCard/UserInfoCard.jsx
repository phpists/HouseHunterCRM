import styled from "styled-components";
import { Header } from "./Header";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { SectionTitle } from "./SectionTitle";
import { MainInfo } from "./MainInfo/MainInfo";
import { PersonalData } from "./PersonalData";
import { Footer } from "./Footer";
import { Workers } from "./Workers/Workers";

export const UserInfoCard = ({ onClose, title, avatarBanner }) => {
  const controls = useAnimationControls();

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  return (
    <StyledUserInfoCard
      initial={{ opacity: 0, translateX: "100%" }}
      transition={{ duration: 0.4 }}
      animate={controls}
      className="hide-scroll"
    >
      <Header onClose={handleClose} title={title} />
      <div className="modal-content">
        <SectionTitle title="Загальна інформація" />
        <MainInfo avatarBanner={avatarBanner} />
        <SectionTitle title="Працівники в підпорядкуванні" />
        <Workers />
        <SectionTitle title="Персональні дані" />
        <PersonalData />
        {/* <Footer /> */}
      </div>
    </StyledUserInfoCard>
  );
};

const StyledUserInfoCard = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  overflow: auto;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(12.5px);
  width: 361px;
  z-index: 1088;
  .modal-content {
    padding: 0 10px 15px 11px;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;
