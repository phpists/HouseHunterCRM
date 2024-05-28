import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { SectionTitle } from "./SectionTitle";
import { Footer } from "./Footer";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Main } from "./Main";
import { useAppSelect } from "../../../../../hooks/redux";
import { useActions } from "../../../../../hooks/actions";
import { useParams } from "react-router-dom";
import { useLazyGetSelectionsQuery } from "../../../../../store/selections/selections.api";
import { Loader } from "../../../../../components/Loader";

export const Filter = ({
  onClose,
  filters,
  onChangeFilter,
  filtersFields,
  onApplyFilter,
  showObjectHide,
}) => {
  const { id } = useParams();
  const controls = useAnimationControls();
  const [total, setTotal] = useState("0");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const applying = useRef(false);
  const isFirstRender = useRef(true);
  const { saveSelectionsCount } = useActions();
  const { selectionsCount } = useAppSelect((state) => state.selections);
  const [getSelections] = useLazyGetSelectionsQuery();
  const [loading, setLoading] = useState(false);

  const handleGetTotal = (isClose) => {
    let sendData = {
      id_requst_group: id,
      current_page: 0,
      item_on_page: 50,
      filters,
    };

    if (showObjectHide === "1") {
      sendData = {
        ...sendData,
        filters: { ...filters, show_object_hide: "1" },
      };
    } else if (showObjectHide) {
      sendData = { ...sendData, filters: { show_object_hide: "1" } };
    }

    setLoading(true);
    getSelections({
      ...sendData,
      only_count_item: "1",
    }).then((resp) => {
      setTotal(resp?.data?.all_item);
      isClose && handleClose();
      setLoading(false);
    });
  };

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  const handleApplyFilters = (isApply) => {
    onApplyFilter(isApply);
    handleClose();
    applying.current = true;
    if (isApply) {
      saveSelectionsCount(total);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      setTotal(selectionsCount ?? 0);
      isFirstRender.current = false;
    } else if (!applying.current) {
      !isInputFocused && handleGetTotal();
    } else {
      applying.current = false;
    }
  }, [filters, isInputFocused]);

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
          <Main
            filters={filters}
            onChangeFilter={onChangeFilter}
            filtersFields={filtersFields}
            onChangeInputFocus={(val) => setIsInputFocused(val)}
            isInputFocused={isInputFocused}
          />
        </div>
        <div className="total">
          Знайдено -{" "}
          {loading ? <Loader white className="totalLoader" /> : total}
        </div>
        <Footer
          onCancel={() => handleApplyFilters(false)}
          onSubmit={() => handleApplyFilters(true)}
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
  background: var(--modals-bg);
  backdrop-filter: blur(12.5px);
  z-index: 20;
  @supports (-webkit-touch-callout: none) {
    background: var(--main-bg);
  }
  .content {
    padding: 0 20px 20px;
    height: calc(100svh - 187px);
    overflow: auto;
    border-radius: 9px;
  }
  .section {
    border-radius: 9px;
    background: var(--bg-10);
    margin-bottom: 25px;
    padding: 8px;
  }
  .totalLoader {
    width: 16px;
    height: 16px;
    margin-left: 5px;
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
  @media (max-width: 800px) {
    width: 100%;
  }
`;
