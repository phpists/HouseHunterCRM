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
import { handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";

const INIT_FILTERS = {
  id_rubric: "",
  id_location: "",
  price_currency: "1",
  price: "",
  price_max: "",
  price_min: "",
  obj_is_actual: "1",
};

export const Objects = () => {
  const [getAllObjects] = useLazyGetAllObjectsQuery();
  const [getObjectsCount] = useLazyGetObjectsCountQuery();
  const [getRubricField] = useLazyGetRubricFieldsQuery();
  const [addObjectToFavorites] = useLazyAddToFavoritesQuery();
  const { saveObjectsCount } = useActions();
  const [selected, setSelected] = useState([]);
  const [objects, setObjects] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [filtersFields, setFilterFields] = useState([]);
  const filterActive = useRef(false);
  const [allCount, setAllCount] = useState(0);

  const handleGetRubricsFields = (id) => {
    getRubricField(id).then((resp) => {
      setFilterFields(resp?.data);
    });
  };

  const handleChangeFilter = (field, value) => {
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
  };

  const handleSelect = (index) =>
    setSelected(
      !!selected.find((i) => i === index)
        ? selected.filter((i) => i !== index)
        : [...selected, index]
    );

  const handleGetObjectsCount = () => {
    getObjectsCount().then((resp) => saveObjectsCount(resp?.data?.count ?? 0));
  };

  const handleGetObjects = () => {
    let data = { only_favorite: isFavorite ?? undefined };

    if (filterActive.current) {
      data = {
        ...data,
        filters,
      };
    }

    getAllObjects(data).then((resp) => {
      handleResponse(
        resp,
        () => {
          setAllCount(resp?.data?.all_item ?? 0);
          setObjects(
            resp?.data?.objects
              ? Object.entries(resp?.data?.objects)?.map((obj) => obj[1])
              : []
          );
        },
        () => setObjects([]),
        true
      );
    });
  };

  useEffect(() => {
    handleGetObjects();
    handleGetObjectsCount();
    // eslint-disable-next-line
  }, []);

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
    handleGetObjectsCount();
  };

  useEffect(() => {
    handleGetObjects();
    // eslint-disable-next-line
  }, [isFavorite]);

  const handleApplyFilter = (isApply) => {
    filterActive.current = isApply;
    handleGetObjects();
    if (!isApply) {
      setFilters(INIT_FILTERS);
      setFilterFields([]);
    }
  };

  const handleSelectAll = (isReset) => {
    const objIds = objects?.map((obj) => obj.id);

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

  const handleGetRange = (num, isProcent) => {
    let start = 0;
    let end = isNaN(num) ? 0 : isProcent ? num + (num / 100) * 10 : num + 1;
    const startCalc = isProcent ? num - (num / 100) * 10 : num - 1;

    if (startCalc >= 0) {
      start = startCalc;
    }

    return { start, end };
  };

  const handleFindSimilarTo = (obj) => {
    const {
      id_location,
      id_rubric,
      price_USD,
      price_UAH,
      rooms,
      address_storey,
      area_plot_sotka,
      area_total,
      storey_count,
      price_for,
    } = obj;

    console.log(obj);
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

  useEffect(() => {
    filterActive.current && handleGetObjects();
  }, [filterActive.current]);

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
