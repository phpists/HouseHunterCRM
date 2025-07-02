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
import {
  handleFromInputDate,
  handleResponse,
  removePhoneMask,
  showAlert,
} from "../../../../utilits";
import { useActions } from "../../../../hooks/actions";
import { useAppSelect } from "../../../../hooks/redux";
import { Spinner } from "../../../../components/Spinner";
import { Loader } from "../../../../components/Loader";
import {
  useGetPhonesCodesQuery,
  useGetUserFiltersQuery,
  useLazyRemoveUserFilterQuery,
} from "../../../../store/auth/auth.api";
import { Button } from "../../../../components/Button";
import { Select } from "../../../../components/Select/Select";
import { SaveFilterModal } from "../../../../components/SaveFilterModal";
import { Confirm } from "../../../../components/Confirm/Confirm";
import Placement from "../../../../components/Placement/Placement";
import Features from "../../../../components/Features/Features";
import PriceChange from "../../../../components/PriceChange/PriceChange";
import AutoRia from "../../../../components/AutoRia/AutoRia";
import { ReactComponent as AutoRiaImg } from "../../../../assets/images/autoria.svg";
import Search from "../../../../components/SearchFilter/Search";
import SearchResults from "../../../../components/SearchResults/SearchResults";
import { Base } from "../../../../components/Base/Base";

