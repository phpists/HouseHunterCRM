import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import {
  checkIsArray,
  checkIsJSON,
  handleResponse,
  handleToFormData,
} from "../../utilits";

export const requests = createApi({
  reducerPath: "requests/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    createRequest: build.query({
      query: ({ general_group, fields }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            action: "add",
            mod: "requests",
            fields,
            general_group,
          },
          null,
          [],
          true,
          true
        ),
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
      transformResponse: (response) => {
        return handleResponse(
          response,
          () => {
            const formatedResponse = response
              ? Object.entries(response)
                  .filter((f) => f[0] !== "error")
                  ?.map((f) => f[1])
              : [];
            return formatedResponse;
          },
          () => null,
          false,
          true
        );
      },
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
      transformResponse: (response) => {
        return handleResponse(
          response,
          () => {
            const formatedResponse = response
              ? Object.entries(response)
                  .filter((f) => f[0] !== "error")
                  ?.map((f) => f[1])
              : [];
            return formatedResponse;
          },
          () => null,
          false,
          true
        );
      },
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
    deleteRequest: build.query({
      query: ({ id_groups, final_remove, reasone_remove }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete",
          mod: "requests",
          id_groups,
          final_remove,
          reasone_remove,
        }),
      }),
    }),
    getRequests: build.query({
      query: ({
        current_page,
        item_on_page,
        only_favorite,
        only_count_item,
        ...filters
      }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view",
          mod: "requests",
          current_page,
          item_on_page,
          only_favorite,
          only_count_item,
          ...filters,
        }),
      }),
      transformResponse: (response) => {
        return handleResponse(
          response,
          () => {
            return {
              ...response,
              requests: response?.requests
                ? Object.fromEntries(
                    Object.entries(response?.requests)?.map((r) => [
                      r[0],
                      Object.fromEntries(
                        Object.entries(r[1])?.map((req) => [
                          req[0],
                          {
                            ...req[1],
                            id_location: checkIsArray(
                              checkIsJSON(req[1]?.id_location)
                            ),
                          },
                        ])
                      ),
                    ])
                  )
                : undefined,
            };
          },
          () => null,
          false,
          true
        );
      },
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
    editRequest: build.query({
      query: ({ general_group, fields }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            action: "edit",
            mod: "requests",
            fields,
            general_group,
          },
          null,
          [],
          true,
          true
        ),
      }),
    }),
    addToFavorite: build.query({
      query: (id_group) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_edit_favorit",
          mod: "requests",
          id_group,
        }),
      }),
    }),
    getActualRequestCount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_my_actual_request",
          mod: "requests",
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
    getOverdueRequestCount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_my_overdue_request",
          mod: "requests",
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
    getLastRequests: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_last_request",
          mod: "requests",
          item_on_page: 3,
          current_page: 0,
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
    deleteRequestInGroup: build.query({
      query: (id_request) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete_request_in_group",
          mod: "requests",
          id_request,
        }),
      }),
    }),
    addEmptyRequestInGroup: build.query({
      query: ({ id_group, id_rubric }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_empty_request_in_group",
          mod: "requests",
          id_group,
          id_rubric,
        }),
      }),
    }),
    getCompanies: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_other_company",
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
    getSortingObject: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_sorting_object",
          mod: "system_info",
        }),
      }),
    }),
    editRequestComment: build.query({
      query: ({ request_group, comment }) => {
        const data = new FormData();

        data.append("action", "edit_comment");
        data.append("mod", "requests");
        data.append("request_group", request_group);
        data.append("comment", comment);

        return {
          url: "",
          method: "POST",
          headers: headers(),
          body: data,
        };
      },
    }),
    restoreRequests: build.query({
      query: (id_groups) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "restore_request",
          mod: "requests",
          id_groups,
        }),
      }),
    }),
    recountNewobjectRequest: build.query({
      query: (id_hash) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "recountNewobjectRequest",
          mod: "requests",
          id_hash,
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
  useLazyGetLocationsQuery,
  useLazyGetRequestsCountQuery,
  useLazyDeleteRequestQuery,
  useLazyGetRequestsQuery,
  useLazyGetRequestQuery,
  useLazyEditRequestQuery,
  useLazyAddToFavoriteQuery,
  useGetRequestsCountQuery,
  useGetActualRequestCountQuery,
  useGetOverdueRequestCountQuery,
  useLazyGetLastRequestsQuery,
  useLazyDeleteRequestInGroupQuery,
  useLazyAddEmptyRequestInGroupQuery,
  useGetCompaniesQuery,
  useGetSortingObjectQuery,
  useLazyEditRequestCommentQuery,
  useLazyRestoreRequestsQuery,
  useLazyRecountNewobjectRequestQuery,
} = requests;
