import { styled } from "styled-components";
import { SectionTitle } from "./SectionTitle";
import { Maininfo } from "./Maininfo/MainInfo";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  useLazyGetRequestQuery,
  useLazyGetRubricsFieldsQuery,
} from "../../../store/requests/requests.api";
import {
  checkIsArray,
  checkIsJSON,
  handleFormatDate,
  handleResponse,
} from "../../../utilits";
import {
  useLazyGetObjectQuery,
  useLazyGetRubricFieldsQuery,
} from "../../../store/objects/objects.api";

export const ObjectCard = ({ className, selectedObject }) => {
  const [getRequest, { data: requestData }] = useLazyGetRequestQuery();
  const [getObject] = useLazyGetObjectQuery();
  const [getRubricField] = useLazyGetRubricsFieldsQuery();
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [getRubricFields, { data: objectFields }] =
    useLazyGetRubricFieldsQuery();

  const handleGetRequest = () => {
    getRequest(selectedObject?.id).then((resp) => {
      handleResponse(resp, () => {
        // ! Object.entries(resp?.data)[0][1]
        if (resp?.data && Object.entries(resp?.data)[1][1]) {
          let infoFields = Object.entries(Object.entries(resp?.data)[1][1])
            .filter((f) => f[0] !== "General_field_group")
            ?.map((f) => f[1]);
          infoFields = infoFields?.length ? infoFields : [infoFields];
          const generalInfo = Object.entries(
            Object.entries(resp?.data)[1][1]
          ).find((f) => f[0] === "General_field_group");

          setData(
            infoFields?.map((field) => ({
              ...field,
              generalInfo: generalInfo?.[1],
              id_client: field?.id_client,
              id_rubric: field?.id_rubric,
              id_location: checkIsArray(checkIsJSON(field?.id_location)),
              type_obj_apartment: field?.type_obj_apartment,
              price_min: field?.price_min,
              price_max: field?.price_max,
              room_min: field?.room_min,
              room_max: field?.room_max,
              rooms: field?.rooms,
              price_currency: field?.price_currency,
              address_storey: field?.address_storey,
              storey_count: field?.storey_count,
              area_total_min: field?.area_total_min,
              area_total_max: field?.area_total_max,
              area_total: field?.area_total,
              comment: field?.comment,
              not_actual: field?.not_actual,
              deleted: field?.deleted,
              dt_add:
                generalInfo?.length > 0 && generalInfo[1]?.dt_add
                  ? handleFormatDate(
                      Number(generalInfo[1]?.dt_add) * 1000,
                      true
                    )
                  : "-",
              dt_deadline:
                generalInfo?.length > 0 && generalInfo[1]?.dt_deadline
                  ? handleFormatDate(
                      Number(generalInfo[1]?.dt_deadline) * 1000,
                      true
                    )
                  : "-",
              isActual: generalInfo[1]?.not_actual === "0",
            }))
          );
        }
      });
    });
  };

  const handleGetObject = () => {
    getObject(selectedObject?.id).then((resp) => {
      handleResponse(resp, () => {
        getRubricFields(resp?.data?.id_rubric);
        setData([
          {
            ...resp?.data,
            img: Object.entries(resp?.data?.img)
              ?.map((p) => p[1])
              ?.sort((a, b) => b?.order - a?.order)
              ?.map(({ url }) => url),
            id_client: resp?.data?.id_client,
            id_rubric: resp?.data?.id_rubric,
            id_location: [resp?.data?.id_location],
            price_USD: resp?.data?.price_per_object_usd,
            dt_add: resp?.data?.dt_add
              ? handleFormatDate(Number(resp?.data?.dt_add) * 1000, true)
              : "-",
            area_total: resp?.data?.area_total,
            area_plot_sotka: resp?.data?.area_plot_sotka,
            rooms: resp?.data?.rooms,
            price_for: resp?.data?.price_for,
            isActual: resp?.data?.obj_is_actual === "1",
            dateEndAggrement: resp?.data?.dt_end_agreement,
          },
        ]);
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
      {data?.map((e, i) => (
        <React.Fragment key={i}>
          <SectionTitle title={e?.rubric ?? ""} />
          <Maininfo
            data={e}
            onChangeField={handleChangeField}
            requestData={requestData}
            isObject={selectedObject?.type === "object"}
            objectFields={objectFields}
            id={selectedObject?.id}
          />
          {/* {started ? (
         <>
           <SectionTitle title="Етап" />
           <Steps />
         </>
       ) : (
         <StartButton onClick={() => setStarted(true)} />
       )} */}
        </React.Fragment>
      ))}
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
  background: var(--modal-bg);
  @media (min-width: 1400px) {
    width: 290px;
  }
  @media (min-width: 1600px) {
    width: 360px;
  }
`;
