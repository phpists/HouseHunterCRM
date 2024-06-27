import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { CardTitle } from "./CardTitle";
import { Main } from "./Main/Main";
import { Characteristic } from "./Characteristic/Characteristic";
import {
  useLazyAddEmptyRequestInGroupQuery,
  useLazyCreateRequestQuery,
  useLazyDeleteRequestInGroupQuery,
  useLazyEditRequestQuery,
  useLazyGetRequestQuery,
  useLazyGetRubricsFieldsQuery,
} from "../../store/requests/requests.api";
import { useEffect, useRef, useState } from "react";
import cogoToast from "cogo-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkIsJSON,
  handleCheckFields,
  handleFormatDate,
  handleFormatInputDate,
  handleReformatDate,
  handleResponse,
} from "../../utilits";
import { useGetCommentsToFieldsQuery } from "../../store/objects/objects.api";
import { Base } from "../../components/Base/Base";
import { Contacts } from "./Contacts";

export const REQUEST_INIT = {
  fields: [],
  general_group: {
    dt_deadline: new Date(),
    not_actual: "0",
    deleted: "0",
    only_company_obj: "1",
    only_street_base_obj: "0",
    mls: "0",
    only_my_structure: "0",
    only_my_obj: "0",
    submitted_objects: "0",
    folder_empty: "0",
    stop_showing: "0",
    tags_children: "0",
    tags_animal: "0",
    tags_student: "0",
    tags_foreigners: "0",
    structure: "0",
    comment: "",
    name: "",
  },
};

