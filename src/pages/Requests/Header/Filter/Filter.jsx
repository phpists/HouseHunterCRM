import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { SectionTitle } from "./SectionTitle";
import { Footer } from "./Footer";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { Topicality } from "./Topicality";
import { Characteristics } from "./Characteristics";
import { Tags } from "./Tags";

export const Filter = ({
  onClose,
  filters,
  onChangeFilter,
  filtersFields,
  onApplyFilter,
}) => {
  const controls = useAnimationControls();

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  const handleApplyFilter = (isApply) => {
    onApplyFilter(isApply);
    handleClose();
  };

  return (
    <>
      {" "}
      <StyledFilter
        initial={{ opacity: 0, translateX: "100%" }}
        transition={{ duration: 0.4 }}
        animate={controls}
      >
        <Header onClose={handleClose} />
        <div className="content">
          {/* <SectionTitle title="Теги" /> */}
          <Tags
            filters={filters}
            onChangeFilter={onChangeFilter}
            filtersFields={filtersFields}
          />
          {/*<SectionTitle title="Актуальність" />
     <Topicality />
     <SectionTitle title="Характеристики" />
     <Characteristics /> */}
        </div>
        <Footer
          onSubmit={() => handleApplyFilter(true)}
          onCancel={() => handleApplyFilter(false)}
        />
      </StyledFilter>
      <div className="modal-overlay" onClick={handleClose}></div>
    </>
  );
};

const StyledFilter = styled(motion.div)`
  position: fixed;
  top: 0px;
  right: 0px;
  width: 439px;
  bottom: 0;
  flex-shrink: 0;
  background: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(12.5px);
  z-index: 20;
  .content {
    padding: 0 20px 20px;
    height: calc(100svh - 157px);
    overflow: auto;
    border-radius: 9px;
  }
  .section {
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.1);
    margin-bottom: 25px;
    padding: 8px;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;
