import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List";
import { useEffect, useState } from "react";
import { useLazyGetListAddsPublichQuery } from "../../store/objects/objects.api";
import { useActions } from "../../hooks/actions";
import { useRef } from "react";
import { useAppSelect } from "../../hooks/redux";

const Ad = () => {
  const [getListAdds] = useLazyGetListAddsPublichQuery();
  const [data, setData] = useState([]);
  const { saveObjectsCount } = useActions();
  const [selected, setSelected] = useState([]);
  const [objects, setObjects] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const adLastFilters = localStorage.getItem("adLastFilters");
  const DEFAULT_FILTERS = adLastFilters ? JSON.parse(adLastFilters) : {};
  const { objectsCount } = useAppSelect((state) => state.objects);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [filtersFields, setFilterFields] = useState([]);
  const filterActive = useRef(!!adLastFilters);
  const [allCount, setAllCount] = useState(0);
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const [isAllPages, setIsAllPages] = useState(false);
  const isFirstRender = useRef(true);
  const [loading, setLoading] = useState(false);
  const dataRef = useRef([]);
  const allCountRef = useRef(0);
  const [updateData, setUpdateData] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [phoneCode, setPhoneCode] = useState("1");
  const [isDeleted, setIsDeleted] = useState(false);

  const handleChangePhoneCode = (val) => setPhoneCode(val);

  const handleChangeFilter = (field, value, isDataUpdate) => {
    if (isDataUpdate) {
      setFilters(value);
      localStorage.setItem("adLastFilters", JSON.stringify(value));
    } else {
      let updatedFilters = { ...filters, [field]: value };

      setFilters(updatedFilters);
      localStorage.setItem("adLastFilters", JSON.stringify(updatedFilters));
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
      //   localStorage.removeItem("adLastFilters");
    }
    // eslint-disable-next-line
  }, [isFavorite]);

  const handleGetData = () => {
    getListAdds(filterActive.current ? filters : {}).then((resp) =>
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
      localStorage.removeItem("adLastFilters");
    }
    currentPage.current = 0;
    setIsAllPages(false);
    // handleGetObjects(true, isApply);
    handleGetData(!isApply);

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
    const objectsIds = data?.map((o) => o.id_ad_in_source);
    setSelected(isReset ? [] : objectsIds);
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
    const { id_obj } = obj;

    const objData = {
      id_hash: id_obj,
    };

    const objUrl = `/objects?findObject=true${Object.entries(objData)
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

  const handleDeleteObjectSuccess = () => {
    setSelected([]);
    handleGetData();
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
        filters={filters}
        onChangeFilter={handleChangeFilter}
        filtersFields={filtersFields}
        onApplyFilter={handleApplyFilter}
        allCount={allCount}
        onSelectAll={handleSelectAll}
        onChangeActionLoading={(val) => setActionLoading(val)}
        phoneCode={phoneCode}
        onChangePhoneCode={handleChangePhoneCode}
        isDeleted={isDeleted}
        onRefetch={() => null}
        onDeleteSuccess={handleDeleteObjectSuccess}
        data={data ?? []}
      />
      <List
        selected={selected}
        onSelect={handleSelect}
        data={data ?? []}
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