export const Filter = ({
  open,
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
  onOpenMap,
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
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const notRefresh = useRef(false);
  const contentRef = useRef(null);
  const [selectedSavedFilter, setSelectedSavedFilter] = useState();
  const [savingFilter, setSavingFilter] = useState(false);
  const { data: savedFilters, refetch } = useGetUserFiltersQuery();
  const [deleteSavedFilter] = useLazyRemoveUserFilterQuery();
  const [deletingSavedFilter, setDeletingSavedFilter] = useState(null);
  const [close, setClose] = useState(false);

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
    setClose((prev) => !prev);
  };

  useEffect(() => {
    open && controls.start({ opacity: 1, translateX: 0 });
  }, [open]);

  const handleApplyFilters = (isApply) => {
    onApplyFilter(isApply);
    handleClose();
    applying.current = true;
    if (isApply) {
      saveObjectsCount(total);
    }
  };

  const handleApply = () => {
    const phoneLength =
      removePhoneMask(
        phonesCodes?.find((p) => p.id === phoneCode)?.format
      )?.replace(/\s/g, "")?.length ?? 0;

    const yearFromError = Number(filters?.year_from) < 1885;
    const yearToError = Number(filters?.year_to) > new Date().getFullYear();
    if (
      filters?.search_phone?.length === 0 &&
      (filters?.id_rubric?.length === 0 ||
        filters?.id_location?.length === 0 ||
        !filters?.id_rubric) &&
      filters?.street_base_object !== undefined
    ) {
      setErrors({
        id_rubric:
          filters?.id_rubric?.toString()?.length === 0 || !filters?.id_rubric,
        id_location:
          filters?.id_location?.length === 0 || !filters?.id_location,
      });
    } else if (
      removePhoneMask(filters?.search_phone)?.length > 0 &&
      removePhoneMask(filters?.search_phone)?.length < phoneLength
    ) {
      setErrors({ search_phone: true });
    } else if (
      ((filters?.year_from && filters?.year_from?.toString()?.length > 0) ||
        (filters?.year_to && filters?.year_to?.toString()?.length > 0)) &&
      (yearFromError || yearToError)
    ) {
      setErrors({
        year_from: yearFromError,
        year_to: yearToError,
      });
    } else if (
      (filters?.street_base_object?.price_change?.length > 0 ||
        filters?.street_base_object?.price_change_up_procent?.length > 0 ||
        filters?.street_base_object?.price_change_period?.length > 0 ||
        filters?.street_base_object?.price_change_up?.length > 0) &&
      (((!filters?.street_base_object?.price_change ||
        filters?.street_base_object?.price_change?.length === 0) &&
        (!filters?.street_base_object?.price_change_up_procent ||
          filters?.street_base_object?.price_change_up_procent?.length ===
            0)) ||
        !filters?.street_base_object?.price_change_period ||
        filters?.street_base_object?.price_change_period?.length === 0 ||
        !filters?.street_base_object?.price_change_up ||
        filters?.street_base_object?.price_change_up?.length === 0)
    ) {
      setErrors({
        price_change: !filters?.street_base_object?.price_change,
        price_change_period: !filters?.street_base_object?.price_change_period,
        price_change_up: !filters?.street_base_object?.price_change_up,
        price_change_up_procent:
          !filters?.street_base_object?.price_change_up_procent,
      });
    } else if (
      (filters?.street_base_object?.count_object_owner_from ||
        filters?.street_base_object?.count_object_owner_to) &&
      (!filters?.street_base_object?.count_object_owner_from ||
        !filters?.street_base_object?.count_object_owner_to)
    ) {
      setErrors({
        count_object_owner: true,
      });
    } else {
      handleApplyFilters(true);
      setErrors({ search_phone: false });
    }
  };

  const handleGetTotal = () => {
    let data = {
      only_favorite: isFavorite ?? undefined,
      current_page: 1,
      item_on_page: 50,
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
        dt_end_agreement_to: dt_end_agreement_to?.getTime() / 1000,
      },
      street_base_object,
      mls_object,
      filters: {
        ...Object.fromEntries(
          Object.entries(otherFilters)?.filter((f) =>
            Array.isArray(f[1]) ? f[1].length > 0 : true
          )
        ),

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
      Number(data?.filters?.volume_engine_from) > 0 ||
      Number(data?.filters?.volume_engine_to) > 0
    ) {
      data = {
        ...data,
        filters: {
          ...data.filters,
          volume_engine_from:
            (Number(data?.filters?.volume_engine_from) ?? 0) * 1000,
          volume_engine_to:
            (Number(data?.filters?.volume_engine_to) ?? 0) * 1000,
        },
      };
    }

    if (
      Number(data?.filters?.сar_mileage_from) > 0 ||
      Number(data?.filters?.сar_mileage_to) > 0
    ) {
      data = {
        ...data,
        filters: {
          ...data.filters,
          сar_mileage_from:
            (Number(data?.filters?.сar_mileage_from) ?? 0) * 1000,
          сar_mileage_to: (Number(data?.filters?.сar_mileage_to) ?? 0) * 1000,
        },
      };
    }

    if (
      !company_object &&
      !street_base_object &&
      !mls_object &&
      Object.entries(filters)?.filter((f) => f?.[1])?.length > 0
    ) {
      data = {
        ...data,
        // company_object: {
        //   show_only: "company",
        //   actual: "1",
        //   given_objects: "1",
        //   not_actual: "1",
        //   overdue: "1",
        //   show_street_base_company: "1",
        // },
        street_base_object: {
          sorting_id: "16",
        },
        // mls_object: {},
      };
    }

    setLoading(true);

    getAllObjects({ ...data, only_count_item: "1" }).then((resp) => {
      saveObjectsCount(resp?.data?.count_item ?? 0);
      setTotal(resp?.data?.count_item ?? 0);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      setTotal(objectsCount ?? 0);
      isFirstRender.current = false;
    } else if (!applying.current && !notRefresh.current) {
      !isInputFocused && handleGetTotal();
    } else {
      applying.current = false;
    }
  }, [filters, isInputFocused]);

  useEffect(() => {
    if (filters?.street_base_object === undefined) {
      setErrors({
        ...errors,
        id_rubric: false,
        id_location: false,
      });
    }
  }, [filters?.street_base_object]);

  const handleChangeFilter = (field, value, isDataUpdate) => {
    onChangeFilter(field, value, isDataUpdate);
    if (field === "sorting") {
      notRefresh.current = true;
    } else {
      notRefresh.current = false;
    }
  };

  useEffect(() => {
    if (errors?.["id_rubric"] || errors?.["id_location"]) {
      contentRef.current.scrollTop = 0;
    } else {
      const firstErrorField = document.querySelectorAll(
        ".objects-filters-main-wrapper .error-field"
      );
      if (firstErrorField[0]) {
        contentRef.current.scrollTo({
          top: firstErrorField[0].offsetTop - contentRef.current.offsetTop - 10,
        });
      }
    }
  }, [errors]);

  const handleChangeSelectedSavedFilter = (v) => {
    const val = v ?? selectedSavedFilter;
    try {
      const filter = savedFilters?.data?.find((v) => v.id === val);
      const data = JSON.parse(filter?.data);
      setSelectedSavedFilter(val);
      if (data) {
        onChangeFilter("update", JSON.parse(filter?.data), true, true);
      }
    } catch {}
  };

  const handleDeleteSavedFilter = () => {
    deleteSavedFilter(deletingSavedFilter).then((resp) => {
      setDeletingSavedFilter(null);
      handleResponse(resp, () => {
        showAlert("success", "Успішно видалено");
        refetch();
      });
    });
  };

  return (
    <>
      {savingFilter ? (
        <SaveFilterModal
          onClose={() => setSavingFilter(false)}
          filters={filters}
          onSuccess={() => refetch()}
        />
      ) : null}
      {deletingSavedFilter && (
        <Confirm
          onClose={() => setDeletingSavedFilter(null)}
          title="Видалити збережений пошук?"
          onSubmit={handleDeleteSavedFilter}
          notClose
        />
      )}
      <StyledFilter
        initial={{ opacity: 0, translateX: "100%" }}
        transition={{ duration: 0.3 }}
        animate={controls}
        noSavedFilters={savedFilters?.data?.length === 0}
      >
        <Header onClose={handleClose} />
        {savedFilters?.data?.length > 0 ? (
          <Select
            // label="Збережені пошуки"
            placeholder="ЗБЕРЕЖЕНІ ПОШУКИ"
            options={savedFilters?.data?.map(({ name, id }) => ({
              title: name,
              value: id,
            }))}
            // value={selectedSavedFilter}
            onChange={handleChangeSelectedSavedFilter}
            className="saved-filters-select"
            onDelete={(id) => setDeletingSavedFilter(id)}
          />
        ) : null}

        <div className="content objects-filters-main-wrapper" ref={contentRef}>
          <SectionTitle title="Головне" />
          <Main
            close={close}
            filters={filters}
            onChangeFilter={handleChangeFilter}
            filtersFields={filtersFields}
            filtersOpened={filtersOpened}
            onChangeDefaultFiltersOpened={onChangeDefaultFiltersOpened}
            errors={errors}
            onChangeInputFocus={(val) => setIsInputFocused(val)}
            isInputFocused={isInputFocused}
            phoneCode={phoneCode}
            onChangePhoneCode={onChangePhoneCode}
            onOpenMap={onOpenMap}
          />

          <SectionTitle title="Розмішення" />
          <Placement data={filters} onChange={handleChangeFilter} />

          <SectionTitle title="Характеристики" />
          <Features
            data={filters}
            onChangeFilter={handleChangeFilter}
            filtersFields={filtersFields}
            onChangeInputFocus={(val) => setIsInputFocused(val)}
            isInputFocused={isInputFocused}
          />

          <SectionTitle title="Зміна ціни" />
          <PriceChange
            data={filters}
            onChangeFilter={handleChangeFilter}
            filtersFields={filtersFields}
            onChangeInputFocus={(val) => setIsInputFocused(val)}
            isInputFocused={isInputFocused}
          />

          <div className="flex gap-2">
            <SectionTitle title="пошук по AutoRia" />
            <AutoRiaImg />
          </div>
          <AutoRia
            data={filters}
            onChangeFilter={handleChangeFilter}
            filtersFields={filtersFields}
            onChangeInputFocus={(val) => setIsInputFocused(val)}
            isInputFocused={isInputFocused}
          />

          <SectionTitle title="Результати пошуку" />
          <SearchResults
            data={filters}
            onChangeFilter={handleChangeFilter}
            filtersFields={filtersFields}
          />

          <SectionTitle title="Пошук" />
          <Search
            data={filters}
            onChangeFilter={handleChangeFilter}
            filtersFields={filtersFields}
            onChangeInputFocus={(val) => setIsInputFocused(val)}
            phoneCode={phoneCode}
            onChangePhoneCode={onChangePhoneCode}
            errors={errors}
          />

          <Base
            className="base-wrapper"
            data={filters}
            onChange={onChangeFilter}
            streetBaseOpen={filtersOpened?.street_base_object}
            mlsBaseOpen={filtersOpened?.mls_object}
            companyOpen={filtersOpened?.company}
            onChangeDefaultFiltersOpened={(fieldName, value) =>
              onChangeDefaultFiltersOpened({
                ...filtersOpened,
                [fieldName]: value,
              })
            }
            dateAgreement
            idAdInSource
            showDeleted
            workersSearch
            potentialOwner
            idSource
            objMls
            countObjectOwner
            allObjectsWorker
            publicAccess
            onlyNotmyClient
            notCommentAndTags
            showTagsObjarray
            hideAdvertsAdd
            onFocus={() => (val) => setIsInputFocused(true)}
            onBlur={() => (val) => setIsInputFocused(false)}
            hidePicaroon
            liquidity
            overbuyingIndex
            countViews
            countLikes
            idStatusAdd
            priceChange
            priceChangePeriod
            priceChangeUp
            showTop
            priceChangeUpProcent
            showTagPriceDump
            showCommentAutoria
            errors={Object.entries(errors)
              ?.filter((e) => e?.[1])
              ?.map((e) => e?.[0])}
          />
        </div>
        <div className="total">
          <div>
            Знайдено -
            {loading ? (
              <Loader white className="totalLoader" />
            ) : total === 100 ? (
              "100+"
            ) : (
              total
            )}
          </div>
          <Button
            title="Зберегти пошук"
            onClick={() => setSavingFilter(true)}
            className="btn enter-btn"
          />
        </div>
        <Footer
          onCancel={() => handleApplyFilters(false)}
          onSubmit={handleApply}
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
    padding: 0 20px 0px;
    height: calc(
      100svh - ${({ noSavedFilters }) => (noSavedFilters ? 190 : 250)}px
    );
    overflow: auto;
    border-radius: 9px;
  }
  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
  .saved-filters-select {
    margin: 0 20px 5px;
    width: calc(100% - 40px);
    min-height: 50px;
  }
  @media (max-width: 800px) {
    width: 100%;

    .content {
      padding: 0 10px 0px;
    }
  }
`;
