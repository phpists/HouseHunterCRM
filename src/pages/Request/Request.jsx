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
import { useEffect, useState } from "react";
import cogoToast from "cogo-toast";
import { useNavigate, useParams } from "react-router-dom";
import { handleCheckFields, handleResponse } from "../../utilits";
import { useGetCommentsToFieldsQuery } from "../../store/objects/objects.api";

export const REQUEST_INIT = {
  id_client: null,
  id_rubric: null,
  id_location: null,
  type_obj_apartment: null,
  price_min: 0,
  price_max: 0,
  room_min: 0,
  room_max: 0,
  address_storey: 0,
  storey_count: 0,
  area_total_min: 0,
  area_total_max: 0,
  comment: "",
  not_actual: 0,
  dt_deadline: 0,
  deleted: 0,
  price_currency: "1",
};

export const Request = () => {
  const navigate = useNavigate();
  const { clientId, id } = useParams();
  const [createRequest] = useLazyCreateRequestQuery();
  const [editRequest] = useLazyEditRequestQuery();
  const [getRubricField] = useLazyGetRubricsFieldsQuery();
  const [getRequest] = useLazyGetRequestQuery();
  const [data, setData] = useState(REQUEST_INIT);
  const [fields, setFields] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();

  const handleGetRubricsFields = (id) => {
    getRubricField(id).then((resp) => setFields(resp?.data));
  };

  const handleChangeField = (fieldName, value) => {
    const newData = { ...data, [fieldName]: value };
    setData(newData);
    if (fieldName === "id_rubric") {
      handleGetRubricsFields(value);
    }
  };

  const handleCreateRequest = () => {
    const isAllRequiredFieldsFilled = handleCheckFields({
      data: { ...data, id_client: clientId },
      requiredFields: fields
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

    if (isAllRequiredFieldsFilled) {
      createRequest({ ...data, id_client: clientId })?.then((resp) => {
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
    const isAllRequiredFieldsFilled = handleCheckFields({
      data: { ...data, id_client: clientId },
      requiredFields: fields
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

    if (isAllRequiredFieldsFilled) {
      editRequest({
        field: { ...data, id_client: clientId },
        id_request: id,
      })?.then((resp) => {
        handleResponse(resp, () => {
          cogoToast.success("Заявка успішно збережена", {
            hideAfter: 3,
            position: "top-right",
          });
        });
      });
    }
  };

  useEffect(() => {
    if (id) {
      getRequest(id).then((resp) => {
        handleResponse(resp, () => {
          setData(resp?.data);
          setFavorite(resp?.data?.favorite);
          handleGetRubricsFields(resp?.data?.id_rubric);
        });
      });
    }
  }, [id]);

  return (
    <StyledRequest>
      <Header
        onSave={() => (id ? handleEditRequest() : handleCreateRequest())}
        favorite={favorite}
        onToggleFavorite={() => setFavorite(!favorite)}
        data={data}
        onChangeField={handleChangeField}
      />
      <div className="request-content hide-scroll">
        <div>
          <CardTitle title="Головне" />
          <Main data={data} onChangeField={handleChangeField} />
        </div>
        <div>
          <CardTitle title="Технічні характеристики" />
          <Characteristic
            data={data}
            onChangeField={handleChangeField}
            fields={fields}
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
