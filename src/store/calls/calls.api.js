import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import { handleResponse, handleToFormData } from "../../utilits";

export const calls = createApi({
  reducerPath: "calls/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getCalls: build.query({
      query: ({ filters, current_page, only_count_item }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            action: "get_all_calls",
            mod: "calls",
            filters,
            current_page,
            item_on_page: 50,
            only_count_item,
          },
          undefined
        ),
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
    moveCall: build.query({
      query: ({ id_call, id_user_to }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "move_call_to_user",
          mod: "calls",
          id_call,
          id_user_to,
        }),
      }),
    }),
    getWorkerMyStructure: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getWorkerMystrcutrue",
          mod: "system_info",
        }),
      }),
    }),
    getOrdersTelegrambot: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getOrders",
          mod: "telegrambot",
        }),
      }),
    }),
    sendOrderTelegrambot: build.query({
      query: ({ id_order, id_user_hash }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "sendOrder",
          mod: "telegrambot",
          id_order,
          id_user_hash,
        }),
      }),
    }),
    setStatusOrderTelegrambot: build.query({
      query: (id_order) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "setStatusOrder",
          mod: "telegrambot",
          id_order,
        }),
      }),
    }),
    getHistoryOrder: build.query({
      query: (chat_id) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getHistoryOrder",
          mod: "telegrambot",
          chat_id,
        }),
      }),
    }),
    setStatusTelegramOrder: build.query({
      query: (id_order) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "setStatusOrder",
          mod: "telegrambot",
          id_order,
        }),
      }),
    }),
    setTelegramCommentOrder: build.query({
      query: ({ id_order, comment }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "setCommnet",
          mod: "telegrambot",
          id_order,
          comment,
        }),
      }),
    }),
    getOrders: build.query({
      query: (filters) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getOrders",
          mod: "xcorp",
          ...filters,
        }),
      }),
    }),
    sendOrder: build.query({
      query: ({ id_order, id_user_hash }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "sendOrder",
          mod: "xcorp",
          id_order,
          id_user_hash,
        }),
      }),
    }),
    setOrderComment: build.query({
      query: ({ id_order, comment }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "changeComment",
          mod: "xcorp",
          id_order,
          comment,
        }),
      }),
    }),
    getOrderHistory: build.query({
      query: (id_order) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getHistory",
          mod: "xcorp",
          id_order,
        }),
      }),
    }),
    setOrderStatus: build.query({
      query: ({ id_order, status }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "setStatus",
          mod: "xcorp",
          id_order,
          status,
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
  useLazyMoveCallQuery,
  useGetWorkerMyStructureQuery,
  useLazyGetCallsTypeQuery,
  useLazyGetOrdersTelegrambotQuery,
  useLazySendOrderTelegrambotQuery,
  useLazySetStatusOrderTelegrambotQuery,
  useLazyGetHistoryOrderQuery,
  useLazySetStatusTelegramOrderQuery,
  useLazyGetOrdersQuery,
  useLazySendOrderQuery,
  useLazySetTelegramCommentOrderQuery,
  useLazySetOrderCommentQuery,
  useLazyGetOrderHistoryQuery,
  useLazySetOrderStatusQuery,
} = calls;

// useLazySetTelegramCommentOrderQuery,
// useLazySetOrderCommentQuery,
// useLazyGetOrderHistoryQuery,
// useLazySetOrderStatusQuery,
