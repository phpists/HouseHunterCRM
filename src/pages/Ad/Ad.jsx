import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List";
import { useEffect, useState } from "react";
import {
  useLazyAddToFavoritesQuery,
  useLazyGetAllObjectsQuery,
  useLazyGetListAddsPublichQuery,
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
} from "../../utilits";
import cogoToast from "cogo-toast";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelect } from "../../hooks/redux";

const Ad = () => {
  const [getListAdds] = useLazyGetListAddsPublichQuery();
  const [data, setData] = useState([]);
  const { user } = useAppSelect((state) => state.auth);
  const { id } = useParams();
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
    // price_for: "4",
    // price_currency: "1",
    // sorting: "0",
    // company_object: {
    //   show_only: "only_my",
    //   actual: "1",
    // },
  };
  const { objectsCount } = useAppSelect((state) => state.objects);
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [filtersFields, setFilterFields] = useState([]);
  const filterActive = useRef(!!id);
  const [allCount, setAllCount] = useState(0);
  const handleGetRubricsFields = (id) => {
    // getRubricField(id).then((resp) => {
    //   setFilterFields(resp?.data);
    // });
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
      } else if (field?.includes("_min") || field?.includes("_max")) {
        const fieldMinName = field?.includes("_min")
          ? field
          : field?.replace("_max", "_min");
        const fieldMaxName = field?.includes("_max")
          ? field
          : field?.replace("_min", "_max");

        const valMin = field?.includes("_min")
          ? value
          : updatedFilters[fieldMinName] ?? 0;
        const valMax = field?.includes("_max")
          ? value
          : updatedFilters[fieldMaxName] ?? 0;

        if (
          valMin > valMax &&
          field?.includes("_min") &&
          valMin !== 0 &&
          valMax
        ) {
          updatedFilters = {
            ...updatedFilters,
            [fieldMinName]: valMin,
            [fieldMaxName]: valMin,
          };
        } else if (
          valMax < valMin &&
          field?.includes("_max") &&
          valMax !== 0 &&
          valMin
        ) {
          updatedFilters = {
            ...updatedFilters,
            [fieldMinName]: valMax,
            [fieldMaxName]: valMax,
          };
        }
      }

      if (field === "street_base_object") {
        const isEmpty =
          Object.entries(updatedFilters?.street_base_object)?.filter(
            (v) => v[1]
          )?.length === 0 ||
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
      //   handleGetObjects(true);
      //   localStorage.removeItem("objectsLastFilters");
    }
    // eslint-disable-next-line
  }, [isFavorite]);

  const handleGetData = () => {
    getListAdds({ status: filters?.status }).then((resp) =>
      setData(resp?.data?.data)
    );
  };

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    setAllCount(data?.length);
  }, [data]);

  const handleApplyFilter = (isApply) => {
    filterActive.current = isApply;
    if (!isApply) {
      setFilters(DEFAULT_FILTERS);
      setFilterFields([]);
      localStorage.removeItem("objectsLastFilters");
    }
    currentPage.current = 0;
    setIsAllPages(false);
    // handleGetObjects(true, isApply);
    getListAdds({ status: isApply ? filters?.status : undefined }).then(
      (resp) => setData(resp?.data?.data)
    );
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
      //   handleGetObjects(true);
    }
  }, [filters.sorting]);

  const handleSelectAll = (isReset, count) => {
    const objectsIds = objects?.map((o) => o.id);
    setSelected(isReset ? [] : objectsIds);
  };

  const handleToggleFavoriteStatus = (id) => {
    // addObjectToFavorites([id]).then((resp) => {
    //   handleResponse(resp, () => {
    //     const updatedData = isFavorite
    //       ? objects?.filter((obj) => obj?.id !== id)
    //       : objects?.map((obj) =>
    //           obj?.id === id ? { ...obj, favorite: !obj.favorite } : obj
    //         );
    //     dataRef.current = updatedData;
    //     setObjects(updatedData);
    //     const updatedCount = isFavorite ? allCount - 1 : allCount;
    //     allCountRef.current = updatedCount;
    //     setAllCount(updatedCount);
    //     const updatedAllCount = (objectsCount || 0) - 1;
    //     saveObjectsCount(updatedAllCount);
    //     cogoToast.success("Статус успішно змінено!", {
    //       hideAfter: 3,
    //       position: "top-right",
    //     });
    //   });
    // });
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

    const objData = {
      id_rubric,
      id_location,
      price_min: handleGetRange(Number(price_UAH), true)?.start.toFixed(0),
      price_max: handleGetRange(Number(price_UAH), true)?.end.toFixed(0),
      area_total_min: handleGetRange(Number(area_total), true)?.start.toFixed(
        0
      ),
      area_total_max: handleGetRange(Number(area_total), true)?.end.toFixed(0),
      area_plot_sotka_min: handleGetRange(
        Number(area_plot_sotka),
        true
      )?.start.toFixed(0),
      area_plot_sotka_max: handleGetRange(
        Number(area_plot_sotka),
        true
      )?.end.toFixed(0),
      room_min: handleGetRange(Number(rooms))?.start.toFixed(0),
      room_max: handleGetRange(Number(rooms))?.end.toFixed(0),
      storey_count_min: handleGetRange(Number(storey_count))?.start.toFixed(0),
      storey_count_max: handleGetRange(Number(storey_count))?.end.toFixed(0),
      address_storey_min: handleGetRange(Number(address_storey))?.start.toFixed(
        0
      ),
      address_storey_max: handleGetRange(Number(address_storey))?.end.toFixed(
        0
      ),
      price_currency: "1",
    };

    const objUrl = `/objects?findSelectionSimilar=true${Object.entries(objData)
      ?.map((d) => `&${d[0]}=${d[1]}`)
      ?.join("")}`;

    window.open(objUrl, "_blank");
  };

  useEffect(() => {
    if (updateData) {
      setUpdateData(false);
      //   handleGetObjects(true);
    }
    // eslint-disable-next-line
  }, [updateData]);

  const handleScroll = () => {
    // if (
    //   listRef.current.offsetHeight + listRef.current.scrollTop <=
    //     listRef.current.scrollHeight - 200 ||
    //   isLoading.current
    // ) {
    //   return;
    // }
    // currentPage.current += 1;
    // handleGetObjects();
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
    setSelected([]);
    handleGetData();
  };

  const handleDeleteObjectsFilterByIds = (ids, isSelected) => {
    const updatedCount = allCount - ids?.length;
    allCountRef.current = updatedCount;
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

  const handleCopyFastFolderLink = () => {
    const LINK = `https://fast-selection.house-hunter.info/?us=${
      user?.id
    }&id=${btoa(JSON.stringify(selected))}`;

    handleCopy(LINK);
    setSelected([]);
  };

  const handleUpdateObjectValue = (id, field, value) =>
    setData(
      data?.map((e) =>
        e.id_ad_in_source === id ? { ...e, [field]: value } : e
      )
    );

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
        onRefetch={() => null}
        onFastCopy={user?.show_fast_folder ? handleCopyFastFolderLink : null}
      />
      <List
        selected={selected}
        onSelect={handleSelect}
        data={data ?? []}
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
        filters={filters}
        onUpdateObject={handleUpdateObjectValue}
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

export default Ad;