const Request = () => {
  const navigate = useNavigate();
  const { clientId, id } = useParams();
  const [createRequest] = useLazyCreateRequestQuery();
  const [editRequest] = useLazyEditRequestQuery();
  const [getRubricField] = useLazyGetRubricsFieldsQuery();
  const [getRequest] = useLazyGetRequestQuery();
  const [deleteRequestInGroup] = useLazyDeleteRequestInGroupQuery();
  const [addEmptyRequestInGroup] = useLazyAddEmptyRequestInGroupQuery();
  const [data, setData] = useState(REQUEST_INIT);
  const [favorite, setFavorite] = useState(false);
  const [categories, setCategories] = useState([]);
  const categoriesData = useRef([]);
  const [fieldData, setFieldData] = useState([]);
  const fieldsData = useRef([]);
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [errors, setErrors] = useState([]);
  const contentRef = useRef();
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(!!id);

  const handleGetRubricsFields = (id, title) => {
    getRubricField(id).then((resp) => {
      const updatedData = [
        ...fieldsData.current,
        { id, title, fields: resp?.data },
      ];
      if (!fieldsData.current.find((f) => f.id === id)) {
        setFieldData(updatedData);
        fieldsData.current = updatedData;
      }
    });
  };

  const handleChangeCategories = (rubricId, title) => {
    const isExist = categoriesData.current.find((c) => c === rubricId);
    if (!!isExist) {
      if (id) {
        const request = data?.fields?.find(
          ({ id_rubric }) => id_rubric === rubricId
        );
        deleteRequestInGroup(request?.id_request).then((resp) =>
          handleResponse(resp, () => {
            const updatedCategories = categoriesData.current?.filter(
              (c) => c !== rubricId
            );
            setCategories(updatedCategories);
            categoriesData.current = updatedCategories;
            const updatedData = fieldsData.current?.filter(
              (f) => f.id !== rubricId
            );
            fieldsData.current = updatedData;
            setFieldData(updatedData);
            setData({
              ...data,
              fields: data.fields.filter((f) => f.id_rubric !== rubricId),
            });
          })
        );
      } else {
        const updatedCategories = categoriesData.current?.filter(
          (c) => c !== rubricId
        );
        setCategories(updatedCategories);
        categoriesData.current = updatedCategories;
        const updatedData = fieldsData.current?.filter(
          (f) => f.id !== rubricId
        );
        fieldsData.current = updatedData;
        setFieldData(updatedData);
        setData({
          ...data,
          fields: data.fields.filter((f) => f.id_rubric !== rubricId),
        });
      }
    } else {
      if (id) {
        addEmptyRequestInGroup({
          id_group: id,
          id_rubric: rubricId,
        }).then((resp) =>
          handleResponse(resp, () => {
            const id_request = resp?.data?.id_request;
            const updatedCategories = [...categoriesData.current, rubricId];
            setCategories(updatedCategories);
            categoriesData.current = updatedCategories;
            handleGetRubricsFields(rubricId, title);
            setData({
              ...data,
              fields: [
                ...data.fields,
                { id_rubric: rubricId, price_currency: "1", id_request },
              ],
            });
          })
        );
      } else {
        const updatedCategories = [...categoriesData.current, rubricId];
        setCategories(updatedCategories);
        categoriesData.current = updatedCategories;
        handleGetRubricsFields(rubricId, title);
        setData({
          ...data,
          fields: [
            ...data.fields,
            { id_rubric: rubricId, price_currency: "1" },
          ],
        });
      }
    }

    setErrors(
      errors?.map((er) =>
        er.id === "general"
          ? { ...er, errors: er.errors?.filter((e) => e !== "id_rubric") }
          : er
      )
    );
  };

  const handleChangeField = (fieldName, value) => {
    let newData = { ...data, [fieldName]: value };

    if (fieldName === "id_rubric") {
      handleGetRubricsFields(value);
    }

    setData(newData);
  };

  const handleCheckAllFields = () => {
    let errorData = [];

    data.fields.forEach((data) => {
      const fieldFields = fieldData.find((f) => f.id === data.id_rubric);

      const emptyFields = handleCheckFields({
        title: fieldFields?.title,
        data,
        requiredFields: fieldFields?.fields
          ?.filter((f) => f?.required === 1)
          ?.map((f) => f?.field),
        additionalFields: ["id_rubric"],
        titles: commentsToFields?.request,
        additionalTitles: {
          id_location: "Локація",
          price_min: "Ціна від",
          price_max: "Ціна до",
          id_rubric: "Категорія",
        },
      });

      emptyFields?.length > 0 &&
        errorData.push({ id_rubric: data.id_rubric, errors: emptyFields });
      return emptyFields?.length === 0;
    });

    if (data?.fields?.length === 0) {
      errorData.push({ id: "general", errors: ["id_rubric"] });
      cogoToast.error("Оберіть категорію", {
        hideAfter: 3,
        position: "top-right",
      });
    } else if (
      !data?.general_group?.dt_deadline ||
      data?.general_group?.dt_deadline?.length === 0
    ) {
      errorData.push({ id: "general", errors: ["dt_deadline"] });
      cogoToast.error("Вкажіть дату дедлайну", {
        hideAfter: 3,
        position: "top-right",
      });
    } else if (
      data?.general_group?.company_object &&
      !data?.general_group?.company_object?.show_only
    ) {
      errorData.push({ id: "general", errors: ["show_only"] });
    } else if (
      data?.general_group?.company_object &&
      data?.general_group?.company_object?.show_only &&
      !data?.general_group?.company_object?.given_objects &&
      !data?.general_group?.company_object?.overdue &&
      !data?.general_group?.company_object?.show_actual &&
      !data?.general_group?.company_object?.my_structure &&
      !data?.general_group?.company_object?.show_not_actual &&
      !data?.general_group?.company_object?.company_street_base
    ) {
      errorData.push({ id: "general", errors: ["company_object_more"] });
    } else if (
      !data?.general_group?.company_object &&
      !data?.general_group?.street_base_object &&
      typeof data?.general_group?.street_base_object !== "object" &&
      !data?.general_group?.mls_object &&
      typeof data?.general_group?.mls_object !== "object"
    ) {
      errorData.push({ id: "general", errors: ["base"] });
      cogoToast.error(
        "Щоб зберегти/додати запит потрібно вибрати хочаб одну базу",
        {
          hideAfter: 3,
          position: "top-right",
        }
      );
    } else {
      errorData.push({ id: "general", errors: [] });
    }

    setErrors([...errorData, { id: "updated" }]);

    return (
      errorData?.length === 1 &&
      errorData?.find((e) => e.id === "general") &&
      errorData?.find((e) => e.id === "general")?.errors?.length === 0
    );
  };

  const handleFillEmptyRangeFields = (sendData, fieldsData) => {
    return sendData.map((field) => {
      let filledFilleds = [];
      const fileds =
        fieldsData.find((f) => f.id === field.id_rubric)?.fields ?? [];

      fileds
        ?.filter((f) => f.field.includes("_min") && !f.field.includes("_min_"))
        .forEach((f) => {
          filledFilleds.push([[f.field], "0"]);
        });

      return {
        ...Object.fromEntries(filledFilleds),
        ...field,
      };
    });
  };

  const handleCreateRequest = () => {
    if (handleCheckAllFields()) {
      setLoading(true);
      createRequest({
        ...data,
        fields: handleFillEmptyRangeFields(data.fields, fieldsData.current),
        general_group: {
          ...data.general_group,
          company_object: data.general_group?.company_object
            ? {
                ...data.general_group?.company_object,
                company_given_objects_to: data.general_group?.company_object
                  ?.company_given_objects_to
                  ? Math.floor(
                      new Date(
                        handleReformatDate(
                          data.general_group?.company_object
                            ?.company_given_objects_to
                        )
                      ).getTime() / 1000
                    )
                  : undefined,
              }
            : data.general_group?.company_object,
          id_client: clientId,
          dt_deadline: data?.general_group?.dt_deadline
            ? Math.floor(
                new Date(data?.general_group?.dt_deadline ?? 0).getTime() / 1000
              )
            : undefined,
          favorite: undefined,
        },
      })?.then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          cogoToast.success("Заявка успішно створена", {
            hideAfter: 3,
            position: "top-right",
          });
          navigate(`/client/${clientId}`);
        });
      });
    }
  };

  const handleEditRequest = () => {
    if (handleCheckAllFields()) {
      setLoading(true);
      const {
        name,
        comment,
        stop_showing,
        folder_empty,
        not_actual,
        company_object,
        street_base_object,
        mls_object,
      } = data?.general_group;
      editRequest({
        ...data,
        fields: handleFillEmptyRangeFields(data.fields, fieldsData.current),
        general_group: {
          name,
          comment,
          stop_showing,
          folder_empty,
          not_actual,
          company_object: company_object
            ? {
                ...company_object,
                company_given_objects_to:
                  company_object?.company_given_objects_to
                    ? Math.floor(
                        new Date(
                          handleReformatDate(
                            company_object?.company_given_objects_to
                          )
                        ).getTime() / 1000
                      )
                    : undefined,
              }
            : company_object,
          street_base_object,
          mls_object,
          id_group: id,
          id_client: clientId,
          dt_deadline: data?.general_group?.dt_deadline
            ? Math.floor(
                new Date(data?.general_group?.dt_deadline ?? 0).getTime() / 1000
              )
            : undefined,
          favorite: undefined,
        },
      })?.then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          cogoToast.success("Зміни успішно збережено", {
            hideAfter: 3,
            position: "top-right",
          });
        });
      });
    }
  };

  const handleGetCategories = (ids) => {
    ids.forEach((id) => handleGetRubricsFields(id));
    setCategories(ids);
    categoriesData.current = ids;
  };

  useEffect(() => {
    if (id) {
      setIsDataLoading(true);
      getRequest(id).then((resp) => {
        setIsDataLoading(false);
        handleResponse(resp, () => {
          setDeleted(resp?.data[id]?.General_field_group?.deleted === "1");
          setFavorite(!!!resp?.data[id].General_field_group?.favorite);
          setCategories([]);
          categoriesData.current = [];
          const categories = Object.entries(resp?.data[id])
            .filter((f) => f[0] !== "General_field_group")
            .map((f) => f[1]?.id_rubric);

          handleGetCategories(categories);
          let company_object = {
            show_only:
              resp?.data[id]?.General_field_group?.show_company_obj === "1"
                ? "company"
                : resp?.data[id]?.General_field_group?.show_my_obj === "1"
                ? "only_my"
                : resp?.data[id]?.General_field_group?.structure === "1"
                ? "my_structure"
                : undefined,
            show_actual:
              resp?.data[id]?.General_field_group?.show_actual_object === "1"
                ? "1"
                : undefined,
            show_not_actual:
              resp?.data[id]?.General_field_group?.show_no_actual_object === "1"
                ? "1"
                : undefined,
            given_objects:
              resp?.data[id]?.General_field_group?.show_given_objects === "1"
                ? "1"
                : undefined,
            overdue:
              resp?.data[id]?.General_field_group?.show_overdue_objects === "1"
                ? "1"
                : undefined,
            company_street_base:
              resp?.data[id]?.General_field_group?.show_company_street_base ===
              "1"
                ? "1"
                : undefined,
          };

          company_object = Object.fromEntries(
            Object.entries(company_object)?.filter((f) => f[1] !== undefined)
          );

          setData({
            general_group: {
              ...resp?.data[id]?.General_field_group,
              dt_deadline: resp?.data[id]?.General_field_group?.dt_deadline
                ? new Date(
                    Number(
                      resp?.data[id]?.General_field_group?.dt_deadline ?? 0
                    ) * 1000
                  )
                : undefined,
              tags_children:
                resp?.data[id]?.General_field_group?.tags_children ?? "0",
              tags_animal:
                resp?.data[id]?.General_field_group?.tags_animal ?? "0",
              tags_student:
                resp?.data[id]?.General_field_group?.tags_student ?? "0",
              tags_foreigners:
                resp?.data[id]?.General_field_group?.tags_foreigners ?? "0",
              company_object:
                Object.entries(company_object)?.length === 0
                  ? undefined
                  : {
                      ...company_object,
                      company_given_objects_to:
                        resp?.data[id]?.General_field_group
                          ?.company_given_objects_to !== "0"
                          ? handleFormatDate(
                              new Date(
                                Number(
                                  resp?.data[id]?.General_field_group
                                    ?.company_given_objects_to ?? 0
                                ) * 1000
                              ),
                              true
                            )
                          : undefined,
                    },
              street_base_object:
                resp?.data[id]?.General_field_group?.show_street_base === "1"
                  ? {
                      disable_cooperation:
                        resp?.data[id]?.General_field_group
                          ?.disable_cooperation === "1"
                          ? "1"
                          : undefined,
                      sorting_id:
                        resp?.data[id]?.General_field_group
                          ?.street_base_sorting_id ?? undefined,
                    }
                  : undefined,
              mls_object:
                resp?.data[id]?.General_field_group?.mls === "1"
                  ? {
                      ...(resp?.data[id]?.General_field_group
                        ?.invert_company === "1"
                        ? { invert_company: "1" }
                        : {}),
                      ...(checkIsJSON(
                        resp?.data[id]?.General_field_group?.list_copmany_mls
                      )?.length > 0
                        ? {
                            list_company: checkIsJSON(
                              resp?.data[id]?.General_field_group
                                ?.list_copmany_mls
                            ),
                          }
                        : {}),
                    }
                  : undefined,
            },
            fields: Object.entries(resp?.data[id])
              .filter((f) => f[0] !== "General_field_group")
              .map((f) => ({
                ...f[1],
                id_location: checkIsJSON(f[1]?.id_location),
                search_key_like_json: checkIsJSON(
                  f[1]?.search_key_like_json
                )?.filter((v) => v.length > 0),
                search_key_like2_json: checkIsJSON(
                  f[1]?.search_key_like2_json
                )?.filter((v) => v.length > 0),
                search_key_notlike_json: checkIsJSON(
                  f[1]?.search_key_notlike_json
                )?.filter((v) => v.length > 0),
              })),
          });
        });
      });
    }
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (!!errors?.find((e) => e.id === "updated")) {
      const firstErrorField = document.querySelectorAll(
        ".request-content  .error-field"
      );
      if (firstErrorField[0]) {
        contentRef.current.scrollTo({
          top: firstErrorField[0].offsetTop - contentRef.current.offsetTop - 10,
        });
      }
    }
  }, [errors]);

  const handleChangeBase = (field, value, isClear) => {
    handleChangeField(
      "general_group",
      isClear
        ? { ...data.general_group, ...value }
        : {
            ...data.general_group,
            [field]: value ?? "0",
          }
    );
    setErrors(
      errors?.map((er) =>
        er.id === "general"
          ? {
              ...er,
              errors: er.errors
                ?.filter((e) => e !== "show_only")
                ?.filter((e) => e !== "base")
                ?.filter((e) => e !== "company_object_more"),
            }
          : er
      )
    );
  };

  return (
    <StyledRequest>
      <Header
        onSave={id ? handleEditRequest : handleCreateRequest}
        favorite={favorite}
        onToggleFavorite={() => setFavorite(!favorite)}
        data={data}
        onChangeField={handleChangeField}
        loading={loading}
        isDeleted={deleted}
        onToggleDeleted={(val) => setDeleted(val)}
        isDataLoading={isDataLoading}
      />
      <div className="request-content request-content-wrapper" ref={contentRef}>
        <div>
          <CardTitle title="Головне" />
          <Main
            data={data}
            onChangeField={handleChangeField}
            categories={categories}
            onChangeCategories={handleChangeCategories}
            fields={fieldData}
            errors={errors}
            onChangeErrors={(val) => setErrors(val)}
          />
        </div>
        <div>
          <CardTitle title="Технічні характеристики" />
          <Characteristic
            data={data}
            onChangeField={handleChangeField}
            fields={fieldData}
            errors={errors}
            onChangeErrors={(val) => setErrors(val)}
          />
        </div>

        <div className="base-wrapper">
          <CardTitle title="Вібір бази" />
          <Base
            data={data.general_group}
            actualFieldName="show_actual"
            notActualFieldName="show_not_actual"
            streetBaseFieldName="company_street_base"
            companiesFieldName="list_company"
            onChange={handleChangeBase}
            streetBaseOpen={data?.general_group?.show_street_base === "1"}
            mlsBaseOpen={data?.general_group?.mls === "1"}
            errors={errors?.find((er) => er?.id === "general")?.errors ?? []}
            className="request-base-wrapper"
            dateAgreement
            dateAgreementFieldName="company_given_objects_to"
            requestPage
          />
          <Contacts />
        </div>
      </div>
    </StyledRequest>
  );
};

