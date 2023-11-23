import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../api/baseUrl";
import { headers } from "../../api/headers";
import { handleToFormData } from "../../utilits";

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
      }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "add_new_worker",
          mod: "billing",
          email,
          id_permision,
          password,
          first_name,
          last_name,
          phones_json,
        }),
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
      }) => ({
        url: "",
        method: "POST",
        headers: headers(),
        body: handleToFormData({
          action: "edit_worker",
          mod: "billing",
          email,
          id_permision,
          password,
          first_name,
          last_name,
          phones_json,
          id_worker,
        }),
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
        const formatedResponse = response?.messege
          ? Object.fromEntries(
              Object.entries(response?.messege)?.filter((p) => p[0] !== "error")
            )
          : {};
        return formatedResponse;
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
        const transformedResponse = Object.fromEntries(
          Object.entries(response)?.filter((e) => e[0] !== "error")
        );
        return transformedResponse;
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
} = structure;
