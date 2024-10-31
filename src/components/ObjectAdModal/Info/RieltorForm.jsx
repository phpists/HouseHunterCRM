import styled from "styled-components";
import { Select } from "../../Select/Select";
import { useEffect, useState } from "react";
import {
  getCities,
  getDistricts,
  getRegions,
  getStreets,
} from "../../../api/rieltor";
import { ProfileField } from "../../ProfileField";

export const RieltorForm = ({ data, onChange }) => {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [streets, setStreets] = useState([]);

  const handleGetValueById = (array, value, fieldName) =>
    Array.isArray(array)
      ? array?.find((v) => v?.[fieldName] === value)
      : undefined;

  const handleGetCities = (regionId, query = "") =>
    getCities(regionId, query).then((resp) => setCities(resp));

  const handleGetDistricts = (cityId, query = "") =>
    getDistricts(cityId).then((resp) => setDistricts(resp));

  const handleGetStreets = (cityId, districtId = "", query = "") =>
    getStreets(cityId, query, districtId).then((resp) => setStreets(resp));

  const handleChangeRegion = (val) => {
    onChange(
      "region",
      {
        ...data,
        regionId: val,
        cityId: "",
        districtId: "",
        streetId: "",
        houseNameUnfound: "",
      },
      true
    );
    handleGetCities(val);
  };

  const handleChangeCity = (val) => {
    onChange(
      "region",
      {
        ...data,
        cityId: val,
        districtId: null,
        streetId: "",
        houseNameUnfound: "",
      },
      true
    );
    handleGetDistricts(val);
    handleGetStreets(val);
  };

  const handleChangeDistrict = (val) => {
    onChange(
      "letter",
      {
        ...data,
        districtId: val,
        streetId: "",
        houseNameUnfound: "",
      },
      true
    );
    handleGetStreets(data?.cityId, val);
  };

  const handleChangeStreet = (val) => {
    onChange(
      "",
      {
        ...data,
        streetId: val,
        houseNameUnfound: "",
      },
      true
    );
    // getHouseNumber(val);
  };

  const handleChangeHouse = (val) => onChange("house", val);

  useEffect(() => {
    getRegions().then((resp) => setRegions(resp));
  }, []);

  return (
    <StyledRieltorForm>
      <Select
        label="Область"
        options={regions}
        value={data?.regionId}
        onChange={handleChangeRegion}
        isSearch
        required
      />
      {cities?.length > 0 ? (
        <Select
          label="Місто"
          options={cities}
          value={data?.cityId}
          onChange={handleChangeCity}
          isSearch
          required
          onSearch={(val) => handleGetCities(data?.regionId, val)}
        />
      ) : null}
      {districts?.length > 0 ? (
        <Select
          label="Район"
          options={districts}
          value={data?.districtId}
          onChange={handleChangeDistrict}
          isSearch
          required
        />
      ) : null}
      {streets?.length > 0 ? (
        <Select
          label="Вулиця"
          options={streets}
          value={data?.streetId}
          onChange={handleChangeStreet}
          onSearch={(val) =>
            handleGetStreets(data?.cityId, data?.districtId, val)
          }
          isSearch
          required
        />
      ) : data?.cityId?.toString().length > 0 ? (
        <ProfileField
          label="Вулиця"
          value={data?.streetId}
          onChange={(val) => onChange("streetId", val)}
          required
          alwaysOpen
          initOpen
        />
      ) : null}
      {data?.streetId?.toString()?.length > 0 ? (
        <ProfileField
          label="Будинок"
          value={data?.houseNameUnfound}
          onChange={(val) => onChange("houseNameUnfound", val)}
          required
          alwaysOpen
          initOpen
        />
      ) : null}
    </StyledRieltorForm>
  );
};

const StyledRieltorForm = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 10px;
  .fields-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;
