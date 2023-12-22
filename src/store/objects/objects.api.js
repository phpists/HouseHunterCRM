import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { handleResponse, handleToFormData } from "../../utilits";
import { headers } from "../../api/headers";

export const objects = createApi({
  reducerPath: "objects/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    createObject: build.query({
      query: ({ field, photos }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          { action: "add", mod: "objects", field },
          { photos }
        ),
      }),
    }),
    getRubricFields: build.query({
      query: (id_rubric) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_field_list_rubirc",
          mod: "system_info",
          id_rubric,
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
    getCommentsToFields: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_comment_field_object",
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
    deleteObject: build.query({
      query: (id_objects) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete",
          mod: "objects",
          id_objects,
        }),
      }),
    }),
    addToFavorites: build.query({
      query: (id_object) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_edit_favorit",
          mod: "objects",
          id_object,
        }),
      }),
    }),
    getAllObjects: build.query({
      query: ({ only_favorite, ...filters }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view",
          mod: "objects",
          only_favorite,
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
    getObject: build.query({
      query: (id_object) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view_by_id",
          mod: "objects",
          id_object,
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
    editObject: build.query({
      query: ({ id_object, field, photos }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          { action: "edit", mod: "objects", field, id_object },
          { photos }
        ),
      }),
    }),
    getObjectsCount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_count_my_object",
          mod: "objects",
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
    getActualObjectsCount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_all_my_actual_object",
          mod: "objects",
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
    getOverdueObjectsCount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_all_my_object_overdue",
          mod: "objects",
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
    getStreetBaseObjectsCount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_all_my_obj_street_base",
          mod: "objects",
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
    deleteObjectPhoto: build.query({
      query: ({ id_object, id_img }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete_image_object",
          mod: "objects",
          id_object,
          id_img,
        }),
      }),
    }),
    setCoverPhoto: build.query({
      query: ({ id_object, id_img }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "set_cover_img_obj",
          mod: "objects",
          id_object,
          id_img,
        }),
      }),
    }),
  }),
});

export const {
  useLazyCreateObjectQuery,
  useLazyGetRubricFieldsQuery,
  useGetCommentsToFieldsQuery,
  useLazyDeleteObjectQuery,
  useLazyAddToFavoritesQuery,
  useLazyGetAllObjectsQuery,
  useGetAllObjectsQuery,
  useLazyGetObjectQuery,
  useLazyEditObjectQuery,
  useLazyGetObjectsCountQuery,
  useLazyDeleteObjectPhotoQuery,
  useLazySetCoverPhotoQuery,
  useGetObjectsCountQuery,
  useGetActualObjectsCountQuery,
  useGetOverdueObjectsCountQuery,
  useGetStreetBaseObjectsCountQuery,
} = objects;
