import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List";
import {
  useLazyGetSelectionsQuery,
  useLazyHideObjectFromSelectionsQuery,
} from "../../store/selections/selections.api";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  useLazyAddToFavoritesQuery,
  useLazyGetRubricFieldsQuery,
} from "../../store/objects/objects.api";
import { handleGetRange, handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";
import { useActions } from "../../hooks/actions";

const INIT_FILTERS = {
  show_object_hide: "0",
  id_rubric: "",
  id_location: "",
  price_currency: "1",
  price: "",
  price_max: "",
  price_min: "",
  obj_is_actual: "1",
  show_only: "only_my",
  //   only_company_obj: "0",
  //   only_street_base_obj: "0",
  //   only_my_obj: "0",
  //   only_my_structure: "0",
};

export const Selections = () => {
  const { id } = useParams();
  const [getSelections] = useLazyGetSelectionsQuery();
  const [getRubricField] = useLazyGetRubricFieldsQuery();
  const [hideObject] = useLazyHideObjectFromSelectionsQuery();
  const [addObjectToFavorites] = useLazyAddToFavoritesQuery();
  const [objects, setObjects] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [filtersFields, setFilterFields] = useState([]);
  const filterActive = useRef(false);
  const [allCount, setAllCount] = useState(0);
  const { saveSelectionsCount } = useActions();
  const [showObjectHide, setShowObjectHide] = useState(undefined);
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const [isAllPages, setIsAllPages] = useState(false);

  const handleGetRubricsFields = (id) => {
    getRubricField(id).then((resp) => {
      setFilterFields(resp?.data);
    });
  };

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

  const handleGetSelections = (isReset) => {
    if ((!isLoading.current && !isAllPages) || isReset) {
      isLoading.current = true;
      if (isReset) {
        listRef.current.scroll({ top: 0 });
        setObjects([]);
      }

      getSelections({
        id_requst_group: id,
        filters: {
          ...(filterActive.current ? filters : {}),
          show_object_hide: showObjectHide,
        },
        current_page: currentPage.current,
        item_on_page: 10,
      }).then((resp) =>
        handleResponse(
          resp,
          () => {
            isLoading.current = false;
            const objectsResp = resp.data?.data ?? [];
            setObjects(isReset ? objectsResp : [...objects, ...objectsResp]);
            setAllCount(allCount + objectsResp?.length);
            saveSelectionsCount(resp?.data?.all_item ?? "0");
          },
          () => {
            isLoading.current = false;
            setIsAllPages(true);
            if (isReset) {
              setObjects([]);
              setAllCount(0);
              saveSelectionsCount(0);
            }
          }
        )
      );
    }
  };

  useEffect(() => {
    if (id) {
      handleGetSelections(true);
    }
  }, [id]);

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
  };

  const handleApplyFilter = (isApply) => {
    filterActive.current = isApply;
    if (!isApply) {
      setFilters(INIT_FILTERS);
      setFilterFields([]);
      currentPage.current = 0;
      setIsAllPages(false);
    }
    handleGetSelections(true);
  };

  const handleSelectAll = (isReset, count) => {
    const objIds = objects
      ?.map((obj) => obj.id)
      ?.slice(0, count ? count : undefined);

    setSelected(isReset ? [] : objIds);
  };

  const handleHideObject = (id_object) => {
    hideObject({ id_request_group: id, id_object }).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Об'єкт успішно приховано", {
          hideAfter: 3,
          position: "top-right",
        });
        setObjects(objects?.filter((o) => o?.id !== id_object));
      })
    );
  };

  const handleHideObjects = () => {
    setObjects(objects?.filter((o) => !selected?.find((s) => s === o?.id)));
    setSelected([]);
  };

  const handleToggleHidden = () => {
    setShowObjectHide(showObjectHide === "1" ? undefined : "1");
    setFilters(INIT_FILTERS);
    filterActive.current = false;
  };

  useEffect(() => {
    currentPage.current = 0;
    setIsAllPages(false);
    handleGetSelections();
  }, [showObjectHide]);

  const handleScroll = () => {
    if (
      listRef.current.offsetHeight + listRef.current.scrollTop <=
        listRef.current.scrollHeight - 200 ||
      isLoading.current
    ) {
      return;
    }
    currentPage.current += 1;
    handleGetSelections();
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
    <StyledSelections>
      <Header
        selectedCount={selected.length}
        selected={selected}
        onRefresh={handleGetSelections}
        filters={filters}
        onChangeFilter={handleChangeFilter}
        filtersFields={filtersFields}
        onApplyFilter={handleApplyFilter}
        allCount={allCount}
        onSelectAll={handleSelectAll}
        objectsIds={objects?.map((obj) => obj.id)}
        onHide={handleHideObjects}
        onToggleHidden={handleToggleHidden}
        showObjectHide={showObjectHide}
      />
      <List
        data={objects}
        selected={selected}
        onSelect={handleSelect}
        onFindSimilar={handleFindSimilarTo}
        onHide={handleHideObject}
        innerRef={listRef}
        // onFavorite={handleToggleFavoriteStatus}
      />
    </StyledSelections>
  );
};

const StyledSelections = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 15px 20px;
  position: relative;
`;
