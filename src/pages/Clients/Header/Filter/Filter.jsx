import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { SectionTitle } from "./SectionTitle";
import { General } from "./General";
import { Topicality } from "./Topicality";
import { Characteristics } from "./Characteristics";
import { Footer } from "./Footer";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

export const Filter = ({
  onClose,
  filter,
  onChangeFilter,
  searchPhoneCode,
  onChangeSearchCode,
  onApplyFilters,
  searchPhoneCodeSecond,
  onChangeSearchCodeSecond,
}) => {
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
    onChangeSearchCode("1");
    onChangeSearchCodeSecond("1");
    onApplyFilters(false);
    handleClose();
  };

  const handleApplyFilters = () => {
    onApplyFilters(true);
    handleClose();
  };

  const handleApply = () => {
    if (
      filter?.search_phone?.length > 0 &&
      filter?.search_phone?.includes("_")
    ) {
      setErrors({ search_phone: true });
    } else {
      handleApplyFilters();
      setErrors({ search_phone: false });
    }
  };

  return (
    <>
      <StyledFilter
        initial={{ opacity: 0, translateX: "100%" }}
        transition={{ duration: 0.4 }}
        animate={controls}
      >
        <Header onClose={handleClose} />
        <div className="content">
          <SectionTitle title="Головне" />
          <General
            filter={filter}
            onChangeFilter={onChangeFilter}
            searchPhoneCode={searchPhoneCode}
            onChangeSearchCode={onChangeSearchCode}
            searchPhoneCodeSecond={searchPhoneCodeSecond}
            onChangeSearchCodeSecond={onChangeSearchCodeSecond}
            errors={errors}
          />
          {/* <SectionTitle title="Актуальність" />
   <Topicality />
   <SectionTitle title="Характеристики" />
   <Characteristics /> */}
        </div>
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
  background: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(12.5px);
  z-index: 20;
  .content {
    padding: 0 20px 20px;
    height: calc(100svh - 157px);
    overflow: auto;
    border-radius: 9px;
  }
  @media (max-width: 850px) {
    width: 100svw;
  }
`;
