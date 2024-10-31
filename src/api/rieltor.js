import axios from "axios";
import { handleToFormData } from "../utilits";

const baseUrl = "https://rieltor.ua/api/geo";

export const getRegions = async () => {
  try {
    const response = await fetch(`${baseUrl}/regions/`);

    if (!response.ok) {
      return [];
    }
    const resp = await response.json();
    const data = resp?.data?.map(({ regionId, name }) => ({
      title: name,
      value: regionId,
    }));

    return data ?? [];
  } catch (error) {
    return [];
  }
};

export const getCities = async (regionId, query) => {
  try {
    const response = await fetch(
      `${baseUrl}/cities/?query=${query}&regionId=${regionId}`
    );

    if (!response.ok) {
      return [];
    }
    const resp = await response.json();
    const data = resp?.data?.map(({ cityId, name }) => ({
      title: name,
      value: cityId,
    }));

    return data ?? [];
  } catch (error) {
    return [];
  }
};

export const getDistricts = async (cityId, query = "") => {
  try {
    const response = await fetch(
      `${baseUrl}/districts/?query=${query}&cityId=${cityId}`
    );

    if (!response.ok) {
      return [];
    }
    const resp = await response.json();
    const data = resp?.data?.map(({ districtId, name }) => ({
      title: name,
      value: districtId,
    }));

    return data ?? [];
  } catch (error) {
    return [];
  }
};

export const getStreets = async (cityId, query = "", districtId = "") => {
  try {
    const response = await fetch(
      `${baseUrl}/streets/?query=${query}&cityId=${cityId}&districtId=${districtId}`
    );

    if (!response.ok) {
      return [];
    }
    const resp = await response.json();
    const data = resp?.data?.map(({ streetId, name }) => ({
      title: name,
      value: streetId,
    }));

    return data ?? [];
  } catch (error) {
    return [];
  }
};
