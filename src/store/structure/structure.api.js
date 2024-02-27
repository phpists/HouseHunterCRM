import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import { handleResponse, handleToFormData } from "../../utilits";

export const structure = createApi({
  reducerPath: "structure/api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    createWorker: build.query({
      query: ({
        email,
        id_permision,
        password,
        first_name,
        last_name,
        phones_json,
        structure_parent,
        dt_birthday,
        photo,
      }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            action: "add_new_worker",
            mod: "billing",
            email,
            id_permision,
            password,
            first_name,
            last_name,
            phones_json,
            structure_parent,
            dt_birthday,
          },
          photo ? { photo } : null
        ),
      }),
    }),
    editWorker: build.query({
      query: ({
        email,
        id_permision,
        password,
        first_name,
        last_name,
        phones_json,
        id_worker,
        structure_parent,
        active,
        photo,
        dt_birthday,
      }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            action: "edit_worker",
            mod: "billing",
            email,
            id_permision,
            id_worker,
            structure_parent,
            password,
            active,
            first_name,
            last_name,
            phones_json,
            dt_birthday,
          },
          { photo }
        ),
      }),
    }),
    editWorkerPermission: build.query({
      query: ({ name_permision, id_worker, permission_list_json }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData(
          {
            action: "edit_worker_not_structure",
            mod: "billing",
            name_permision,
            id_worker,
            permission_list_json,
          },
          null,
          [],
          true
        ),
      }),
    }),
    deleteWorker: build.query({
      query: (id_worker) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete_worker",
          mod: "billing",
          id_worker,
        }),
      }),
    }),
    getWorker: build.query({
      query: (id_worker) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_worker_by_id",
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
    createStructure: build.query({
      query: (id_user, id_parent) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add",
          mod: "structure",
          id_user,
          id_parent,
        }),
      }),
    }),
    editStructure: build.query({
      query: (id_user, id_parent) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "edit",
          mod: "structure",
          id_user,
          id_parent,
        }),
      }),
    }),
    deleteStructure: build.query({
      query: (id_user) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete",
          mod: "structure",
          id_user,
        }),
      }),
    }),
    getStructure: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "view",
          mod: "structure",
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
    createPerimission: build.query({
      query: ({
        module_name,
        permission_list_json,
        structure_level,
        color,
      }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "create_permision",
          mod: "billing",
          module_name,
          permission_list_json,
          structure_level,
          color,
        }),
      }),
    }),
    editPerimission: build.query({
      query: ({ structure_level, id_permissions, permission_list_json }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "edit_permision",
          mod: "structure",
          permission_list_json,
          id_permissions,
          structure_level,
        }),
      }),
    }),
    deletePerimission: build.query({
      query: (id_permissions) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete_permision",
          mod: "billing",
          id_permissions,
        }),
      }),
    }),
    getPerimissions: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_permision_director",
          mod: "billing",
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
    getAllPerimissions: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_all_permission",
          mod: "system_info",
        }),
      }),
      transformResponse: (response) => {
        return handleResponse(
          response,
          () => {
            const formatedResponse = response?.messege
              ? Object.fromEntries(
                  Object.entries(response?.messege)?.filter(
                    (p) => p[0] !== "error"
                  )
                )
              : {};
            return formatedResponse;
          },
          () => null,
          false,
          true
        );
      },
    }),
    getAllPerimissionsLevels: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_structure_level",
          mod: "structure",
        }),
      }),
      transformResponse: (response) => {
        return handleResponse(
          response,
          () => {
            const transformedResponse = Object.fromEntries(
              Object.entries(response)?.filter((e) => e[0] !== "error")
            );
            return transformedResponse;
          },
          () => null,
          false,
          true
        );
      },
    }),
    getCompanyStructureLevel: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_structure_level_company",
          mod: "structure",
        }),
      }),
      transformResponse: (response) => {
        return handleResponse(
          response,
          () => {
            const transformedResponse = Object.fromEntries(
              Object.entries(response)?.filter((e) => e[0] !== "error")
            );

            return transformedResponse?.level;
          },
          () => null,
          false,
          true
        );
      },
    }),
    changeCompanyStructureLevel: build.query({
      query: (structure_level) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "change_structure_level_company",
          mod: "structure",
          structure_level,
        }),
      }),
    }),
    getPerimissionDirector: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_permision_director",
          mod: "billing",
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
    changeWorkerLevel: build.query({
      query: ({ id_user, structure_level }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "set_structure_worker",
          mod: "structure",
          id_user,
          structure_level,
        }),
      }),
    }),
    getStructureWorkers: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_worker_structure_my_company",
          mod: "structure",
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
    getStructureWorkerInfo: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_worker_structure_my_company",
          mod: "structure",
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
    getWorkerById: build.query({
      query: (id_worker) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_worker_by_id",
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
    getStatisticWorker: build.query({
      query: (id_user) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_statistic_worker",
          mod: "structure",
          id_user,
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
    getStatisticTotalWorker: build.query({
      query: ({ id_worker, period }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_statistic_new_items_worker",
          mod: "system_info",
          id_worker,
          period,
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
    getStructureUsersCompany: build.query({
      query: ({ structure_level, id_user }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_user_structure_company",
          mod: "structure",
          structure_level,
          id_user,
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
    getRecurseStructure: build.query({
      query: (id_worker) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_structure_company_list",
          mod: "structure",
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
    deleteWorkerImg: build.query({
      query: (id_worker) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "delete_worker_img",
          mod: "billing",
          id_worker,
        }),
      }),
    }),
    getNotStructureWorkers: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_worker_not_structure",
          mod: "structure",
        }),
      }),
    }),
    addWorkerToStructure: build.query({
      query: ({ id_users, id_strcture_parent }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_worker_to_structure",
          mod: "structure",
          id_users,
          id_strcture_parent,
        }),
      }),
    }),
    getWorkerCount: build.query({
      query: () => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "get_count_worker_company",
          mod: "billing",
        }),
      }),
    }),
  }),
});

export const {
  useLazyCreateWorkerQuery,
  useLazyEditWorkerQuery,
  useLazyDeleteWorkerQuery,
  useLazyGetWorkerQuery,
  useLazyCreateStructureQuery,
  useLazyEditStructureQuery,
  useLazyDeleteStructureQuery,
  useLazyGetStructureQuery,
  useLazyCreatePerimissionQuery,
  useLazyEditPerimissionQuery,
  useLazyDeletePerimissionQuery,
  useLazyGetPerimissionsQuery,
  useGetPerimissionsQuery,
  useGetAllPerimissionsQuery,
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
  useLazyChangeCompanyStructureLevelQuery,
  useGetPerimissionDirectorQuery,
  useLazyChangeWorkerLevelQuery,
  useLazyGetStructureWorkersQuery,
  useGetStructureWorkersQuery,
  useLazyGetWorkerByIdQuery,
  useLazyGetStatisticWorkerQuery,
  useLazyGetStructureUsersCompanyQuery,
  useGetStructureUsersCompanyQuery,
  useGetRecurseStructureQuery,
  useLazyDeleteWorkerImgQuery,
  useLazyGetNotStructureWorkersQuery,
  useLazyAddWorkerToStructureQuery,
  useLazyGetWorkerCountQuery,
  useLazyGetStatisticTotalWorkerQuery,
  useLazyEditWorkerPermissionQuery,
} = structure;
