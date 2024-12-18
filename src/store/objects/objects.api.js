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
      query: ({ id_objects, final_remove, reasone_remove }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete",
          mod: "objects",
          id_objects,
          final_remove,
          reasone_remove,
        }),
      }),
    }),
    addToFavorites: build.query({
      query: (id_objects) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_edit_favorit",
          mod: "objects",
          id_objects,
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
          { photos },
          ["household_appliances_json"],
          true
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
    getTagsList: build.query({
      query: ({ only_notepad }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_tags_label",
          mod: "system_info",
          only_notepad,
        }),
      }),
    }),
    addTagsToObjects: build.query({
      query: ({ actions, tags, id_object }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_tags_to_object",
          mod: "objects",
          actions,
          tags,
          id_object,
        }),
      }),
    }),
    addNotepadTag: build.query({
      query: ({ label_name, id_request_group, id_object }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "addNotepadtags",
          mod: "requests",
          label_name,
          id_request_group,
          id_object,
        }),
      }),
    }),
    showHistoryTags: build.query({
      query: (id_object) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "show_history_tags",
          mod: "objects",
          id_object,
        }),
      }),
    }),
    showStreetBaseHistoryTags: build.query({
      query: (id_object) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view_tag_street_base",
          mod: "objects",
          id_object,
        }),
      }),
    }),
    getPhoneObject: build.query({
      query: (id_obj) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_phone_object",
          mod: "objects",
          id_obj,
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
    addTagsToStreetBaseObjects: build.query({
      query: ({ actions, tags, id_object }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_tags_street_base",
          mod: "objects",
          actions,
          tags,
          id_object,
        }),
      }),
    }),
    editObjectComment: build.query({
      query: (data) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: data,
      }),
    }),
    getObjectCommentHistory: build.query({
      query: ({ id_object, comment }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "show_comment_object",
          mod: "objects",
          id_object,
        }),
      }),
    }),
    addStreetBaseObject: build.query({
      query: (id_object) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_street_base_object",
          mod: "objects",
          id_object,
        }),
      }),
    }),
    getSources: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getSource",
          mod: "system_info",
        }),
      }),
    }),
    downloadObject: build.query({
      query: (id_object) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "donwloadInfo",
          mod: "objects",
          id_object,
        }),
      }),
    }),
    getAgencies: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_party_agency",
          mod: "objects",
        }),
      }),
    }),
    addPicaroon: build.query({
      query: (id_object) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_picaroon",
          mod: "objects",
          id_object,
        }),
      }),
    }),
    addOherAgency: build.query({
      query: ({ id_object, agency_name, rieltor_name }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_other_agency",
          mod: "objects",
          id_object,
          agency_name,
          rieltor_name,
        }),
      }),
    }),
    cleanObjectMarks: build.query({
      query: (id_object) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "cleaning_object",
          mod: "objects",
          id_object,
        }),
      }),
    }),
    restoreObjects: build.query({
      query: (id_objects) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "restore_objects",
          mod: "objects",
          id_objects,
        }),
      }),
    }),
    getSortObjectView: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_sort_object_view",
          mod: "system_info",
        }),
      }),
    }),
    getObjectsStatustic: build.query({
      query: ({ ...filters }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view",
          mod: "objects",
          show_statistic: "true",
          ...filters,
        }),
      }),
    }),
    getStreetsList: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getListStreet",
          mod: "system_info",
        }),
      }),
    }),
    getAdverstionResource: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getAdverstionResource",
          mod: "system_info",
        }),
      }),
    }),
    getListAddsPublich: build.query({
      query: ({
        resource = "1",
        status,
        id_user_olx,
        id_realestate_account,
        ...filters
      }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getListAddsPublich",
          mod: "publication",
          resource,
          status,
          id_user_olx,
          id_realestate_account,
          ...filters,
        }),
      }),
    }),
    getStatusAccount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "getStatusAccount",
          mod: "publication",
          resource: "olx",
        }),
      }),
    }),
    publishObject: build.query({
      query: ({
        id_obj,
        id_user_olx,
        resource,
        author_name,
        author_phone,
        title,
        description,
      }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "publish",
          mod: "publication",
          resource,
          id_obj,
          id_user_olx,
          author_name,
          author_phone,
          title,
          description,
        }),
      }),
    }),
    deleteAd: build.query({
      query: ({ id_obj, id_user_olx }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "deleteAdds",
          mod: "publication",
          resource: "olx",
          id_obj,
          id_user_olx,
        }),
      }),
    }),
    deleteAdHistory: build.query({
      query: ({ id_obj, id_user_olx }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "deleteAddsDb",
          mod: "publication",
          resource: "olx",
          id_add_in_source: id_obj,
          id_user_olx,
        }),
      }),
    }),
    deleteAdAccount: build.query({
      query: (id_user_olx) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "deleteAccount",
          mod: "publication",
          resource: "olx",
          id_user_olx,
        }),
      }),
    }),
    changeMlsObject: build.query({
      query: (id_object) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "change_mls",
          mod: "objects",
          id_object,
        }),
      }),
    }),
    rotateImage: build.query({
      query: ({ id_object, id_img, rotate }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "rotateImage",
          mod: "objects",
          id_object,
          id_img,
          rotate,
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
  useGetTagsListQuery,
  useLazyAddTagsToObjectsQuery,
  useLazyShowHistoryTagsQuery,
  useLazyGetPhoneObjectQuery,
  useLazyAddTagsToStreetBaseObjectsQuery,
  useLazyShowStreetBaseHistoryTagsQuery,
  useLazyEditObjectCommentQuery,
  useLazyGetObjectCommentHistoryQuery,
  useLazyAddStreetBaseObjectQuery,
  useGetSourcesQuery,
  useLazyAddNotepadTagQuery,
  useLazyDownloadObjectQuery,
  useGetAgenciesQuery,
  useLazyAddPicaroonQuery,
  useLazyAddOherAgencyQuery,
  useLazyCleanObjectMarksQuery,
  useLazyRestoreObjectsQuery,
  useGetSortObjectViewQuery,
  useLazyGetObjectsStatusticQuery,
  useGetStreetsListQuery,
  useGetAdverstionResourceQuery,
  useGetStatusAccountQuery,
  useGetListAddsPublichQuery,
  useLazyGetListAddsPublichQuery,
  useLazyPublishObjectQuery,
  useLazyDeleteAdQuery,
  useLazyDeleteAdAccountQuery,
  useLazyChangeMlsObjectQuery,
  useLazyDeleteAdHistoryQuery,
  useLazyRotateImageQuery,
} = objects;
