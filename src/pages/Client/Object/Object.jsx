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
import { handleFormatDate, handleResponse } from "../../../utilits";
import {
  useLazyGetObjectQuery,
  useLazyGetRubricFieldsQuery,
} from "../../../store/objects/objects.api";

export const ObjectCard = ({ className, selectedObject }) => {
  const [started, setStarted] = useState(true);
  const [getRequest, { data: requestData }] = useLazyGetRequestQuery();
  const [getObject] = useLazyGetObjectQuery();
  const [getRubricField] = useLazyGetRubricsFieldsQuery();
  const [data, setData] = useState(REQUEST_INIT);
  const [fields, setFields] = useState([]);
  const [getRubricFields, { data: objectFields }] =
    useLazyGetRubricFieldsQuery();

  const handleGetRequest = () => {
    getRequest(selectedObject?.id).then((resp) => {
      handleResponse(resp, () => {
        // ! Object.entries(resp?.data)[0][1]
        const infoField = Object.entries(
          Object.entries(resp?.data)[0][1]
        ).filter((f) => f[0] !== "General_field_group")[0][1];
        const generalInfo = Object.entries(
          Object.entries(resp?.data)[0][1]
        ).find((f) => f[0] === "General_field_group");

        setData({
          id_client: infoField?.id_client,
          id_rubric: infoField?.id_rubric,
          id_location: infoField?.id_location,
          type_obj_apartment: infoField?.type_obj_apartment,
          price_min: infoField?.price_min,
          price_max: infoField?.price_max,
          room_min: infoField?.room_min,
          room_max: infoField?.room_max,
          address_storey: infoField?.address_storey,
          storey_count: infoField?.storey_count,
          area_total_min: infoField?.area_total_min,
          area_total_max: infoField?.area_total_max,
          comment: infoField?.comment,
          not_actual: infoField?.not_actual,
          dt_deadline: Object.entries(resp?.data)[0][1]?.dt_deadline,
          deleted: infoField?.deleted,
          dt_add:
            generalInfo?.length > 0 && generalInfo[1]?.dt_add
              ? handleFormatDate(Number(generalInfo[1]?.dt_add) * 1000, true)
              : "-",
        });
      });
    });
  };

  const handleGetObject = () => {
    getObject(selectedObject?.id).then((resp) => {
      handleResponse(resp, () => {
        getRubricFields(resp?.data?.id_rubric);
        setData({
          ...resp?.data,
          img: Object.entries(resp?.data?.img)
            ?.map((p) => p[1])
            ?.sort((a, b) => b?.order - a?.order)
            ?.map(({ url }) => url),
          id_client: resp?.data?.id_client,
          id_rubric: resp?.data?.id_rubric,
          id_location: resp?.data?.id_location,
          price_min: resp?.data?.price,
          dt_add: resp?.data?.dt_add
            ? handleFormatDate(Number(resp?.data?.dt_add) * 1000, true)
            : "-",
        });
      });
    });
  };

  useEffect(() => {
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
        objectFields={objectFields}
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
