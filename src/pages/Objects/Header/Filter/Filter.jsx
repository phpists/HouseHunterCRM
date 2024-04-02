import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { SectionTitle } from "./SectionTitle";
import { Footer } from "./Footer";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Main } from "./Main";
import { Topicality } from "./Topicality";
import { Characteristics } from "./Characteristics";
import { useLazyGetAllObjectsQuery } from "../../../../store/objects/objects.api";
import { handleFromInputDate, removePhoneMask } from "../../../../utilits";
import { useActions } from "../../../../hooks/actions";
import { useAppSelect } from "../../../../hooks/redux";
import { Spinner } from "../../../../components/Spinner";
import { Loader } from "../../../../components/Loader";

export const Filter = ({
  onClose,
  filters,
  onChangeFilter,
  filtersFields,
  onApplyFilter,
  onChangeDefaultFiltersOpened,
  filtersOpened,
  isFavorite,
  allCount,
  phoneCode,
  onChangePhoneCode,
}) => {
  const controls = useAnimationControls();
  const [errors, setErrors] = useState({});
  const [getAllObjects, { data }] = useLazyGetAllObjectsQuery();
  const [total, setTotal] = useState("0");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const applying = useRef(false);
  const isFirstRender = useRef(true);
  const { saveObjectsCount } = useActions();
  const { objectsCount } = useAppSelect((state) => state.objects);
  const [loading, setLoading] = useState(false);

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
      saveObjectsCount(total);
    }
  };

  const handleApply = () => {
    if (
      removePhoneMask(filters?.search_phone)?.length > 0 &&
      filters?.search_phone?.includes("_")
    ) {
      setErrors({ search_phone: true });
    } else {
      handleApplyFilters(true);
      setErrors({ search_phone: false });
    }
  };

  const handleGetTotal = () => {
    let data = {
      only_favorite: isFavorite ?? undefined,
      current_page: 1,
      item_on_page: 10,
    };

    const { company_object, street_base_object, mls_object, ...otherFilters } =
      Object.fromEntries(Object.entries(filters)?.filter((f) => f[1] !== "0"));

    let dt_end_agreement_to = company_object?.dt_end_agreement_to
      ? new Date(handleFromInputDate(company_object?.dt_end_agreement_to))
      : undefined;

    if (dt_end_agreement_to) {
      dt_end_agreement_to.setHours(23);
      dt_end_agreement_to.setMinutes(59);
      dt_end_agreement_to.setSeconds(59);
    }

    data = {
      ...data,
      company_object: {
        ...company_object,
        dt_end_agreement_to: dt_end_agreement_to?.getTime(),
      },
      street_base_object,
      mls_object,
      filters: {
        ...otherFilters,
        search_phone_code:
          removePhoneMask(filters?.search_phone)?.length > 0
            ? phoneCode
            : undefined,
        findPhone:
          removePhoneMask(filters?.findPhone)?.length > 0
            ? removePhoneMask(filters?.findPhone)
            : undefined,
        search_phone:
          removePhoneMask(filters?.search_phone)?.length > 0
            ? removePhoneMask(filters?.search_phone)
            : undefined,
      },
    };

    if (
      !company_object &&
      !street_base_object &&
      !mls_object &&
      Object.entries(filters)?.filter((f) => f?.[1])?.length > 0
    ) {
      data = {
        ...data,
        company_object: {
          show_only: "company",
          actual: "1",
          given_objects: "1",
          not_actual: "1",
          overdue: "1",
          show_street_base_company: "1",
        },
        street_base_object: {
          sorting_id: "16",
        },
        mls_object: {},
      };
    }

    setLoading(true);
    getAllObjects({ ...data, only_count_item: "1" }).then((resp) => {
      setTotal(resp?.data?.count_item ?? 0);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      setTotal(objectsCount ?? 0);
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
            filtersOpened={filtersOpened}
            onChangeDefaultFiltersOpened={onChangeDefaultFiltersOpened}
            errors={errors}
            onChangeInputFocus={(val) => setIsInputFocused(val)}
            isInputFocused={isInputFocused}
            phoneCode={phoneCode}
            onChangePhoneCode={onChangePhoneCode}
          />
          {/* <SectionTitle title="Актуальність" />
     <Topicality />
     <SectionTitle title="Характеристики" />
     <Characteristics /> */}
        </div>
        <div className="total">
          Знайдено -{" "}
          {loading ? <Loader white className="totalLoader" /> : total}
        </div>
        <Footer
          onCancel={() => handleApplyFilters(false)}
          onSubmit={handleApply}
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
    padding: 0 20px 0px;
    height: calc(100svh - 187px);
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
  .totalLoader {
    width: 16px;
    height: 16px;
    margin-left: 5px;
  }
  .section {
    border-radius: 9px;
    background: rgba(255, 255, 255, 0.1);
    margin-bottom: 25px;
    padding: 8px;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;