const StyledRequest = styled.div`
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 15px 20px;
  .request-content {
    border-radius: 15px;
    background: var(--modal-bg);
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  .request-card {
    height: calc(100svh - 302px);
    overflow: auto;
    border-radius: 14px;
    &::-webkit-scrollbar-thumb {
      background: transparent;
      transition: all 0.3s;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: var(--active-bg);
      }
    }
  }
  .base-wrapper {
    overflow: auto;
  }
  .request-base-wrapper {
    height: calc(100svh - 430px) !important;
    margin-bottom: 15px;
    overflow: auto;
  }
  .base-error {
    border: 1px solid red;
  }
  @media (max-width: 1300px) {
    .request-base-wrapper {
      height: max-content !important;
      margin-bottom: 15px;
    }
  }
  @media (max-width: 1250px) {
    .request-content {
      grid-template-columns: 1fr;
      height: calc(100svh - 260px);
      grid-auto-rows: max-content;
      overflow: auto !important;
    }
    .request-card {
      height: max-content;
      overflow: visible !important;
      /* overflow: initial; */
    }
  }

  @media (max-width: 800px) {
    padding: 20px 10px;
    width: 100svw;
    margin-left: -13px;
    .request-content {
      padding: 10px;
      height: calc(100svh - 170px);
    }
    .request-base-wrapper {
      height: max-content !important;
    }
  }
`;

export default Request;
