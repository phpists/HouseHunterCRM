import { styled } from "styled-components";
import { SectionTitle } from "./SectionTitle";
import { Maininfo } from "./Maininfo/MainInfo";
import { StartButton } from "./StartButton";
import { useState } from "react";
import { Steps } from "./Steps/Steps";
import { useEffect } from "react";
import {
  useLazyGetRequestQuery,
  useLazyGetRubricsFieldsQuery,
} from "../../../store/requests/requests.api";
import { REQUEST_INIT } from "../../Request/Request";
import { handleResponse } from "../../../utilits";
import { useLazyGetObjectQuery } from "../../../store/objects/objects.api";

export const Object = ({ className, selectedObject }) => {
  const [started, setStarted] = useState(true);
  const [getRequest, { data: requestData }] = useLazyGetRequestQuery();
  const [getObject] = useLazyGetObjectQuery();
  const [getRubricField] = useLazyGetRubricsFieldsQuery();
  const [data, setData] = useState(REQUEST_INIT);
  const [fields, setFields] = useState([]);

  const handleGetRequest = () => {
    getRequest(selectedObject?.id).then((resp) => {
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
      });
    });
  };

  const handleGetObject = () => {
    getObject(selectedObject?.id).then((resp) => {
      handleResponse(resp, () => {
        setData({
          img: [...resp?.data?.img]
            ?.sort((a, b) => b?.order - a?.order)
            ?.map(({ url }) => url),
          id_client: resp?.data?.id_client,
          id_rubric: resp?.data?.id_rubric,
          id_location: resp?.data?.id_location,
          price_min: resp?.data?.price,
        });
      });
    });
  };

  useEffect(() => {
    console.log(selectedObject);
    if (selectedObject?.id) {
      selectedObject?.type === "request"
        ? handleGetRequest()
        : handleGetObject();
    }
  }, [selectedObject]);

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

  return (
    <StyledObject className={`hide-scroll ${className}`}>
      <SectionTitle title={data?.rubric ?? ""} />
      <Maininfo
        data={data}
        onChangeField={handleChangeField}
        requestData={requestData}
        isObject={selectedObject?.type === "object"}
      />
      {started ? (
        <>
          {/* <SectionTitle title="Етап" /> */}
          {/* <Steps /> */}
        </>
      ) : (
        <StartButton onClick={() => setStarted(true)} />
      )}
    </StyledObject>
  );
};

const StyledObject = styled.div`
  border-radius: 15px;
  width: 360px;
  padding: 10px;
  height: calc(100svh - 235px);
  overflow: auto;
  overflow-x: hidden;
  background: #2b2b2b;
  @media (min-width: 1400px) {
    width: 290px;
  }
  @media (min-width: 1600px) {
    width: 360px;
  }
`;
