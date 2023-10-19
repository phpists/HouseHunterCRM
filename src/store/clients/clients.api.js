import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import { handleToFormData } from "../../utilits";

export const clients = createApi({
  reducerPath: "clients/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    createClient: build.query({
      query: ({ email, phones_json, first_name, last_name }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add",
          mod: "clients",
          email,
          first_name,
          last_name,
          phones_json,
        }),
      }),
    }),
    getClientsCount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_my_clients",
          mod: "clients",
        }),
      }),
    }),
    getNewClientsCount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_count_new_client_today",
          mod: "clients",
        }),
      }),
    }),
    getClients: build.query({
      query: ({ current_page, item_on_page }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_all_my_clients_info",
          mod: "clients",
          current_page,
          item_on_page,
        }),
      }),
    }),
    getClient: build.query({
      query: (id_client) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view",
          mod: "clients",
          id_client,
        }),
      }),
    }),
    editClient: build.query({
      query: ({
        id_client,
        email,
        first_name,
        last_name,
        phones_json,
        comment,
        photo,
      }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            action: "edit",
            mod: "clients",
            id_client,
            email,
            first_name,
            last_name,
            phones_json,
            comment,
          },
          { photo }
        ),
      }),
    }),
    deleteCient: build.query({
      query: ({ id_client }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete",
          mod: "clients",
          id_client,
        }),
      }),
    }),
    deleteClientPhoto: build.query({
      query: (id_client) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete_img",
          mod: "clients",
          id_client,
        }),
      }),
    }),
  }),
});

export const {
  useLazyCreateClientQuery,
  useLazyGetClientsCountQuery,
  useLazyGetClientsQuery,
  useLazyGetClientQuery,
  useLazyEditClientQuery,
  useLazyGetNewClientsCountQuery,
  useLazyDeleteCientQuery,
  useLazyDeleteClientPhotoQuery,
} = clients;
