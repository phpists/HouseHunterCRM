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
  handleFromInputDate,
  handleGetRange,
  handleResponse,
  removePhoneMask,
} from "../../utilits";
import cogoToast from "cogo-toast";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelect } from "../../hooks/redux";

const Objects = () => {
  const { id } = useParams();
  const location = useLocation();
  const [getAllObjects] = useLazyGetAllObjectsQuery();
  const [getRubricField] = useLazyGetRubricFieldsQuery();
  const [addObjectToFavorites] = useLazyAddToFavoritesQuery();
  const { saveObjectsCount } = useActions();
  const [selected, setSelected] = useState([]);
  const [objects, setObjects] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const INIT_FILTERS = {
    id_rubric: "",
    id_location: [],
    price_currency: "1",
    price: "",
    price_max: "",
    price_min: "",
    id_hash: id ?? "",
    price_for: "4",
    sorting: "0",
  };

  const DEFAULT_FILTERS = {
    price_for: "4",
    price_currency: "1",
    sorting: "0",
    company_object: {
      show_only: "only_my",
      actual: "1",
    },
  };
  const { objectsCount } = useAppSelect((state) => state.objects);
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [filtersFields, setFilterFields] = useState([]);
  const filterActive = useRef(!!id);
  const [allCount, setAllCount] = useState(0);
  const handleGetRubricsFields = (id) => {
    getRubricField(id).then((resp) => {
      setFilterFields(resp?.data);
    });
  };
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const [isAllPages, setIsAllPages] = useState(false);
  const isFirstRender = useRef(true);
  const isFirstRequest = useRef(true);
  const [loading, setLoading] = useState(false);
  const dataRef = useRef([]);
  const allCountRef = useRef(0);
  const [updateData, setUpdateData] = useState(false);
  const firstThousand = useRef([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [phoneCode, setPhoneCode] = useState("1");
  const [restoreObjects] = useLazyRestoreObjectsQuery();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleChangePhoneCode = (val) => setPhoneCode(val);

  const handleChangeFilter = (field, value, isDataUpdate) => {
    if (isDataUpdate) {
      setFilters(value);
      localStorage.setItem("objectsLastFilters", JSON.stringify(value));
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
          Object.entries(updatedFilters?.street_base_object)?.length > 0 &&
          Object.entries(updatedFilters?.street_base_object)?.[0]?.[1]
            ?.length === 0;

        if (isEmpty) {
          updatedFilters = { ...updatedFilters, street_base_object: {} };
        }
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
        item_on_page: 10,
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
            dt_end_agreement_to: dt_end_agreement_to?.getTime(),
          },
          street_base_object,
          mls_object,
          sorting,
          filters: {
            ...otherFilters,
            search_phone_code:
              removePhoneMask(filters?.search_phone)?.length > 0
                ? phoneCode
                : undefined,
            findPhone:
              filters?.findPhone?.length > 0 ? filters?.findPhone : undefined,
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

            if (isFirstRequest.current || !isApply) {
              isFirstRequest.current = false;
              getAllObjects({ ...data, only_count_item: "1" }).then((resp) =>
                saveObjectsCount(resp?.data?.count_item ?? 0)
              );
            }
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
      setFilterFields([]);
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
        const updatedCount = isFavorite ? allCount - 1 : allCount;
        allCountRef.current = updatedCount;
        setAllCount(updatedCount);
        const updatedAllCount = (objectsCount || 0) - 1;
        saveObjectsCount(updatedAllCount);

        cogoToast.success("Статус успішно змінено!", {
          hideAfter: 3,
          position: "top-right",
        });
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

  const handleFindSimilarTo = (obj) => {
    const {
      id_location,
      id_rubric,
      price_UAH,
      rooms,
      address_storey,
      area_plot_sotka,
      area_total,
      storey_count,
    } = obj;
    setFilters({
      id_rubric,
      id_location: [id_location],
      price_min:
        !price_UAH || price_UAH === "0"
          ? undefined
          : handleGetRange(Number(price_UAH), true)?.start.toFixed(0),
      price_max:
        !price_UAH || price_UAH === "0"
          ? undefined
          : handleGetRange(Number(price_UAH), true)?.end.toFixed(0),
      area_total_min:
        !area_total || area_total === "0"
          ? undefined
          : handleGetRange(Number(area_total), true)?.start.toFixed(0),
      area_total_max:
        !area_total || area_total === "0"
          ? undefined
          : handleGetRange(Number(area_total), true)?.end.toFixed(0),
      area_plot_sotka_min:
        !area_plot_sotka || area_plot_sotka === "0"
          ? undefined
          : handleGetRange(Number(area_plot_sotka), true)?.start.toFixed(0),
      area_plot_sotka_max:
        !area_plot_sotka || area_plot_sotka === "0"
          ? undefined
          : handleGetRange(Number(area_plot_sotka), true)?.end.toFixed(0),
      room_min: rooms === "0" ? undefined : rooms,
      room_max: rooms === "0" ? undefined : rooms,
      storey_count_min:
        !storey_count || storey_count === "0"
          ? undefined
          : handleGetRange(Number(storey_count))?.start.toFixed(0),
      storey_count_max:
        !storey_count || storey_count === "0"
          ? undefined
          : handleGetRange(Number(storey_count))?.end.toFixed(0),
      address_storey_min:
        !address_storey || address_storey === "0"
          ? undefined
          : handleGetRange(Number(address_storey))?.start.toFixed(0),
      address_storey_max:
        !address_storey || address_storey === "0"
          ? undefined
          : handleGetRange(Number(address_storey))?.end.toFixed(0),
      price_currency: "1",
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
    });
    handleGetRubricsFields(id_rubric);
    filterActive.current = true;
    setUpdateData(true);
  };

  useEffect(() => {
    if (updateData) {
      setUpdateData(false);
      handleGetObjects(true);
    }
    // eslint-disable-next-line
  }, [updateData]);

  useEffect(() => {
    filterActive.current = false;
    isFirstRender.current = false;
    setIsDeleted(false);
    setFilterFields([]);
    const filterApply = location?.search?.split("=")[0];
    if (id) {
      setFilters({
        id_hash: id,
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
      });
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
    } else {
      setFilters(DEFAULT_FILTERS);
      filterActive.current = true;
      setUpdateData(true);
    }
  }, [location.search, id]);

  const handleScroll = () => {
    if (
      listRef.current.offsetHeight + listRef.current.scrollTop <=
        listRef.current.scrollHeight - 200 ||
      isLoading.current
    ) {
      return;
    }
    currentPage.current += 1;
    handleGetObjects();
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
    // handleGetObjects();
  };

  const handleRestoreObjects = (ids, isSelected) => {
    if (ids?.length > 0) {
      restoreObjects(ids).then((resp) =>
        handleResponse(resp, () => {
          cogoToast.success(
            `Oб'єкт${ids?.length === 1 ? "" : "и"} успішно відновлено`,
            {
              hideAfter: 3,
              position: "top-right",
            }
          );
          handleDeleteObjectsFilterByIds(ids, isSelected);
        })
      );
    }
  };

  return (
    <StyledObjects>
      <Header
        selectedCount={selected.length}
        selected={selected}
        onFavorite={handleToggleFavoritesStatus}
        isFavorite={isFavorite}
        onIsFavotite={() => setIsFavorite(!isFavorite)}
        onDelete={() => handleDeleteObjectsFilterByIds(selected, true)}
        filters={filters}
        onChangeFilter={handleChangeFilter}
        filtersFields={filtersFields}
        onApplyFilter={handleApplyFilter}
        allCount={allCount}
        onSelectAll={handleSelectAll}
        onChangeActionLoading={(val) => setActionLoading(val)}
        phoneCode={phoneCode}
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
        isDeleted={isDeleted}
      />
      <List
        selected={selected}
        onSelect={handleSelect}
        data={objects ?? []}
        toggleFavoriteStatus={handleToggleFavoriteStatus}
        onFindSimilar={handleFindSimilarTo}
        innerRef={listRef}
        loading={loading}
        actionLoading={actionLoading}
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
      />
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  padding: 15px 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  position: relative;
`;

export default Objects;
