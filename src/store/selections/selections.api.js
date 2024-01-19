import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import { handleResponse, handleToFormData } from "../../utilits";

export const selections = createApi({
  reducerPath: "selections/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getSelections: build.query({
      query: ({ id_requst_group, filters, current_page, item_on_page }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view_notepad",
          mod: "requests",
          id_requst_group,
          filters,
          current_page,
          item_on_page,
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
    addObjectToSelections: build.query({
      query: ({ id_request_group, id_object }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_object_to_folder",
          mod: "requests",
          id_request_group,
          id_object,
        }),
      }),
    }),
    hideObjectFromSelections: build.query({
      query: ({ id_request_group, id_object }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "hide_object_to_folder",
          mod: "requests",
          id_request_group,
          id_object,
        }),
      }),
    }),
    showChat: build.query({
      query: (id_request_group) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "show_chat",
          mod: "requests",
          id_request_group,
        }),
      }),
    }),
    showChatClient: build.query({
      query: (id_request_group) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "show_chat",
          mod: "notepad_chat_client",
          id_request_group,
        }),
      }),
    }),
    addMessage: build.query({
      query: ({ id_request_group, messege, show_object, id_parent, img }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            action: "add_messege_to_chat",
            mod: "requests",
            id_request_group,
            messege,
            show_object,
            id_parent,
          },
          img ? { img } : null
        ),
      }),
    }),
    addMessageClient: build.query({
      query: ({ id_request_group, messege, show_object, id_parent, img }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            action: "add_messege_to_chat_client",
            mod: "notepad_chat_client",
            id_request_group,
            messege,
            show_object,
            id_parent,
          },
          { img }
        ),
      }),
    }),
    getFoldersList: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_list_my_folder",
          mod: "requests",
        }),
      }),
    }),
  }),
});

export const {
  useLazyGetSelectionsQuery,
  useLazyAddObjectToSelectionsQuery,
  useLazyHideObjectFromSelectionsQuery,
  useGetFoldersListQuery,
  useLazyShowChatQuery,
  useLazyShowChatClientQuery,
  useLazyAddMessageQuery,
  useLazyAddMessageClientQuery,
} = selections;
