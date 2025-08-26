import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List";
import { useEffect, useState } from "react";
import {
  useLazyAddToFavoritesQuery,
  useLazyGetAllObjectsQuery,
  useLazyGetRubricFieldsQuery,
  useLazyRestoreObjectsQuery,
} from "../../store/objects/objects.api";
import { useActions } from "../../hooks/actions";
import { useRef } from "react";
import {
  checkIsJSON,
  handleCopy,
  handleFromInputDate,
  handleGetRange,
  handleResponse,
  removePhoneMask,
  showAlert,
} from "../../utilits";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelect } from "../../hooks/redux";

export const handleFindSimilarTo = (obj) => {
  const { id_location, id_rubric, price_uah, id_brand, id_model } = obj;

  const objData = {
    id_rubric,
    id_location,
    price_min: handleGetRange(Number(price_uah), true)?.start.toFixed(0),
    price_max: handleGetRange(Number(price_uah), true)?.end.toFixed(0),
    id_brand,
    id_model,
    price_currency: "1",
  };

  const objUrl = `/objects?findSelectionSimilar=true${Object.entries(objData)
    ?.map((d) => `&${d[0]}=${d[1]}`)
    ?.join("")}`;

  window.open(objUrl, "_blank");
};

const Objects = () => {
  const { user } = useAppSelect((state) => state.auth);
  const {
    objectsCount,
    objects,
    selected,
    isFavorite,
    isAllPages,
    allCount,
    updateData,
    phoneCode,
  } = useAppSelect((state) => state.objects);
  const {
    saveObjectsCount,
    setObjects,
    setSelected,
    setIsFavorite,
    setFilterFields,
    setIsAllPages,
    setLoading,
    setAllCount,
    setUpdateData,
    setActionLoading,
    setPhoneCode,
    setIsDeleted,
  } = useActions();

  const { id } = useParams();
  const location = useLocation();
  const [getAllObjects] = useLazyGetAllObjectsQuery();
  const [getRubricField] = useLazyGetRubricFieldsQuery();
  const [addObjectToFavorites] = useLazyAddToFavoritesQuery();
  const [restoreObjects] = useLazyRestoreObjectsQuery();

  const INIT_FILTERS = {
    id_rubric: "",
    id_location: [],
    price_currency: "2",
    price: "",
    price_max: "",
    price_min: "",
    id_hash: id ?? "",
    price_for: "4",
    sorting: "0",
    street_base_object: {
      sorting_id: "14",
      // price_change_up: "2",
      // price_change_period: "4",
    },
  };

  const DEFAULT_FILTERS = {
    price_currency: "2",
    id_rubric: "1",
    sorting: "0",
    street_base_object: {
      sorting_id: "14",
      // price_change_up: "2",
      // price_change_period: "4",
    },
    // price_for: "4",
    // company_object: {
    //   show_only: "only_my",
    //   actual: "1",
    // },
  };

  const [filters, setFilters] = useState(INIT_FILTERS);
  const filterActive = useRef(!!id);
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const isFirstRender = useRef(true);
  const dataRef = useRef([]);
  const allCountRef = useRef(0);

  const handleGetRubricsFields = (id) => {
    getRubricField(id).then((resp) => {
      setFilterFields(resp?.data);
    });
  };

  const handleChangePhoneCode = (val) => setPhoneCode(val);

  const handleChangeFilter = (field, value, isDataUpdate, isRefetchRubrics) => {
    if (isDataUpdate) {
      setFilters(value);
      localStorage.setItem("objectsLastFilters", JSON.stringify(value));
      if (value?.id_rubric && isRefetchRubrics) {
        handleGetRubricsFields(value?.id_rubric);
      }
    } else {
      let updatedFilters = { ...filters, [field]: value };

      if (field === "price_max" || field === "price_min") {
        updatedFilters = {
          ...updatedFilters,
          price_currency: updatedFilters?.price_currency ?? "1",
          price_for: updatedFilters?.price_for ?? "4",
        };
      }

      if (field === "street_base_object") {
        const isEmpty =
          Object.entries(updatedFilters?.street_base_object)?.filter(
            (v) => v[1]
          )?.length === 0 ||
          Object.entries(updatedFilters?.street_base_object)?.[0]?.[1]
            ?.length === 0;

        if (isEmpty) {
          const filters = { ...updatedFilters, street_base_object: {} };

          if (updatedFilters.street_base_object.showFilterObject) {
            updatedFilters = {
              ...updatedFilters,
              street_base_object: {
                ...updatedFilters.street_base_object,
                showFilterObject:
                  updatedFilters.street_base_object.showFilterObject,
              },
            };
          } else {
            updatedFilters = filters;
          }
        }
      }

      if (field === "search_like" && value?.length === 0) {
        updatedFilters = {
          ...updatedFilters,
          search_not_like: [],
        };
      }

      setFilters(updatedFilters);
      localStorage.setItem(
        "objectsLastFilters",
        JSON.stringify(updatedFilters)
      );
      if (field === "id_rubric") {
        handleGetRubricsFields(value);
      }
    }
  };

  const handleSelect = (index) =>
    setSelected(
      !!selected.find((i) => i === index)
        ? selected.filter((i) => i !== index)
        : [...selected, index]
    );

  const handleGetObjects = (isReset, isApply) => {
    isFirstRender.current = false;
    if ((!isLoading.current && !isAllPages) || isReset) {
      if (isReset) {
        listRef.current.scroll({ top: 0 });
        setObjects([]);
        setSelected([]);
        setAllCount(0);
        currentPage.current = 0;
        dataRef.current = [];
        allCountRef.current = 0;
      }

      isLoading.current = true;

      const {
        company_object,
        street_base_object,
        mls_object,
        sorting,
        ...otherFilters
      } = Object.fromEntries(
        Object.entries(filters)?.filter((f) => f[1] !== "0")
      );

      let data = {
        only_favorite: isFavorite ?? undefined,
        current_page: currentPage.current,
        item_on_page: 50,
        sorting,
      };

      if (filterActive.current) {
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
          street_base_object: { ...street_base_object },
          mls_object,
          sorting,
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
            showOwnerObject: filters?.street_base_object?.showOwnerObject,
            ownerSource: filters?.street_base_object?.ownerSource,
            VIN: filters?.street_base_object?.VIN,
            findPhone:
              filters?.findPhone?.length > 0 ? filters?.findPhone : undefined,
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
              сar_mileage_to:
                (Number(data?.filters?.сar_mileage_to) ?? 0) * 1000,
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

        if (otherFilters.kpp && !Array.isArray(otherFilters.kpp)) {
          otherFilters.kpp = [otherFilters.kpp];
        }
        if (Array.isArray(otherFilters.kpp) && otherFilters.kpp.length === 0) {
          delete otherFilters.kpp;
        }
        if (!otherFilters.id_color) {
          delete otherFilters.id_color;
        }
      } else {
        const { company_object, ...filters } = DEFAULT_FILTERS;
        data = {
          ...data,
          company_object,
          filters,
        };
      }

      setLoading(true);

      getAllObjects(data).then((resp) => {
        isLoading.current = false;
        setLoading(false);

        handleResponse(
          resp,
          () => {
            const objectsResp = resp?.data?.objects
              ? Object.entries(resp?.data?.objects)?.map((obj) => obj[1])
              : [];
            const updatedCount = isReset
              ? objectsResp?.length
              : allCountRef.current + objectsResp?.length;
            allCountRef.current = updatedCount;
            setAllCount(updatedCount);

            const updatedObjects = isReset
              ? objectsResp
              : [...dataRef.current, ...objectsResp];
            dataRef.current = updatedObjects;
            setObjects(updatedObjects);
          },
          () => {
            setIsAllPages(true);
            if (isReset) {
              setObjects([]);
              setAllCount(0);
              saveObjectsCount(0);
              dataRef.current = [];
              allCountRef.current = 0;
            }
          },
          true
        );
      });
    }
  };

  const handleToggleFavoritesStatus = () => {
    const updatedData = isFavorite
      ? objects?.filter((obj) => !selected.find((i) => i === obj?.id))
      : objects?.map((obj) =>
          !!selected.find((i) => i === obj?.id)
            ? { ...obj, favorite: !obj.favorite }
            : obj
        );
    dataRef.current = updateData;
    setObjects(updatedData);
    const updatedCount = isFavorite ? allCount - selected.length : allCount;
    allCountRef.current = updatedCount;
    setAllCount(updatedCount);
    const updatedAllCount = isFavorite
      ? (objectsCount || 0) - selected.length
      : objectsCount;
    saveObjectsCount(updatedAllCount);
    setSelected([]);
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      currentPage.current = 0;
      setIsAllPages(false);
      //   setFilters(INIT_FILTERS);
      //   filterActive.current = false;
      handleGetObjects(true);
      //   localStorage.removeItem("objectsLastFilters");
    }
    // eslint-disable-next-line
  }, [isFavorite]);

  const handleApplyFilter = (isApply) => {
    filterActive.current = isApply;
    if (!isApply) {
      setFilters(DEFAULT_FILTERS);
      handleGetRubricsFields(DEFAULT_FILTERS.id_rubric);
      localStorage.removeItem("objectsLastFilters");
    }
    currentPage.current = 0;
    setIsAllPages(false);
    handleGetObjects(true, isApply);
    setIsDeleted(
      isApply ? filters?.company_object?.show_deleted === "1" : false
    );
  };

  useEffect(() => {
    if (filterActive.current) {
      currentPage.current = 0;
      setIsAllPages(false);
      //   handleGetObjects(true);
    }
  }, [filters]);

  useEffect(() => {
    if (!isFirstRender.current) {
      currentPage.current = 0;
      handleGetObjects(true);
    }
  }, [filters.sorting]);

  const handleSelectAll = (isReset, count) => {
    const objectsIds = objects?.map((o) => o.id);
    setSelected(isReset ? [] : objectsIds);
  };

  const handleToggleFavoriteStatus = (id) => {
    addObjectToFavorites([id]).then((resp) => {
      handleResponse(resp, () => {
        const updatedData = isFavorite
          ? objects?.filter((obj) => obj?.id !== id)
          : objects?.map((obj) =>
              obj?.id === id ? { ...obj, favorite: !obj.favorite } : obj
            );
        dataRef.current = updatedData;
        setObjects(updatedData);
        const updatedCount = isFavorite ? allCount : allCount;
        allCountRef.current = updatedCount;
        setAllCount(updatedCount);
        const updatedAllCount = objectsCount || 0;
        saveObjectsCount(updatedAllCount);
        showAlert("success", "Статус успішно змінено!");
      });
    });
  };

  const handleChangeComment = (id, comment) => {
    const updatedData = objects?.map((obj) =>
      obj?.id === id ? { ...obj, comment } : obj
    );
    dataRef.current = updatedData;
    setObjects(updatedData);
  };

  const handleChangeContacts = (id, clients_inf) => {
    const updatedData = objects?.map((obj) =>
      obj?.id === id ? { ...obj, clients_inf } : obj
    );
    dataRef.current = updatedData;
    setObjects(updatedData);
  };

  const handleChangeTags = (id, fieldName, value) => {
    const updatedData = objects?.map((obj) =>
      obj?.id === id ? { ...obj, [fieldName]: value } : obj
    );
    dataRef.current = updatedData;
    setObjects(updatedData);
  };

  useEffect(() => {
    if (updateData) {
      setUpdateData(false);
      handleGetObjects(true);
    }
    // eslint-disable-next-line
  }, [updateData]);

  const handleApplyDefaultFilters = () => {
    filterActive.current = false;
    isFirstRender.current = false;
    setIsDeleted(false);
    setFilterFields([]);
    const filterApply = location?.search?.split("=")[0];
    const filterApplyValue = location?.search?.split("=")[1];
    if (id) {
      setFilters({
        id_hash: id,
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
      });
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?findSelectionSimilar") {
      const initFilters =
        location?.search
          ?.replace("?findSelectionSimilar=true", "")
          ?.split("&")
          ?.filter((f) => f?.length > 0)
          ?.map((f) => f?.split("=")) ?? [];
      let initFiltersObject = {};

      try {
        initFiltersObject = Object.fromEntries(initFilters);
      } catch {
        initFiltersObject = {};
      }

      setFilters({
        ...initFiltersObject,
        id_location: initFiltersObject?.id_location
          ? [initFiltersObject?.id_location]
          : undefined,
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
      });
      if (initFiltersObject?.id_rubric) {
        handleGetRubricsFields(initFiltersObject?.id_rubric);
      }
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?findObject") {
      const initFilters =
        location?.search
          ?.replace("?findObject=true", "")
          ?.split("&")
          ?.filter((f) => f?.length > 0)
          ?.map((f) => f?.split("=")) ?? [];
      let initFiltersObject = {};

      try {
        initFiltersObject = Object.fromEntries(initFilters);
      } catch {
        initFiltersObject = {};
      }

      setFilters({
        ...initFiltersObject,
        id_location: initFiltersObject?.id_location
          ? [initFiltersObject?.id_location]
          : undefined,
      });
      if (initFiltersObject?.id_rubric) {
        handleGetRubricsFields(initFiltersObject?.id_rubric);
      }
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?findWorker") {
      const initFilters =
        location?.search
          ?.replace("?findWorker=true", "")
          ?.split("&")
          ?.filter((f) => f?.length > 0)
          ?.map((f) => f?.split("=")) ?? [];
      let initFiltersObject = {};

      try {
        initFiltersObject = Object.fromEntries(initFilters);
      } catch {
        initFiltersObject = {};
      }

      setIsDeleted(initFiltersObject?.show_deleted === "1");
      setFilters({ company_object: initFiltersObject });
      localStorage.setItem(
        "objectsLastFilters",
        JSON.stringify({ company_object: initFiltersObject })
      );
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?showDeadline") {
      setFilters({ company_object: { overdue: "1", show_only: "only_my" } });
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?showLiquidity") {
      setFilters({ showLiquidity: "1" });
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?my_objects") {
      setFilters({
        company_object: {
          show_only: "only_my",
          show_street_base_company: "1",
          overdue: "1",
          not_actual: "1",
          given_objects: "1",
          actual: "1",
        },
      });
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?moderationAfterStreetBase") {
      setFilters({
        company_object: {
          show_only: "only_my",
          show_street_base_company: "1",
        },
      });
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?findClientsObjects") {
      setFilters({
        search_phone_code: 1,
        search_phone: filterApplyValue,
        street_base_object: {
          sorting_id: "14",
        },
      });
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?xdrive") {
      setFilters({
        id_hash: filterApplyValue,
        street_base_object: {
          sorting_id: "14",
        },
      });
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?showOwnerObject") {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      const filters = {
        showOwnerObject: params.get("showOwnerObject"),
        ownerSource: params.get("ownerSource"),
      };
      setFilters({
        street_base_object: {
          ...filters,
          sorting_id: "14",
        },
      });
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?VIN") {
      setFilters({
        street_base_object: {
          VIN: filterApplyValue,
          sorting_id: "14",
        },
      });
      filterActive.current = true;
      setUpdateData(true);
    } else if (filterApply === "?showFilterObject") {
      setFilters({
        street_base_object: {
          showFilterObject: [],
        },
      });
      filterActive.current = true;
      setUpdateData(true);
    } else if (
      filterApply === "?prev" ||
      localStorage.getItem("objectsLastFilters")
    ) {
      const lastFilters = localStorage.getItem("objectsLastFilters")
        ? checkIsJSON(localStorage.getItem("objectsLastFilters"))
        : DEFAULT_FILTERS;

      setFilters(lastFilters);
      setIsDeleted(lastFilters?.company_object?.show_deleted === "1");
      filterActive.current = true;
      setUpdateData(true);
      if (lastFilters?.id_rubric) {
        handleGetRubricsFields(lastFilters?.id_rubric);
      }
    } else {
      setFilters(DEFAULT_FILTERS);
      filterActive.current = true;
      setUpdateData(true);
    }
  };

  useEffect(() => {
    handleApplyDefaultFilters();
  }, [location.search, id]);

  useEffect(() => {
    handleApplyDefaultFilters();
  }, []);

  const handleScroll = () => {
    if (
      listRef.current.offsetHeight + listRef.current.scrollTop <=
        listRef.current.scrollHeight - 200 ||
      isLoading.current
    ) {
      return;
    }

    // load more objects only if we are online
    if (navigator.onLine) {
      currentPage.current += 1;
      handleGetObjects();
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.addEventListener("scroll", handleScroll);
      return () =>
        listRef.current &&
        // eslint-disable-next-line
        listRef.current.removeEventListener("scroll", handleScroll);
    }
    // eslint-disable-next-line
  }, [listRef, isLoading.current, isAllPages, objects]);

  useEffect(() => {
    saveObjectsCount(0);
    // eslint-disable-next-line
  }, []);

  const handleDeleteObjectSuccess = (id) => {
    const updatedCount = allCount - 1;
    allCountRef.current = updatedCount;
    saveObjectsCount(objectsCount - 1);
    setAllCount(updatedCount);
    const updatedData = objects.filter((obj) => obj.id !== id);
    dataRef.current = updatedData;
    setObjects(updatedData);
    setSelected([]);
    // handleGetObjects();
  };

  const handleDeleteObjectsFilterByIds = (ids, isSelected) => {
    const updatedCount = allCount - ids?.length;
    allCountRef.current = updatedCount;
    const updatedAllCount = (objectsCount || 0) - ids.length;
    saveObjectsCount(updatedAllCount);
    setAllCount(updatedCount);
    const updatedData = objects.filter((obj) => !ids.find((s) => s === obj.id));
    dataRef.current = updateData;
    setObjects(updatedData);
    isSelected && setSelected([]);
    ids?.length === allCount && handleGetObjects(true);
  };

  const handleRestoreObjects = (ids, isSelected) => {
    if (ids?.length > 0) {
      restoreObjects(ids).then((resp) =>
        handleResponse(resp, () => {
          showAlert(
            "success",
            `Автомобіл${ids?.length === 1 ? "ь" : "і"} успішно відновлено`
          );
          handleDeleteObjectsFilterByIds(ids, isSelected);
        })
      );
    }
  };

  const handleCopyFastFolderLink = () => {
    const LINK = `https://fast-selection.house-hunter.info/?us=${
      user?.id
    }&id=${btoa(JSON.stringify(selected))}`;

    handleCopy(LINK);
    setSelected([]);
  };

  return (
    <StyledObjects>
      <Header
        selectedCount={selected.length}
        onFavorite={handleToggleFavoritesStatus}
        onIsFavotite={() => setIsFavorite(!isFavorite)}
        onDelete={() => handleDeleteObjectsFilterByIds(selected, true)}
        filters={filters}
        onChangeFilter={handleChangeFilter}
        onApplyFilter={handleApplyFilter}
        onSelectAll={handleSelectAll}
        onChangeActionLoading={(val) => setActionLoading(val)}
        onChangePhoneCode={handleChangePhoneCode}
        onRestore={() => handleRestoreObjects(selected, true)}
        selectedClients={[
          ...new Set(
            objects
              ?.filter((o) => selected?.includes(o.id))
              ?.map((o) => o?.id_client)
              ?.filter((clientId) => !!clientId)
          ),
        ]}
        onRefetch={() => handleGetObjects(true, true)}
        onFastCopy={user?.show_fast_folder ? handleCopyFastFolderLink : null}
      />
      <List
        onSelect={handleSelect}
        data={objects ?? []}
        toggleFavoriteStatus={handleToggleFavoriteStatus}
        onFindSimilar={handleFindSimilarTo}
        innerRef={listRef}
        onDeleteSuccess={handleDeleteObjectSuccess}
        onChangeComment={handleChangeComment}
        currency={Number(filters?.price_currency - 1)}
        onChangeCurrency={(val) =>
          handleChangeFilter("price_currency", val + 1)
        }
        onChangeContancts={handleChangeContacts}
        onRestore={handleRestoreObjects}
        isDeleted={filters?.company_object?.show_deleted === "1"}
        onChangeTags={handleChangeTags}
        filters={filters}
      />
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  padding: 15px 20px;
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  position: relative;
  @media (max-width: 500px) {
    padding: 10px;
  }
`;

export default Objects;
