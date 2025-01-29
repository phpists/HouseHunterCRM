import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List";
import {
  useLazyGetSelectionsQuery,
  useLazyHideObjectFromSelectionsQuery,
} from "../../store/selections/selections.api";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLazyGetRubricFieldsQuery } from "../../store/objects/objects.api";
import {
  handleCopy,
  handleGetRange,
  handleResponse,
  showAlert,
} from "../../utilits";
import { useActions } from "../../hooks/actions";
import { useAppSelect } from "../../hooks/redux";

const INIT_FILTERS = {
  id_rubric: "",
  id_location: "",
  price_currency: "1",
  price: "",
  price_max: "",
  price_min: "",
  price_for: "4",
  //   obj_is_actual: "1",
  //   show_only: "only_my",
};

const Selections = () => {
  const { id } = useParams();
  const { user } = useAppSelect((state) => state.auth);
  const [getSelections] = useLazyGetSelectionsQuery();
  const [getRubricField] = useLazyGetRubricFieldsQuery();
  const [hideObject] = useLazyHideObjectFromSelectionsQuery();
  const [objects, setObjects] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState(INIT_FILTERS);
  const [applyedFilters, setApplyedFilters] = useState({});
  const [filtersFields, setFilterFields] = useState([]);
  const filterActive = useRef(false);
  const [allCount, setAllCount] = useState(0);
  const { saveSelectionsCount } = useActions();
  const [showObjectHide, setShowObjectHide] = useState(undefined);
  const currentPage = useRef(0);
  const isLoading = useRef(false);
  const listRef = useRef();
  const isFirstRequest = useRef(true);
  const [isAllPages, setIsAllPages] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const firstThousend = useRef(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [showClient, setShowClient] = useState(true);
  const [hideTitle, setHideTitle] = useState(false);

  const handleChangeFilter = (field, value, isDataUpdate) => {
    if (isDataUpdate) {
      setFilters(value);
    } else {
      setFilters({ ...filters, [field]: value });
      if (field === "id_rubric") {
        // handleGetRubricsFields(value);
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

  const handleGetSelections = (isReset, isUpdateCount) => {
    if ((!isLoading.current && !isAllPages) || isReset) {
      isLoading.current = true;
      let sendData = {
        id_requst_group: id,
        current_page: currentPage.current,
        item_on_page: 50,
      };

      if (isReset) {
        listRef.current.scroll({ top: 0 });
        setObjects([]);
        setSelected([]);
      }

      if (filterActive.current) {
        sendData = { ...sendData, filters };
      }

      if (showObjectHide && filterActive.current) {
        sendData = {
          ...sendData,
          filters: { ...filters, show_object_hide: "1" },
        };
      } else if (showObjectHide) {
        sendData = { ...sendData, filters: { show_object_hide: "1" } };
      }

      setLoading(true);

      if (isFirstRequest.current || isUpdateCount) {
        isFirstRequest.current = false;
        getSelections({
          ...sendData,
          only_count_item: "1",
        }).then((resp) => saveSelectionsCount(resp?.data?.all_item ?? 0));
      }

      getSelections(sendData).then((resp) => {
        isLoading.current = false;
        setLoading(false);
        setClientData({
          client: resp?.data?.client_info ?? null,
          name_group: resp?.data?.name_group,
          comment_group: resp?.data?.comment_group,
          new_messege: resp?.data?.new_messege,
        });
        resp?.data?.hide_title_client &&
          setHideTitle(resp?.data?.hide_title_client === "1");
        handleResponse(
          resp,
          () => {
            isLoading.current = false;
            const objectsResp = resp.data?.data ?? [];
            setObjects(isReset ? objectsResp : [...objects, ...objectsResp]);
            setAllCount(
              isReset
                ? objectsResp?.length
                : Number(allCount) + objectsResp?.length
            );
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
        );
      });
    }
  };

  useEffect(() => {
    if (id) {
      handleGetSelections(true);
    }
    // eslint-disable-next-line
  }, [id]);

  const handleFindSimilarTo = (obj) => {
    const { id_location, id_rubric, price_uah, id_brand, id_model } = obj;

    console.log(obj);
    const objData = {
      id_rubric,
      id_location,
      price_min: handleGetRange(Number(price_uah), true)?.start.toFixed(0),
      price_max: handleGetRange(Number(price_uah), true)?.end.toFixed(0),
      id_brand,
      id_model,
      //   area_total_min: handleGetRange(Number(area_total), true)?.start.toFixed(
      //     0
      //   ),
      //   area_total_max: handleGetRange(Number(area_total), true)?.end.toFixed(0),
      //   area_plot_sotka_min: handleGetRange(
      //     Number(area_plot_sotka),
      //     true
      //   )?.start.toFixed(0),
      //   area_plot_sotka_max: handleGetRange(
      //     Number(area_plot_sotka),
      //     true
      //   )?.end.toFixed(0),
      //   room_min: handleGetRange(Number(rooms))?.start.toFixed(0),
      //   room_max: handleGetRange(Number(rooms))?.end.toFixed(0),
      //   storey_count_min: handleGetRange(Number(storey_count))?.start.toFixed(0),
      //   storey_count_max: handleGetRange(Number(storey_count))?.end.toFixed(0),
      //   address_storey_min: handleGetRange(Number(address_storey))?.start.toFixed(
      //     0
      //   ),
      //   address_storey_max: handleGetRange(Number(address_storey))?.end.toFixed(
      //     0
      //   ),
      price_currency: "2",
    };

    const objUrl = `/objects?findSelectionSimilar=true${Object.entries(objData)
      ?.map((d) => `&${d[0]}=${d[1]}`)
      ?.join("")}`;

    window.open(objUrl, "_blank");
  };

  const handleApplyFilter = (isApply) => {
    filterActive.current = isApply;
    currentPage.current = 0;
    setIsAllPages(false);
    setApplyedFilters(isApply ? filters : {});
    if (!isApply) {
      setFilters(INIT_FILTERS);
      setFilterFields([]);
    }
    handleGetSelections(true, true);
  };

  const handleSelectAll = (isReset, count) => {
    const objIds = objects
      ?.map((obj) => obj.id)
      ?.slice(0, count ? count : undefined);

    setSelected(isReset ? [] : objIds);
  };

  const handleHideObject = (id_object) => {
    hideObject({ id_request_group: id, id_objects: [id_object] }).then((resp) =>
      handleResponse(resp, () => {
        showAlert("success", "Статус автомобіля успішно обновлено");
        const updatedObjects = objects?.filter((o) => o?.id !== id_object);
        setObjects(updatedObjects);
        setAllCount(allCount - 1);
        saveSelectionsCount(allCount - 1);
        updatedObjects?.length === 0 && handleGetSelections(true);
      })
    );
  };

  const handleHideObjects = () => {
    const updatedObjects = objects?.filter(
      (o) => !selected?.find((s) => s === o?.id)
    );
    setObjects(updatedObjects);
    setSelected([]);
    updatedObjects?.length === 0 && handleGetSelections(true);
  };

  const handleToggleHidden = () => {
    setShowObjectHide(showObjectHide === "1" ? undefined : "1");
    setFilters(INIT_FILTERS);
    filterActive.current = false;
  };

  useEffect(() => {
    currentPage.current = 0;
    setIsAllPages(false);
    setFilters(INIT_FILTERS);
    filterActive.current = false;
    handleGetSelections(true);
    // eslint-disable-next-line
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

  const handleChangeComment = (id, comment) => {
    const updatedData = objects?.map((obj) =>
      obj?.id === id ? { ...obj, comment } : obj
    );
    setObjects(updatedData);
  };

  const handleChangeContacts = (id, clients_inf) => {
    const updatedData = objects?.map((obj) =>
      obj?.id === id ? { ...obj, clients_inf } : obj
    );
    setObjects(updatedData);
  };

  const handleChangeTags = (id, fieldName, value) => {
    const updatedData = objects?.map((obj) =>
      obj?.id === id ? { ...obj, [fieldName]: value } : obj
    );
    setObjects(updatedData);
  };

  const handleChangeObject = (id, newData) => {
    const updatedData = objects?.map((obj) =>
      obj?.id === id ? { ...obj, ...newData } : obj
    );
    setObjects(updatedData);
  };

  const handleCopyFastFolderLink = () => {
    const LINK = `https://fast-selection.house-hunter.info/?us=${
      user?.id
    }&id=${btoa(JSON.stringify(selected))}`;

    handleCopy(LINK);
    setSelected([]);
  };

  const handleToggleHideTitle = (val) => setHideTitle(val);

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
        onChangeActionLoading={(val) => setActionLoading(val)}
        showClient={showClient}
        onToggleShowClient={(val) => setShowClient(val)}
        newMessege={clientData?.new_messege}
        onFastCopy={user?.show_fast_folder ? handleCopyFastFolderLink : null}
        hideTitle={hideTitle}
        onToggleHideTitle={handleToggleHideTitle}
      />
      <List
        data={objects}
        selected={selected}
        onSelect={handleSelect}
        onFindSimilar={handleFindSimilarTo}
        onHide={handleHideObject}
        innerRef={listRef}
        loading={loading}
        isHideObjects={showObjectHide}
        actionLoading={actionLoading}
        clientData={clientData}
        showClient={showClient}
        // onFavorite={handleToggleFavoriteStatus}
        filters={applyedFilters}
        onChangeComment={handleChangeComment}
        currency={Number(filters?.price_currency - 1)}
        onChangeCurrency={(val) =>
          handleChangeFilter("price_currency", val + 1)
        }
        onChangeContacts={handleChangeContacts}
        onChangeTags={handleChangeTags}
        onChangeObject={handleChangeObject}
      />
    </StyledSelections>
  );
};

const StyledSelections = styled.div`
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 15px 20px;
  position: relative;
  @media (max-width: 500px) {
    padding: 10px;
  }
`;

export default Selections;
