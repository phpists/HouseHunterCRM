import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { SectionTitle } from "./SectionTitle";
import { Footer } from "./Footer";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { Status } from "./Status";
import { Search } from "./Search/Search";
import { Period } from "./Period/Period";

export const Filter = ({ onClose }) => {
  const controls = useAnimationControls();

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  return (
    <StyledFilter
      initial={{ opacity: 0, translateX: "100%" }}
      transition={{ duration: 0.4 }}
      animate={controls}
    >
      <Header onClose={handleClose} />
      <div className="content hide-scroll">
        <SectionTitle title="Статус" />
        <Status />
        <SectionTitle title="Період " />
        <Period />
        <SectionTitle title="Пошук по " />
        <Search />
        <Footer />
      </div>
    </StyledFilter>
  );
};

const StyledFilter = styled(motion.div)`
  position: absolute;
  top: 0px;
  right: 0px;
  width: 361px;
  bottom: 0;
  flex-shrink: 0;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(12.5px);
  z-index: 20;
  .content {
    padding: 0 20px 20px;
    height: calc(100svh - 162px - 70px - 20px);
    overflow: auto;
  }
  .section {
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.1);
    margin-bottom: 25px;
    padding: 8px;
  }
`;
