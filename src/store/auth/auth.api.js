import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import { handleResponse, handleToFormData } from "../../utilits";

export const auth = createApi({
  reducerPath: "auth/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    register: build.query({
      query: ({
        email,
        password,
        id_phone_code,
        phone,
        name,
        mod,
        action,
      }) => ({
        url: "",
        method: "POST",
        body: handleToFormData({
          email,
          password,
          id_phone_code,
          phone,
          name,
          mod,
          action,
        }),
      }),
    }),
    login: build.query({
      query: ({ email, password, mod, action }) => ({
        url: "",
        method: "POST",
        body: handleToFormData({ email, password, mod, action }),
      }),
    }),
    logout: build.query({
      query: () => ({
        url: "",
        method: "POST",
        body: handleToFormData({ mod: "account", action: "logout" }),
        headers: headers(),
      }),
    }),
    getUser: build.query({
      query: () => ({
        url: "",
        method: "POST",
        body: handleToFormData({
          mod: "profile",
          action: "view",
        }),
        headers: headers(),
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
    forgotPassword: build.query({
      query: ({ email }) => ({
        url: "",
        method: "POST",
        body: handleToFormData({
          email,
          mod: "account",
          action: "reset_password",
        }),
      }),
    }),
    getPhonesCodes: build.query({
      query: () => ({
        url: "",
        method: "POST",
        body: handleToFormData({
          mod: "system_info",
          action: "get_phone_codes",
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
    editProfile: build.query({
      query: ({ photo, ...data }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            mod: "profile",
            action: "edit",
            ...data,
          },
          { photo }
        ),
      }),
    }),
    deleteAvatar: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "profile",
          action: "delete_image",
        }),
      }),
    }),
    getAccess: build.query({
      query: () => ({
        url: "",
        method: "POST",
        body: handleToFormData({
          mod: "system_info",
          action: "get_available_tabs",
        }),
        headers: headers(),
      }),
      transformResponse: (response) => {
        return handleResponse(
          response,
          () => {
            const formatedResponse = response
              ? Object.entries(response?.permision)
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
  }),
});

export const {
  useLazyRegisterQuery,
  useLazyLoginQuery,
  useLazyLogoutQuery,
  useLazyGetUserQuery,
  useLazyForgotPasswordQuery,
  useGetPhonesCodesQuery,
  useLazyEditProfileQuery,
  useLazyDeleteAvatarQuery,
  useGetAccessQuery,
} = auth;
