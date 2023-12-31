import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import { handleResponse, handleToFormData } from "../../utilits";

export const calls = createApi({
  reducerPath: "calls/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getCalls: build.query({
      query: ({ filters }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_all_calls",
          mod: "calls",
          filters,
        }),
      }),
    }),
    setStatusCall: build.query({
      query: ({ id_call, status }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "set_status_call",
          mod: "calls",
          id_call,
          status,
        }),
      }),
    }),
    addCommentToCall: build.query({
      query: ({ id_call, comment }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_comment_to_call",
          mod: "calls",
          id_call,
          comment,
        }),
      }),
    }),
    getCallsType: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_calls_type",
          mod: "system_info",
        }),
      }),
    }),
    getAllCallsPhones: build.query({
      query: (call_number) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_all_calls_about_phone",
          mod: "calls",
          call_number,
        }),
      }),
    }),
  }),
});

export const {
  useLazyGetCallsQuery,
  useLazySetStatusCallQuery,
  useLazyAddCommentToCallQuery,
  useGetCallsTypeQuery,
  useLazyGetAllCallsPhonesQuery,
} = calls;
