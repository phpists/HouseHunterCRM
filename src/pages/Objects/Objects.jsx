import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List";
import { useEffect, useState } from "react";
import {
  useLazyAddToFavoritesQuery,
  useLazyGetAllObjectsQuery,
  useLazyGetObjectsCountQuery,
  useLazyGetRubricFieldsQuery,
} from "../../store/objects/objects.api";
import { useActions } from "../../hooks/actions";
import { useRef } from "react";
import { handleGetRange, handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";
import { useLocation, useParams } from "react-router-dom";

export const Objects = () => {
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
    search_phone_code: "1",
    //   only_company_obj: "0",
    //   only_street_base_obj: "0",
    //   only_my_obj: "0",
    //   only_my_structure: "0",
  };
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
  const [loading, setLoading] = useState(false);
  const dataRef = useRef([]);
  const allCountRef = useRef(0);
  const [updateData, setUpdateData] = useState(false);
  const firstThousand = useRef([]);

  const handleChangeFilter = (field, value, isDataUpdate) => {
    console.log(field, value);
    if (isDataUpdate) {
      setFilters(value);
    } else {
      setFilters({ ...filters, [field]: value });
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

  const handleGetObjects = (isReset) => {
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

      let data = {
        only_favorite: isFavorite ?? undefined,
        current_page: currentPage.current,
        item_on_page: 10,
      };

      if (filterActive.current) {
        const {
          company_object,
          street_base_object,
          mls_object,
          ...otherFilters
        } = Object.fromEntries(
          Object.entries(filters)?.filter((f) => f[1] !== "0")
        );

        data = {
          ...data,
          company_object,
          street_base_object,
          mls_object,
          filters: {
            ...otherFilters,
            search_phone_code:
              filters?.search_phone?.length > 0
                ? otherFilters?.search_phone_code
                : undefined,
            findPhone:
              filters?.findPhone?.length > 0
                ? filters?.findPhone
                    ?.replaceAll("-", "")
                    ?.replace("(", "")
                    ?.replace(")", "")
                    ?.replaceAll("_", "")
                : undefined,
            search_phone:
              filters?.search_phone?.length > 0
                ? filters?.search_phone
                    ?.replaceAll("-", "")
                    ?.replace("(", "")
                    ?.replace(")", "")
                    ?.replaceAll("_", "")
                : undefined,
          },
        };
      }

      setLoading(true);

      getAllObjects(data).then((resp) => {
        isLoading.current = false;
        setLoading(false);

        handleResponse(
          resp,
          () => {
            firstThousand.current = resp?.data?.first_1000;
            const objectsResp = resp?.data?.objects
              ? Object.entries(resp?.data?.objects)?.map((obj) => obj[1])
              : [];
            // const updatedCount = isReset
            //   ? objectsResp?.length
            //   : allCountRef.current + objectsResp?.length;
            allCountRef.current = resp?.data?.all_item;
            setAllCount(resp?.data?.all_item);

            const updatedObjects = isReset
              ? objectsResp
              : [...dataRef.current, ...objectsResp];
            dataRef.current = updatedObjects;
            setObjects(updatedObjects);
            saveObjectsCount(resp?.data?.all_item);
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
    saveObjectsCount(updatedCount);
    setSelected([]);
  };

  const handleDeleteSuccess = () => {
    firstThousand.current = firstThousand.current.filter(
      (c) => !selected.find((sc) => sc === c)
    );
    const updatedCount = allCount - selected?.length;
    allCountRef.current = updatedCount;
    saveObjectsCount(updatedCount);
    setAllCount(updatedCount);
    const updatedData = objects.filter(
      (obj) => !selected.find((s) => s === obj.id)
    );
    dataRef.current = updateData;
    setObjects(updatedData);
    setSelected([]);
    handleGetObjects();
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      currentPage.current = 0;
      setIsAllPages(false);
      setFilters(INIT_FILTERS);
      filterActive.current = false;
      handleGetObjects(true);
    }
    // eslint-disable-next-line
  }, [isFavorite]);

  const handleApplyFilter = (isApply) => {
    filterActive.current = isApply;
    if (!isApply) {
      setFilters({ ...INIT_FILTERS, id_hash: "" });
      setFilterFields([]);
    }
    currentPage.current = 0;
    setIsAllPages(false);
    handleGetObjects(true);
  };

  useEffect(() => {
    if (filterActive.current) {
      currentPage.current = 0;
      setIsAllPages(false);
      //   handleGetObjects(true);
    }
  }, [filters]);

  const handleSelectAll = (isReset, count) => {
    const objectsIds = firstThousand.current;
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
        dataRef.current = updateData;
        setObjects(updatedData);
        const updatedCount = isFavorite ? allCount - 1 : allCount;
        allCountRef.current = updatedCount;
        setAllCount(updatedCount);
        saveObjectsCount(updatedCount);

        cogoToast.success("Статус успішно змінено!", {
          hideAfter: 3,
          position: "top-right",
        });
      });
    });
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
  }, [updateData]);

  useEffect(() => {
    filterActive.current = false;
    const filterApply = location?.search?.split("=")[0];
    if (filterApply === "?showDeadline") {
      setFilters({ showDeadline: "1" });
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
    } else {
      handleGetObjects();
    }
  }, [location.search]);

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
  }, []);

  return (
    <StyledObjects>
      <Header
        selectedCount={selected.length}
        selected={selected}
        onFavorite={handleToggleFavoritesStatus}
        isFavorite={isFavorite}
        onIsFavotite={() => setIsFavorite(!isFavorite)}
        onDelete={handleDeleteSuccess}
        filters={filters}
        onChangeFilter={handleChangeFilter}
        filtersFields={filtersFields}
        onApplyFilter={handleApplyFilter}
        allCount={allCount}
        onSelectAll={handleSelectAll}
      />
      <List
        selected={selected}
        onSelect={handleSelect}
        data={objects ?? []}
        toggleFavoriteStatus={handleToggleFavoriteStatus}
        onFindSimilar={handleFindSimilarTo}
        innerRef={listRef}
        loading={loading}
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
