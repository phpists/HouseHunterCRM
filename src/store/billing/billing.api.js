import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import { handleResponse, handleToFormData } from "../../utilits";

export const billing = createApi({
  reducerPath: "billing/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getPackadges: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_billing_packages",
          mod: "system_info",
        }),
      }),
    }),
    payByBank: build.query({
      query: ({ ammount, payment }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            action: "payment_by_bank_detalis",
            mod: "billing",
            ammount,
          },
          { payment }
        ),
      }),
    }),
    payByLiqpay: build.query({
      query: ({ ammount }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "payment_liqpay",
          mod: "billing",
          ammount,
        }),
      }),
    }),
    continueBilling: build.query({
      query: ({ period, workers_json }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "billing_continue_billing",
          mod: "billing",
          period,
          workers_json,
        }),
      }),
    }),
    viewPayWorker: build.query({
      query: (id_worker) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_biling_history_by_id_user",
          mod: "billing",
          id_worker,
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
    viewCompanyBalance: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "balance_company",
          mod: "billing",
        }),
      }),
    }),
    viewCompanyBalanceHistory: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_billing_pay_history",
          mod: "billing",
        }),
      }),
    }),
    getDirectorWorkers: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view_workers_director",
          mod: "billing",
        }),
      }),
    }),
    getCompanyInfo: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_company_info",
          mod: "system_info",
        }),
      }),
    }),
    editCompanyInfo: build.query({
      query: (data) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: data,
      }),
    }),
    toggleActiveWorkerStatus: build.query({
      query: ({ id_worker, status }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "disabled_worker",
          mod: "billing",
          id_worker,
          status,
        }),
      }),
    }),
    deleteCompanyImg: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete_company_img",
          mod: "profile",
        }),
      }),
    }),
  }),
});

export const {
  useGetPackadgesQuery,
  useLazyPayByBankQuery,
  useLazyPayByLiqpayQuery,
  useLazyContinueBillingQuery,
  useLazyViewPayWorkerQuery,
  useViewCompanyBalanceQuery,
  useViewCompanyBalanceHistoryQuery,
  useGetDirectorWorkersQuery,
  useGetCompanyInfoQuery,
  useLazyEditCompanyInfoQuery,
  useLazyToggleActiveWorkerStatusQuery,
  useLazyDeleteCompanyImgQuery,
} = billing;
