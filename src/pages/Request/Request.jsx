import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { CardTitle } from "./CardTitle";
import { Main } from "./Main/Main";
import { Characteristic } from "./Characteristic/Characteristic";
import { Base } from "./Base/Base";
import {
  useLazyCreateRequestQuery,
  useLazyEditRequestQuery,
  useLazyGetRequestQuery,
  useLazyGetRubricsFieldsQuery,
} from "../../store/requests/requests.api";
import { useEffect, useRef, useState } from "react";
import cogoToast from "cogo-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleCheckFields,
  handleFormatDate,
  handleResponse,
} from "../../utilits";
import { useGetCommentsToFieldsQuery } from "../../store/objects/objects.api";

export const REQUEST_INIT = {
  fields: [],
  general_group: {
    dt_deadline: null,
    not_actual: "0",
    deleted: "0",
    only_company_obj: "1",
    only_street_base_obj: "0",
    mls: "0",
    structure: "0",
    only_my_obj: "0",
    submitted_objects: "0",
    folder_empty: "0",
    stop_showing: "0",
  },
};

export const Request = () => {
  const navigate = useNavigate();
  const { clientId, id } = useParams();
  const [createRequest] = useLazyCreateRequestQuery();
  const [editRequest] = useLazyEditRequestQuery();
  const [getRubricField] = useLazyGetRubricsFieldsQuery();
  const [getRequest] = useLazyGetRequestQuery();
  const [data, setData] = useState(REQUEST_INIT);
  const [favorite, setFavorite] = useState(false);
  const [categories, setCategories] = useState([]);
  const categoriesData = useRef([]);
  const [fieldData, setFieldData] = useState([]);
  const fieldsData = useRef([]);
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [errors, setErrors] = useState([]);
  const contentRef = useRef();

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

  const handleChangeCategories = (id, title) => {
    const isExist = !!categoriesData.current.find((c) => c === id);
    if (isExist) {
      const updatedCategories = categoriesData.current?.filter((c) => c !== id);
      setCategories(updatedCategories);
      categoriesData.current = updatedCategories;
      const updatedData = fieldsData.current?.filter((f) => f.id !== id);
      setFieldData(updatedData);
      fieldsData.current = updatedData;
      setData({
        ...data,
        fields: data.fields.filter((f) => f.id_rubric !== id),
      });
    } else {
      const updatedCategories = [...categoriesData.current, id];
      setCategories(updatedCategories);
      categoriesData.current = updatedCategories;
      handleGetRubricsFields(id, title);
      setData({
        ...data,
        fields: [...data.fields, { id_rubric: id, price_currency: "1" }],
      });
    }
  };

  const handleChangeField = (fieldName, value) => {
    const newData = { ...data, [fieldName]: value };
    setData(newData);
    if (fieldName === "id_rubric") {
      handleGetRubricsFields(value);
    }
  };

  const handleCheckAllFields = () => {
    let errorData = [];

    const isNotEmptyField = data.fields.map((data) => {
      const fieldFields = fieldData.find((f) => f.id === data.id_rubric);
      const emptyFields = handleCheckFields({
        title: fieldFields.title,
        data,
        requiredFields: fieldFields?.fields
          ?.filter((f) => f?.required === 1)
          ?.map((f) => f?.field),
        additionalFields: [],
        titles: commentsToFields?.request,
        additionalTitles: {
          id_location: "Локація",
          price_min: "Ціна від",
          price_max: "Ціна до",
        },
      });

      emptyFields?.length > 0 &&
        errorData.push({ id_rubric: data.id_rubric, errors: emptyFields });
      return emptyFields?.length === 0;
    });

    if (
      !data?.general_group?.dt_deadline ||
      data?.general_group?.dt_deadline?.length === 0
    ) {
      errorData.push({ id: "general", errors: ["dt_deadline"] });
    } else {
      errorData.push({ id: "general", errors: [] });
    }

    setErrors([...errorData, { id: "updated" }]);
    return isNotEmptyField.find((e) => !e) === undefined;
  };

  const handleCreateRequest = () => {
    if (handleCheckAllFields()) {
      createRequest({
        ...data,
        general_group: {
          ...data.general_group,
          id_client: clientId,
          dt_deadline: data?.general_group?.dt_deadline
            ? new Date(data?.general_group?.dt_deadline ?? 0).getTime() / 1000
            : undefined,
          favorite: undefined,
        },
      })?.then((resp) => {
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
      editRequest({
        ...data,
        general_group: {
          id_group: id,
          ...data.general_group,
          id_client: clientId,
          dt_deadline: data?.general_group?.dt_deadline
            ? new Date(data?.general_group?.dt_deadline ?? 0).getTime() / 1000
            : undefined,
          favorite: undefined,
        },
      })?.then((resp) => {
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
      getRequest(id).then((resp) => {
        handleResponse(resp, () => {
          setFavorite(!!!resp?.data[id].General_field_group?.favorite);
          setCategories([]);
          categoriesData.current = [];
          const categories = Object.entries(resp?.data[id])
            .filter((f) => f[0] !== "General_field_group")
            .map((f) => f[1]?.id_rubric);

          handleGetCategories(categories);
          setData({
            general_group: {
              ...resp?.data[id]?.General_field_group,
              dt_deadline: resp?.data[id]?.General_field_group?.dt_deadline
                ? handleFormatDate(
                    Number(
                      resp?.data[id]?.General_field_group?.dt_deadline ?? 0
                    ) * 1000,
                    true
                  )
                : undefined,
            },
            fields: Object.entries(resp?.data[id])
              .filter((f) => f[0] !== "General_field_group")
              .map((f) => f[1]),
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

  return (
    <StyledRequest>
      <Header
        onSave={() => (id ? handleEditRequest() : handleCreateRequest())}
        favorite={favorite}
        onToggleFavorite={() => setFavorite(!favorite)}
        data={data}
        onChangeField={handleChangeField}
      />
      <div className="request-content hide-scroll" ref={contentRef}>
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
          <Base data={data} onChangeField={handleChangeField} />
        </div>
      </div>
    </StyledRequest>
  );
};

const StyledRequest = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 15px 20px;
  .request-content {
    border-radius: 15px;
    background: #2b2b2b;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  .request-card {
    height: calc(100svh - 302px);
    overflow: auto;
    border-radius: 14px;
  }
  @media (max-width: 1250px) {
    .request-content {
      grid-template-columns: 1fr;
      height: calc(100svh - 260px);
      overflow: auto;
      grid-auto-rows: max-content;
    }
    .request-card {
      height: max-content;
      overflow: initial;
    }
  }

  @media (max-width: 800px) {
    padding: 20px 24px;
    width: 100svw;
    margin-left: -24px;
    .request-content {
      padding: 10px;
    }
  }
`;
