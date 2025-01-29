import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { SectionTitle } from "./SectionTitle";
import { Footer } from "./Footer";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Topicality } from "./Topicality";
import { Characteristics } from "./Characteristics";
import { Tags } from "./Tags";
import { useAppSelect } from "../../../../hooks/redux";
import { useActions } from "../../../../hooks/actions";
import { useLazyGetRequestsQuery } from "../../../../store/requests/requests.api";
import { Loader } from "../../../../components/Loader";

export const Filter = ({
  open,
  onClose,
  filters,
  onChangeFilter,
  filtersFields,
  onApplyFilter,
  isFavorite,
}) => {
  const controls = useAnimationControls();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState("0");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const applying = useRef(false);
  const isFirstRender = useRef(true);
  const { requestsCount } = useAppSelect((state) => state.requests);
  const { saveRequestsCount } = useActions();
  const [getRequests] = useLazyGetRequestsQuery();

  const handleGetTotal = () => {
    let data = {
      current_page: 0,
      item_on_page: 50,
      only_favorite: isFavorite ?? undefined,
    };

    data = {
      ...data,
      filters: Object.fromEntries(
        Object.entries(filters)?.filter((f) => f[1] !== "0")
      ),
    };

    setLoading(true);

    getRequests({ ...data, only_count_item: "1" }).then((resp) => {
      setTotal(Number(resp?.data?.all_item ?? 0));
      setLoading(false);
    });
  };

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    open && controls.start({ opacity: 1, translateX: 0 });
  }, [open]);

  const handleApplyFilter = (isApply) => {
    onApplyFilter(isApply);
    handleClose();
    applying.current = true;
    if (isApply) {
      saveRequestsCount(total);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      setTotal(requestsCount ?? 0);
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
        transition={{ duration: 0.3 }}
        animate={controls}
      >
        <Header onClose={handleClose} />
        <div className="content">
          <Tags
            filters={filters}
            onChangeFilter={onChangeFilter}
            filtersFields={filtersFields}
            onChangeInputFocus={(val) => setIsInputFocused(val)}
            isInputFocused={isInputFocused}
          />
        </div>
        <div className="total">
          Знайдено -{" "}
          {loading ? (
            <Loader white className="totalLoader" />
          ) : total === 100 ? (
            "100+"
          ) : (
            total
          )}
        </div>
        <Footer
          onSubmit={() => handleApplyFilter(true)}
          onCancel={() => handleApplyFilter(false)}
        />
      </StyledFilter>
      {open && <div className="modal-overlay" onClick={handleClose}></div>}
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
  .totalLoader {
    width: 16px;
    height: 16px;
    margin-left: 5px;
  }
  .section {
    border-radius: 9px;
    background: var(--bg-10);
    margin-bottom: 25px;
    padding: 8px;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;
