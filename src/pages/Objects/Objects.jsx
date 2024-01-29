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
    id_location: "",
    price_currency: "1",
    price: "",
    price_max: "",
    price_min: "",
    obj_is_actual: "1",
    show_only: "only_my",
    id_hash: id ?? "",
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

  const handleChangeFilter = (field, value, isDataUpdate) => {
    if (isDataUpdate) {
      setFilters(value);
    } else {
      setFilters({ ...filters, [field]: value });
      if (field === "id_rubric") {
        handleGetRubricsFields(value);
        setFilters({
          id_rubric: value,
          id_location: filters?.id_location,
          price_currency: filters?.price_currency,
          price_min: filters?.price_min,
          price_max: filters?.price_max,
        });
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
        data = {
          ...data,
          filters: Object.fromEntries(
            Object.entries(filters)?.filter((f) => f[1] !== "0")
          ),
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
    setObjects(
      objects.map((req) => {
        if (!!selected.find((s) => s === req[0])) {
          let request = [];
          request[0] = req[0];
          request[1] = { ...req[1], favorite: !req[1]?.favorite };
          return request;
        }
        return req;
      })
    );
    setSelected([]);
  };

  const handleDeleteSuccess = () => {
    setObjects(objects.filter((obj) => !selected.find((s) => s === obj.id)));
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
      handleGetObjects(true);
    }
  }, [filters]);

  const handleSelectAll = (isReset, count) => {
    const objIds = objects?.map((obj) => obj.id)?.slice(0, count ?? undefined);

    setSelected(isReset ? [] : objIds);
  };

  const handleToggleFavoriteStatus = (id) => {
    addObjectToFavorites(id).then((resp) => {
      handleResponse(resp, () => {
        setObjects(
          objects?.map((obj) =>
            obj?.id === id ? { ...obj, favorite: !obj.favorite } : obj
          )
        );
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
      area_total: handleGetRange(Number(area_total), true)?.end.toFixed(0),
      area_plot_sotka: handleGetRange(
        Number(area_plot_sotka),
        true
      )?.end.toFixed(0),
      rooms: handleGetRange(Number(rooms))?.end.toFixed(0),
      storey_count: handleGetRange(Number(storey_count))?.end.toFixed(0),
      address_storey: handleGetRange(Number(address_storey))?.end.toFixed(0),
      price_currency: "1",
    });
    handleGetRubricsFields(id_rubric);
    filterActive.current = true;
  };

  useEffect(() => {
    filterActive.current && handleGetObjects(true);
  }, [filters]);

  useEffect(() => {
    filterActive.current = false;
    const filterApply = location?.search?.split("=")[0];
    if (filterApply === "?showDeadline") {
      setFilters({ showDeadline: "1" });
      filterActive.current = true;
    } else if (filterApply === "?showLiquidity") {
      setFilters({ showLiquidity: "1" });
      filterActive.current = true;
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
