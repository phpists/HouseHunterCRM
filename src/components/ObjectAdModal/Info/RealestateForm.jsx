import styled from "styled-components";
import { Select } from "../../Select/Select";
import { useState } from "react";
import { handleGetRegion } from "../../../api/realeState";
import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
  useLazyGetHouseNumberQuery,
  useLazyGetLetterStreetQuery,
  useLazyGetStreetQuery,
} from "../../../store/auth/auth.api";
import { ProfileField } from "../../ProfileField";

// obl: "",
// region: "",
// city: "",
// letter: "",
// house: "",
// street: "",
// street2: "",
// home: "",

export const RealestateForm = ({ data, onChange }) => {
  const { data: regions } = useGetRegionsQuery();
  const [getCities, { data: cities }] = useLazyGetCitiesQuery();
  const [getLetters, { data: letters }] = useLazyGetLetterStreetQuery();
  const [getStreets, { data: streets }] = useLazyGetStreetQuery();
  const [getHouseNumber, { data: houseNumbers }] = useLazyGetHouseNumberQuery();

  const handleGetValueById = (array, value, fieldName) =>
    Array.isArray(array)
      ? array?.find((v) => v?.[fieldName] === value)
      : undefined;

  const handleChangeRegion = (val) => {
    onChange(
      "region",
      {
        ...data,
        region: handleGetValueById(regions?.data, val, "id_region")?.name,
        obl: val === "1" ? "1" : "2",
        city: "",
        letter: "",
        house: "",
        street: "",
        home: "",
        street2: "",
      },
      true
    );
    getCities(val);
  };

  const handleChangeCity = (val) => {
    onChange(
      "region",
      {
        ...data,
        city: handleGetValueById(cities?.data, val, "id_city")?.name,
        letter: "",
        house: "",
        street: "",
        home: "",
        street2: "",
      },
      true
    );
    getLetters(val);
    getStreets({ city_id: val, letter: "" });
  };

  const handleChangeLetter = (val) => {
    onChange(
      "letter",
      {
        ...data,
        letter: val,
        house: "",
        street: "",
        home: "",
        street2: "",
      },
      true
    );
    getStreets({ city_id: data?.city, letter: val });
  };

  const handleChangeStreet = (val) => {
    onChange(
      "",
      {
        ...data,
        house: "",
        street: handleGetValueById(streets?.data, val, "id_street")?.name,
        home: "",
        street2: "",
      },
      true
    );
    getHouseNumber(val);
  };

  const handleChangeHouse = (val) =>
    onChange(
      "house",
      handleGetValueById(houseNumbers?.data, val, "id_house")?.name
    );

  return (
    <StyledRealestateForm>
      <Select
        label="Адреса"
        options={
          regions?.data?.map(({ id_region, name }) => ({
            title: name,
            value: id_region,
          })) ?? []
        }
        value={
          handleGetValueById(regions?.data, data?.region, "name")?.id_region
        }
        onChange={handleChangeRegion}
      />
      <Select
        label="Місто"
        options={
          cities?.data?.map(({ id_city, name }) => ({
            title: name,
            value: id_city,
          })) ?? []
        }
        value={handleGetValueById(cities?.data, data?.city, "name")?.id_city}
        onChange={handleChangeCity}
      />
      {letters?.data?.length > 0 ? (
        <>
          <div className="fields-group">
            <Select
              label="Буква вулиці"
              options={
                letters?.data?.map(({ id_letter }) => ({
                  title: id_letter,
                  value: id_letter,
                })) ?? []
              }
              value={data?.letter}
              onChange={handleChangeLetter}
            />
            <Select
              label="Вулиця"
              options={
                streets?.data?.map(({ id_street, name }) => ({
                  title: name,
                  value: id_street,
                })) ?? []
              }
              value={
                handleGetValueById(streets?.data, data?.street, "name")
                  ?.id_street
              }
              onChange={handleChangeStreet}
            />
          </div>
          <Select
            label="Номер будинку"
            options={
              houseNumbers?.data?.map(({ id_city, name }) => ({
                title: name,
                value: id_city,
              })) ?? []
            }
            value={
              handleGetValueById(houseNumbers?.data, data?.house, "name")
                ?.id_house
            }
            onChange={handleChangeHouse}
          />
        </>
      ) : (
        <div className="fields-group">
          <ProfileField
            label="Вулиця"
            value={data?.street2}
            onChange={(val) => onChange("street2", val)}
            initOpen
            alwaysOpen
          />
          <ProfileField
            label="Будинок"
            value={data?.home}
            onChange={(val) => onChange("home", val)}
            initOpen
            alwaysOpen
          />
        </div>
      )}
    </StyledRealestateForm>
  );
};

const StyledRealestateForm = styled.div`
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
