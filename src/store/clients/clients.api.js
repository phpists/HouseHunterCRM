import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import { handleResponse, handleToFormData } from "../../utilits";

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
    getClients: build.query({
      query: ({
        current_page,
        item_on_page,
        search_key,
        search_phone,
        search_phone_code,
        my_struct,
        show_favorite,
        ...filters
      }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_all_my_clients_info",
          mod: "clients",
          current_page,
          item_on_page,
          search_key,
          search_phone,
          search_phone_code,
          my_struct,
          show_favorite,
          ...filters,
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
    editClient: build.query({
      query: ({
        id_client,
        email,
        first_name,
        last_name,
        phones_json,
        comment,
        photos,
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
          { photos }
        ),
      }),
    }),
    addClientToFavorite: build.query({
      query: (id_client) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_client_to_favorite",
          mod: "clients",
          id_client,
        }),
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
      query: ({ id_client, id_img }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete_img",
          mod: "clients",
          id_client,
          id_img,
        }),
      }),
    }),
    getClientsRequest: build.query({
      query: ({ current_page, item_on_page, id_client }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_request_my_client",
          mod: "requests",
          current_page,
          item_on_page,
          id_client,
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
    getClientsObjects: build.query({
      query: ({ current_page, item_on_page, id_client }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_object_my_client",
          mod: "clients",
          current_page,
          item_on_page,
          id_client,
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
    getClientPhotos: build.query({
      query: (id_client) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_client_documents",
          mod: "clients",
          id_client,
        }),
      }),
      transformResponse: (response) => {
        return handleResponse(
          response,
          () => {
            const formatedResponse = response
              ? Object.entries(response)?.map((f) => f[1])
              : [];
            return formatedResponse;
          },
          () => null,
          false,
          true
        );
      },
    }),
    getWorkerToMoveClients: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getWorkerToMoveClients",
          mod: "system_info",
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
    moveClients: build.query({
      query: ({ id_clients, id_user_to }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "move_clients",
          mod: "clients",
          id_clients,
          id_user_to,
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
  useLazyGetClientsRequestQuery,
  useLazyGetClientsObjectsQuery,
  useLazyGetClientPhotosQuery,
  useGetClientsCountQuery,
  useLazyAddClientToFavoriteQuery,
  useGetWorkerToMoveClientsQuery,
  useLazyMoveClientsQuery,
} = clients;
