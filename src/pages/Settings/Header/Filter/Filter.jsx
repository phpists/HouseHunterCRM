import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { SectionTitle } from "./SectionTitle";
import { General } from "./General";
import { Topicality } from "./Topicality";
import { Characteristics } from "./Characteristics";
import { Footer } from "./Footer";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Filter = ({ onClose, filter, onChangeFilter, onApplyFilters }) => {
  const controls = useAnimationControls();
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  const handleResetFilters = () => {
    onChangeFilter("search_key", "");
    onChangeFilter("search_key", "");

    onApplyFilters(false);
    handleClose();
  };

  const handleApplyFilters = () => {
    onApplyFilters(true);
    handleClose();
  };

  const handleApply = () => {
    handleApplyFilters();
  };

  return (
    <>
      <StyledFilter
        initial={{ opacity: 0, translateX: "100%" }}
        transition={{ duration: 0.3 }}
        animate={controls}
      >
        <Header onClose={handleClose} />
        <div className="content">
          <SectionTitle title="Головне" />
          <General
            filter={filter}
            errors={errors}
            onChangeFilter={onChangeFilter}
            onToggleInputFocused={(val) => null}
          />
        </div>
        {/* <div className="total">
          Знайдено -{" "}
          {loading ? <Loader white className="totalLoader" /> : total}
        </div> */}
        <Footer onReset={handleResetFilters} onSubmit={handleApply} />
      </StyledFilter>
      <div className="modal-overlay" onClick={handleClose}></div>
    </>
  );
};

const StyledFilter = styled(motion.div)`
  position: fixed;
  top: -0;
  right: 0;
  bottom: 0;
  width: 439px;
  height: 100svh;
  flex-shrink: 0;
  background: var(--modals-bg);
  backdrop-filter: blur(12.5px);
  z-index: 20;
  @supports (-webkit-touch-callout: none) {
    background: var(--main-bg);
  }
  .content {
    padding: 0 20px 0px;
    height: calc(100svh - 160px);
    overflow: auto;
    border-radius: 9px;
  }
  .total {
    display: flex;
    align-items: center;
    padding: 20px 20px 0;
    margin-bottom: 6px;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%;
    letter-spacing: 0.28px;
    text-transform: uppercase;
  }
  @media (max-width: 850px) {
    width: 100svw;
  }
`;
