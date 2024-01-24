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
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [getRubricFields, { data: objectFields }] =
    useLazyGetRubricFieldsQuery();

  const handleGetRequest = () => {
    getRequest(selectedObject?.id).then((resp) => {
      handleResponse(resp, () => {
        // ! Object.entries(resp?.data)[0][1]
        console.log(resp?.data && Object.entries(resp?.data)[1][1]);
        if (resp?.data && Object.entries(resp?.data)[1][1]) {
          let infoFields = Object.entries(Object.entries(resp?.data)[1][1])
            .filter((f) => f[0] !== "General_field_group")
            ?.map((f) => f[1]);
          infoFields = infoFields?.length ? infoFields : [infoFields];
          const generalInfo = Object.entries(
            Object.entries(resp?.data)[1][1]
          ).find((f) => f[0] === "General_field_group");

          console.log(infoFields);
          setData(
            infoFields?.map((field) => ({
              id_client: field?.id_client,
              id_rubric: field?.id_rubric,
              id_location: field?.id_location,
              type_obj_apartment: field?.type_obj_apartment,
              price_min: field?.price_min,
              price_max: field?.price_max,
              room_min: field?.room_min,
              room_max: field?.room_max,
              address_storey: field?.address_storey,
              storey_count: field?.storey_count,
              area_total_min: field?.area_total_min,
              area_total_max: field?.area_total_max,
              comment: field?.comment,
              not_actual: field?.not_actual,
              dt_deadline: Object.entries(resp?.data)[0][1]?.dt_deadline,
              deleted: field?.deleted,
              dt_add:
                generalInfo?.length > 0 && generalInfo[1]?.dt_add
                  ? handleFormatDate(
                      Number(generalInfo[1]?.dt_add) * 1000,
                      true
                    )
                  : "-",
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
            id_location: resp?.data?.id_location,
            price_min: resp?.data?.price,
            dt_add: resp?.data?.dt_add
              ? handleFormatDate(Number(resp?.data?.dt_add) * 1000, true)
              : "-",
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

  console.log(data);
  return (
    <>
      {data?.map((e, i) => (
        <StyledObject key={i} className={`hide-scroll ${className}`}>
          <SectionTitle title={e?.rubric ?? ""} />
          <Maininfo
            data={e}
            onChangeField={handleChangeField}
            requestData={requestData}
            isObject={selectedObject?.type === "object"}
            objectFields={objectFields}
          />
          {/* {started ? (
            <>
              <SectionTitle title="Етап" />
              <Steps />
            </>
          ) : (
            <StartButton onClick={() => setStarted(true)} />
          )} */}
        </StyledObject>
      ))}
    </>
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
