import axios from "axios";
import { handleFormatDate, handleToFormData } from "../utilits";

const baseUrl = "https://www.real-estate.lviv.ua/ajax";

export const handleGetRegion = async (parent) =>
  axios.post(`${baseUrl}/region_ajax_call`, handleToFormData({ parent }), {
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  });

export const handleGetCity = async (region) =>
  axios.post(`${baseUrl}/city_ajax_call`, handleToFormData({ region }));

export const handleGetCityLetter = async (city_id) =>
  axios.post(
    `${baseUrl}/letters_street_city_ajax_call`,
    handleToFormData({ city_id })
  );

export const handleGetTopCity = async (city) =>
  axios.post(`${baseUrl}/_topcity_ajax_call`, handleToFormData({ city }));

export const handleGetStreets = async (city_id) =>
  axios.post(
    `${baseUrl}/streets_by_letter_ajax_call`,
    handleToFormData({ city_id })
  );

export const handleGetHomes = async (street_id) =>
  axios.post(
    `${baseUrl}/homes_by_street_ajax_call`,
    handleToFormData({ street_id })
  );
