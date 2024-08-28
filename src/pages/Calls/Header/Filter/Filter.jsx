import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { SectionTitle } from "./SectionTitle";
import { Footer } from "./Footer";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { Status } from "./Status";
import { Search } from "./Search/Search";
import { Period } from "./Period/Period";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";

export const Filter = ({
  onClose,
  filters,
  onChangeFilter,
  onApplyFilter,
  filterPhoneCode,
  onChangeFilterPhoneCode,
  showTelegram,
  activeType,
  onChangeActiveType,
  ordersTypes,
}) => {
  const controls = useAnimationControls();

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
    // eslint-disable-next-line
  }, []);

  const handleApply = (isApply) => {
    onApplyFilter(isApply);
    handleClose();
  };

  return (
    <>
      <StyledFilter
        initial={{ opacity: 0, translateX: "100%" }}
        transition={{ duration: 0.4 }}
        animate={controls}
      >
        <Header onClose={handleClose} />
        <div className="content hide-scroll">
          <SectionTitle title="Головне" />
          <div className="section">
            <Search
              filters={filters}
              onChangeFilter={onChangeFilter}
              filterPhoneCode={filterPhoneCode}
              onChangeFilterPhoneCode={onChangeFilterPhoneCode}
              showTelegram={showTelegram}
              activeType={activeType}
              onChangeActiveType={onChangeActiveType}
              ordersTypes={ordersTypes}
            />
          </div>
        </div>
        <Footer onApplyFilter={handleApply} />
      </StyledFilter>
      <div className="modal-overlay" onClick={handleClose}></div>
    </>
  );
};

const StyledFilter = styled(motion.div)`
  position: fixed;
  top: 0px;
  right: 0px;
  width: 361px;
  bottom: 0;
  flex-shrink: 0;
  border-left: var(--second-color-border);
  background: var(--modals-bg);
  backdrop-filter: blur(12.5px);
  z-index: 25;
  @supports (-webkit-touch-callout: none) {
    background: var(--main-bg);
  }
  .content {
    padding: 0 20px 20px;
    height: calc(100svh - 157px);
    overflow: auto;
    border-radius: 9px;
  }
  .section {
    border-radius: 9px;
    background: var(--bg-10);
    margin-bottom: 25px;
    padding: 8px;
  }
  @media (max-width: 600px) {
    border: none;
    width: 100%;
    z-index: 100;
  }
`;
