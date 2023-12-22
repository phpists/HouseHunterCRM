import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import { handleResponse, handleToFormData } from "../../utilits";

export const selections = createApi({
  reducerPath: "selections/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getSelections: build.query({
      query: ({ id_requst_group, filters }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view_notepad",
          mod: "requests",
          id_requst_group,
          filters,
        }),
      }),
      transformResponse: (response) => {
        return handleResponse(
          response,
          () => response,
          () => null,
          false,
          true
        );
      },
    }),
    addObjectToSelections: build.query({
      query: ({ id_request_group, id_object }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_object_to_folder",
          mod: "requests",
          id_request_group,
          id_object,
        }),
      }),
    }),
    hideObjectFromSelections: build.query({
      query: ({ id_request_group, id_object }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "hide_object_to_folder",
          mod: "requests",
          id_request_group,
          id_object,
        }),
      }),
    }),
  }),
});

export const {
  useLazyGetSelectionsQuery,
  useLazyAddObjectToSelectionsQuery,
  useLazyHideObjectFromSelectionsQuery,
} = selections;
