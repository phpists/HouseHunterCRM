import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { SectionTitle } from "./SectionTitle";
import { Footer } from "./Footer";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Main } from "./Main";
import { Topicality } from "./Topicality";
import { Characteristics } from "./Characteristics";
import { useAppSelect } from "../../../../../hooks/redux";
import { useActions } from "../../../../../hooks/actions";
import { useParams } from "react-router-dom";
import { useLazyGetSelectionsQuery } from "../../../../../store/selections/selections.api";

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

  const handleGetTotal = (isClose) => {
    let sendData = {
      id_requst_group: id,
      current_page: 0,
      item_on_page: 30,
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

    getSelections({
      ...sendData,
      only_count_item: "1",
    }).then((resp) => {
      setTotal(resp?.data?.all_item);
      isClose && handleClose();
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
          />
          {/* <SectionTitle title="Актуальність" />
      <Topicality />
      <SectionTitle title="Характеристики" />
      <Characteristics /> */}
        </div>
        <div className="total">Знайдено - {total}</div>
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
  background: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(12.5px);
  z-index: 20;
  .content {
    padding: 0 20px 20px;
    height: calc(100svh - 187px);
    overflow: auto;
    border-radius: 9px;
  }
  .section {
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.1);
    margin-bottom: 25px;
    padding: 8px;
  }
  .total {
    padding: 20px 20px 0;
    margin-bottom: 6px;
    color: #fff;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 118%;
    letter-spacing: 0.28px;
    text-transform: uppercase;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;
