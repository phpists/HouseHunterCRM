import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { SectionTitle } from "./SectionTitle";
import { General } from "./General";
import { Topicality } from "./Topicality";
import { Characteristics } from "./Characteristics";
import { Footer } from "./Footer";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Loader } from "../../../../components/Loader";
import { useAppSelect } from "../../../../hooks/redux";
import { handleFromInputDate, removePhoneMask } from "../../../../utilits";
import { useLazyGetClientsQuery } from "../../../../store/clients/clients.api";
import { useActions } from "../../../../hooks/actions";

export const Filter = ({
  onClose,
  filter,
  onChangeFilter,
  searchPhoneCode,
  onChangeSearchCode,
  onApplyFilters,
  searchPhoneCodeSecond,
  onChangeSearchCodeSecond,
  favoritesFilter,
}) => {
  const controls = useAnimationControls();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const isFirstRender = useRef(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const applying = useRef(false);
  const { clientsCount } = useAppSelect((state) => state.clients);
  const [getClients] = useLazyGetClientsQuery();
  const { saveClientsCount } = useActions();

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
      saveClientsCount(total);
      handleApplyFilters();
      setErrors({ search_phone: false });
    }
  };

  const handleFormatFilterDate = (d, isFrom) => {
    const date = new Date(handleFromInputDate(d));

    date.setHours(isFrom ? 0 : 23);
    date.setMinutes(isFrom ? 0 : 59);
    date.setSeconds(isFrom ? 0 : 59);

    return date?.getTime() / 1000;
  };

  const handleGetTotal = () => {
    const sendData = {
      current_page: 0,
      item_on_page: 10,
      show_favorite: favoritesFilter ? "1" : undefined,
      search_phone_code:
        removePhoneMask(filter.search_phone)?.length > 0
          ? searchPhoneCode
          : undefined,
      search_phone:
        removePhoneMask(filter.search_phone)?.length > 0
          ? removePhoneMask(filter.search_phone)
          : undefined,
      search_key: filter.search_key,
      my_struct: filter.my_struct,
      filters: {
        ...filter.filters,
        dt_reg_from: filter?.filters?.dt_reg_from
          ? handleFormatFilterDate(filter?.filters?.dt_reg_from, true)
          : undefined,
        dt_reg_to: filter?.filters?.dt_reg_to
          ? handleFormatFilterDate(filter?.filters?.dt_reg_to)
          : undefined,
        findPhone:
          filter?.filters?.findPhone?.length > 0
            ? filter?.filters?.findPhone
                ?.replaceAll("-", "")
                ?.replace("(", "")
                ?.replace(")", "")
                ?.replaceAll("_", "")
            : null,
      },
    };

    getClients({ ...sendData, only_count_item: "1" }).then((resp) =>
      setTotal(resp?.data?.all_item ?? 0)
    );
  };

  useEffect(() => {
    if (isFirstRender.current) {
      setTotal(clientsCount ?? 0);
      isFirstRender.current = false;
    } else if (!applying.current) {
      !isInputFocused && handleGetTotal();
    } else {
      applying.current = false;
    }
  }, [filter, isInputFocused]);

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
            onToggleInputFocused={(val) => setIsInputFocused(val)}
          />
        </div>
        <div className="total">
          Знайдено -{" "}
          {loading ? <Loader white className="totalLoader" /> : total}
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
    padding: 0 20px 0px;
    height: calc(100svh - 190px);
    overflow: auto;
    border-radius: 9px;
  }
  .total {
    display: flex;
    align-items: center;
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
  @media (max-width: 850px) {
    width: 100svw;
  }
`;
