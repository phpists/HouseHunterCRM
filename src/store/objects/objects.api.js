import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { handleToFormData } from "../../utilits";
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
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view",
          mod: "objects",
        }),
      }),
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
  useLazyGetObjectQuery,
  useLazyEditObjectQuery,
  useLazyGetObjectsCountQuery,
} = objects;
