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
import { handleResponse } from "../../utilits";

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
    createRequest({ ...data, id_client: clientId })?.then((resp) => {
      handleResponse(resp, () => {
        cogoToast.success("Заявка успішно створена", {
          hideAfter: 3,
          position: "top-right",
        });
        navigate(`/client/${clientId}`);
      });
    });
  };

  const handleEditRequest = () => {
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
  };

  useEffect(() => {
    if (id) {
      getRequest(id).then((resp) => {
        handleResponse(resp, () => {
          setData({
            id_client: resp?.data?.id_client,
            id_rubric: resp?.data?.id_rubric,
            id_location: resp?.data?.id_location,
            type_obj_apartment: resp?.data?.type_obj_apartment,
            price_min: resp?.data?.price_min,
            price_max: resp?.data?.price_max,
            room_min: resp?.data?.room_min,
            room_max: resp?.data?.room_max,
            address_storey: resp?.data?.address_storey,
            storey_count: resp?.data?.storey_count,
            area_total_min: resp?.data?.area_total_min,
            area_total_max: resp?.data?.area_total_max,
            comment: resp?.data?.comment,
            not_actual: resp?.data?.not_actual,
            dt_deadline: resp?.data?.dt_deadline,
            deleted: resp?.data?.deleted,
          });

          setFavorite(resp?.data?.favorite);
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
