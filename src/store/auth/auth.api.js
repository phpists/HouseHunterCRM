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
        ref_id,
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
          ref_id,
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
          true,
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
          photo ? { photo } : null
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
    getNotifications: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "notification",
          action: "view",
        }),
      }),
    }),
    updateBannerId: build.query({
      query: (id_baner) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            mod: "profile",
            action: "update_banner_id",
          },
          { id_baner }
        ),
      }),
    }),
    getBanners: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "system_info",
          action: "get_all_baners",
        }),
      }),
      transformResponse: (response) => {
        return handleResponse(
          response,
          () => response,
          () => null,
          true,
          true
        );
      },
    }),
    checkUser: build.query({
      query: ({ email, password }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "profile",
          action: "check_user",
          email,
          password,
        }),
      }),
    }),
    showFastFolder: build.query({
      query: (id) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "requests",
          action: "show_fast_folder",
          id,
        }),
      }),
    }),
    connectAccount: build.query({
      query: ({ resource, code, state }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "connetctAccount",
          resource,
          code,
          state,
        }),
      }),
    }),
    connectRealestateAccount: build.query({
      query: ({ email, pass }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "connetctAccount",
          resource: "realestate",
          email,
          pass,
        }),
      }),
    }),
    getRealestateStatus: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "getStatusAccount",
          resource: "realestate",
        }),
      }),
    }),
    publishRealestate: build.query({
      query: ({
        id_obj,
        id_account,
        obl,
        region,
        city,
        letter,
        house,
        street,
        street2,
        home,
        title,
        description,
      }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            mod: "publication",
            action: "publish",
            resource: "realestate",
            id_obj,
            id_account,
            obl,
            region,
            city,
            letter,
            house,
            street,
            street2,
            home,
            title,
            description,
          },
          [],
          true,
          true
        ),
      }),
    }),
    getRegions: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "getRegions",
          resource: "realestate",
        }),
      }),
    }),
    getCities: build.query({
      query: (id_region) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "getCities",
          resource: "realestate",
          id_region,
        }),
      }),
    }),
    getLetterStreet: build.query({
      query: (city_id) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "getLetterStreet",
          resource: "realestate",
          city_id,
        }),
      }),
    }),
    getStreet: build.query({
      query: ({ city_id, letter }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            mod: "publication",
            action: "getStreet",
            resource: "realestate",
            city_id,
            letter,
          },
          [],
          true,
          true
        ),
      }),
    }),
    getHouseNumber: build.query({
      query: (street_id) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "getHouseNumber",
          resource: "realestate",
          street_id,
        }),
      }),
    }),
    removeObjectRealestate: build.query({
      query: ({ id_account, id_obj }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "removeObject",
          resource: "realestate",
          id_account,
          id_obj,
        }),
      }),
    }),
    removeAccountRealestate: build.query({
      query: (id_account) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "removeAccount",
          resource: "realestate",
          id_account,
        }),
      }),
    }),
    deleteAccountOlx: build.query({
      query: (id_user_olx) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "deleteAccount",
          resource: "olx",
          id_user_olx,
        }),
      }),
    }),
    flombuConnectAccount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "connetctAccount",
          mod: "publication",
          resource: "flombu",
        }),
      }),
    }),
    flombuConnectStatus: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "accountAuth",
          mod: "publication",
          resource: "flombu",
        }),
      }),
    }),
    flombuDeleteAccount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete_account",
          mod: "publication",
          resource: "flombu",
        }),
      }),
    }),
    flombuPublish: build.query({
      query: (id_obj) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "publish",
          mod: "publication",
          resource: "flombu",
          id_obj,
        }),
      }),
    }),
    flombuDeleteAdHistory: build.query({
      query: (id_obj) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "remove_adds",
          mod: "publication",
          resource: "flombu",
          id_obj,
        }),
      }),
    }),
    flombuDeleteAd: build.query({
      query: (id_obj) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "close_adds",
          mod: "publication",
          resource: "flombu",
          id_obj,
        }),
      }),
    }),
    getStatusesOlx: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getStatuses",
          mod: "publication",
          resource: "olx",
        }),
      }),
    }),
    getStatusAdd: build.query({
      query: ({ id_ad_in_source, id_user_olx }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getStatusAdd",
          mod: "publication",
          resource: "olx",
          id_ad_in_source,
          id_user_olx,
        }),
      }),
    }),
    refreshOlxAdsAccount: build.query({
      query: (id_user_olx) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "refreshAddsAccount",
          mod: "publication",
          resource: "olx",
          id_user_olx,
        }),
      }),
    }),
    refreshRealestateAdsAccount: build.query({
      query: (id_account) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "syncAdds",
          mod: "publication",
          resource: "realestate",
          id_account,
        }),
      }),
    }),
    updateRealestateStatusAdd: build.query({
      query: ({ id_account, id_add_in_source }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "syncAdds",
          mod: "publication",
          resource: "realestate",
          id_account,
          id_add_in_source,
        }),
      }),
    }),
    removeRealestateAdHistory: build.query({
      query: ({ id_account, id_obj }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "removeObject",
          mod: "publication",
          resource: "realestate",
          id_account,
          id_obj,
        }),
      }),
    }),
    syncOtherDataRealestateAd: build.query({
      query: ({ id_account, id_add_in_source }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "syncOtherData",
          resource: "realestate",
          id_account,
          id_add_in_source,
        }),
      }),
    }),
    removeFlombuAdHistory: build.query({
      query: (id_obj) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "remove_adds",
          resource: "flombu",
          id_obj,
        }),
      }),
    }),
    removeFlombuAd: build.query({
      query: (id_obj) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "close_adds",
          resource: "flombu",
          id_obj,
        }),
      }),
    }),
    getStatusFlombuAd: build.query({
      query: (id_obj) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "getStatusAdd",
          resource: "flombu",
          id_obj,
        }),
      }),
    }),
    refreshFlombuAds: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "syncAdds",
          resource: "flombu",
        }),
      }),
    }),
    connectRieltorAccount: build.query({
      query: ({ login, pass }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "connetctAccount",
          resource: "rieltor",
          login,
          pass,
        }),
      }),
    }),
    getAccountRieltorList: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "getAccountList",
          resource: "rieltor",
        }),
      }),
    }),
    getAccountRieltorStatus: build.query({
      query: (id_account) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "getStatusAccount",
          resource: "rieltor",
          id_account,
        }),
      }),
    }),
    refreshRieltorAds: build.query({
      query: (id_account) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "syncAccount",
          resource: "rieltor",
          id_account,
        }),
      }),
    }),
    removeRieltorAccount: build.query({
      query: (id_account) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "removeAccount",
          resource: "rieltor",
          id_account,
        }),
      }),
    }),
    publishRieltor: build.query({
      query: (data) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: (() => {
          const formData = new FormData();
          const dataToSend = {
            mod: "publication",
            action: "publish",
            resource: "rieltor",
            ...data,
          };

          Object.entries(dataToSend)?.forEach((e) => {
            formData.append(e[0], e[1]);
          });

          return formData;
        })(),
      }),
    }),
    getRielorAdStatus: build.query({
      query: ({ id_account, id_obj_in_source }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "updateStatusAdd",
          resource: "rieltor",
          id_account,
          id_obj_in_source,
        }),
      }),
    }),
    deleteRielorAdHistory: build.query({
      query: ({ id_account, id_obj_in_source }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "removeHistoryObj",
          resource: "rieltor",
          id_account,
          id_obj_in_source,
        }),
      }),
    }),
    publishDomria: build.query({
      query: ({ id_obj, object_type, street_type, wall_type }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "publication",
          action: "publish",
          resource: "domria",
          id_obj,
          object_type,
          street_type,
          wall_type,
        }),
      }),
    }),
    addLocation: build.query({
      query: ({ id_parent, name, search_key_json }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "system_info",
          action: "setLocation",
          id_parent,
          name,
          search_key_json,
        }),
      }),
    }),
    editLocation: build.query({
      query: ({ id, id_parent, name, search_key_json }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          mod: "system_info",
          action: "editLocation",
          id,
          id_parent,
          name,
          search_key_json,
        }),
      }),
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
  useGetNotificationsQuery,
  useLazyUpdateBannerIdQuery,
  useGetBannersQuery,
  useLazyCheckUserQuery,
  useLazyShowFastFolderQuery,
  useLazyConnectAccountQuery,
  useLazyConnectRealestateAccountQuery,
  useGetRealestateStatusQuery,
  useLazyPublishRealestateQuery,
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
  useLazyGetLetterStreetQuery,
  useLazyGetStreetQuery,
  useLazyGetHouseNumberQuery,
  useLazyRemoveObjectRealestateQuery,
  useLazyDeleteAccountOlxQuery,
  useLazyRemoveAccountRealestateQuery,
  useLazyFlombuConnectAccountQuery,
  useFlombuConnectAccountQuery,
  useLazyFlombuDeleteAccountQuery,
  useLazyFlombuPublishQuery,
  useLazyFlombuDeleteAdQuery,
  useFlombuConnectStatusQuery,
  useLazyFlombuDeleteAdHistoryQuery,
  useGetStatusesOlxQuery,
  useLazyGetStatusAddQuery,
  useLazyRefreshOlxAdsAccountQuery,
  useLazyRefreshRealestateAdsAccountQuery,
  useLazyUpdateRealestateStatusAddQuery,
  useLazyRemoveRealestateAdHistoryQuery,
  useLazySyncOtherDataRealestateAdQuery,
  useLazyRemoveFlombuAdHistoryQuery,
  useLazyRemoveFlombuAdQuery,
  useLazyGetStatusFlombuAdQuery,
  useLazyRefreshFlombuAdsQuery,
  useLazyConnectRieltorAccountQuery,
  useGetAccountRieltorListQuery,
  useLazyGetAccountRieltorStatusQuery,
  useLazyRefreshRieltorAdsQuery,
  useLazyRemoveRieltorAccountQuery,
  useLazyPublishRieltorQuery,
  useLazyGetRielorAdStatusQuery,
  useLazyDeleteRielorAdHistoryQuery,
  useLazyPublishDomriaQuery,
  useLazyAddLocationQuery,
  useLazyEditLocationQuery,
} = auth;
