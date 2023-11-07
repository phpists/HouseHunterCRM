import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import { handleToFormData } from "../../utilits";

export const requests = createApi({
  reducerPath: "requests/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    createRequest: build.query({
      query: ({ general_group, fields }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add",
          mod: "requests",
          fields,
          general_group,
        }),
      }),
    }),
    getRubrics: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_list_rubric",
          mod: "system_info",
        }),
      }),
    }),
    getRubricsFields: build.query({
      query: (id_rubric) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_request_filed_rubric",
          mod: "system_info",
          id_rubric,
        }),
      }),
    }),
    getLocations: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_location",
          mod: "system_info",
        }),
      }),
    }),
    getRequestsCount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_all_my_request",
          mod: "requests",
          not_actual: "1",
        }),
      }),
    }),
    deleteRequest: build.query({
      query: (id_groups) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete",
          mod: "requests",
          id_groups,
        }),
      }),
    }),
    getRequests: build.query({
      query: ({ current_page, item_on_page, only_favorite }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view",
          mod: "requests",
          current_page,
          item_on_page,
          only_favorite,
        }),
      }),
    }),
    getRequest: build.query({
      query: (id_group) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view_by_id",
          mod: "requests",
          id_group,
        }),
      }),
    }),
    editRequest: build.query({
      query: ({ general_group, fields }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "edit",
          mod: "requests",
          fields,
          general_group,
        }),
      }),
    }),
    addToFavorite: build.query({
      query: (id_request) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_edit_favorit",
          mod: "requests",
          id_request,
        }),
      }),
    }),
  }),
});

export const {
  useLazyCreateRequestQuery,
  useGetRubricsQuery,
  useLazyGetRubricsFieldsQuery,
  useGetLocationsQuery,
  useLazyGetRequestsCountQuery,
  useLazyDeleteRequestQuery,
  useLazyGetRequestsQuery,
  useLazyGetRequestQuery,
  useLazyEditRequestQuery,
  useLazyAddToFavoriteQuery,
} = requests;
