import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List/List";
import { useEffect, useState } from "react";

import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useLazyGetLocationsQuery } from "../../store/requests/requests.api";
import { LocationModal } from "./LocationModal";

const Settings = () => {
  const location = useLocation();
  const currentPage = useRef(0);
  const listRef = useRef();
  const prevClientsFilters = localStorage.getItem("settingsFilters");
  const [draftFilter, setDraftFilter] = useState();
  const [filter, setFilter] = useState(
    !!prevClientsFilters && !!JSON.parse(prevClientsFilters)
      ? JSON.parse(prevClientsFilters)
      : {
          search_key: undefined,
          search_phone: undefined,
        }
  );
  const isFilters = useRef(
    !!prevClientsFilters && !!JSON.parse(prevClientsFilters)
  );
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [defaultFilter, setDefaultFilter] = useState(false);
  const defaultFilterLoaded = useRef(false);
  const [getLocations, { data }] = useLazyGetLocationsQuery();
  const [selectedParent, setSelectedParent] = useState("0");
  const [locationModal, setLocationModal] = useState();
  const [editLocation, setEditLocation] = useState(undefined);

  const handleChangeFilter = (field, value) =>
    setDraftFilter({ ...filter, [field]: value });

  const handleChangeSelectedParent = (id) => setSelectedParent(id);

  const handleGetLocations = (isReset, isFilter) => {
    getLocations();
  };

  const handleOpenLocationModal = (id) => {
    setLocationModal(true);
    setEditLocation(id);
  };

  const handleCloseLocationModal = () => {
    setLocationModal(false);
    setEditLocation(undefined);
  };

  useEffect(() => {
    !location?.search?.split("=")[0] && handleGetLocations();
    // eslint-disable-next-line
  }, []);

  const handleApplyFilters = (isApply) => {
    isFilters.current = isApply;
    isApply && localStorage.setItem("settingsFilters", JSON.stringify(filter));
    if (!isApply) {
      currentPage.current = 0;
      setFilter({ search_key: "" });
      setDraftFilter({ search_key: "" });
      localStorage.removeItem("settingsFilters");
    }
    setFilter(draftFilter);
    handleGetLocations(true, isApply);
  };

  useEffect(() => {
    const filterApply = location?.search?.split("=")[0];
    if (filterApply === "?findWorker") {
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
      isFilters.current = true;

      setFilter({ filters: initFiltersObject, my_struct: "1" });
      setDefaultFilter(true);
    }
  }, []);

  useEffect(() => {
    if (defaultFilter && !defaultFilterLoaded.current) {
      handleGetLocations(true, true);
      defaultFilterLoaded.current = true;
    }
  }, [defaultFilter]);

  const handleLocationModalSuccess = (data, id) => {
    getLocations();
    handleCloseLocationModal();
  };

  useEffect(() => {
    setDraftFilter(filter);
  }, [filter]);

  console.log(filter);

  return (
    <StyledClients>
      {locationModal ? (
        <LocationModal
          locations={data}
          editData={editLocation}
          onClose={handleCloseLocationModal}
          onSuccess={handleLocationModalSuccess}
        />
      ) : null}
      <Header
        onRefreshData={() => handleGetLocations(true)}
        filter={draftFilter}
        onChangeFilter={handleChangeFilter}
        onApplyFilters={handleApplyFilters}
        onCreate={() => handleOpenLocationModal()}
        onBack={selectedParent !== "0" ? () => setSelectedParent("0") : null}
      />
      <List
        innerRef={listRef}
        loading={loading}
        actionLoading={actionLoading}
        data={data ? Object.entries(data)?.map((l) => l?.[1]) : []}
        onSelectParent={handleChangeSelectedParent}
        selectedParent={selectedParent}
        onEdit={handleOpenLocationModal}
        search={filter?.search_key}
      />
    </StyledClients>
  );
};

const StyledClients = styled.div`
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  width: 100%;
  padding: 15px 20px;
  @media (max-width: 850px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
  }
  @media (max-width: 500px) {
    width: 100svw;
    margin-left: -10px;
    padding: 10px 10px;
  }
`;

export default Settings;
