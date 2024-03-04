import { styled } from "styled-components";
import { Header as ObjectsHeader } from "./Header/Header";
import { Photos } from "./Photos/Photos";
import { MainInfo } from "./MainInfo/MainInfo";
import { Info } from "./Info/Info";
import { Header } from "./MainInfo/Header/Header";
import { Price } from "./MainInfo/Price/Price";
import { useEffect, useRef, useState } from "react";
import {
  useGetCommentsToFieldsQuery,
  useLazyCreateObjectQuery,
  useLazyEditObjectQuery,
  useLazyGetObjectQuery,
  useLazyGetRubricFieldsQuery,
} from "../../store/objects/objects.api";
import { useNavigate, useParams } from "react-router-dom";
import {
  handleCheckFields,
  handleFromInputDate,
  handleResponse,
} from "../../utilits";
import cogoToast from "cogo-toast";

const INIT_DATA = {
  title: "",
  description: "",
  comment: "",
  obj_is_actual: "0",
  price_currency: 1,
  price_for: 1,
  obj_is_actual_dt: new Date().getTime(),
};

const ObjectPage = () => {
  const { clientId, id } = useParams();
  const navigate = useNavigate();
  const [createObject] = useLazyCreateObjectQuery();
  const [editObject] = useLazyEditObjectQuery();
  const [getRubricFields] = useLazyGetRubricFieldsQuery();
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();
  const [getObject] = useLazyGetObjectQuery();
  const [data, setData] = useState(INIT_DATA);
  const [fields, setFields] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState([]);
  const contentRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleChangePhotos = (p) => setPhotos(p);

  const handleFormatDatesToTimestamp = (data, fieldsData, isReverse) => {
    const dateFields = fieldsData?.main_field
      ? Object.entries(fieldsData?.main_field)
          ?.filter((f) => f[1]?.type === "date")
          ?.map((f) => f[0])
          ?.map((f) => f !== "obj_is_actual_dt")
      : [];
    const checkboxes = fieldsData?.other_field
      ? Object.fromEntries(
          Object.entries(fieldsData?.other_field)
            ?.filter((f) => f[1]?.type === "checkbox")
            ?.map((f) => f[0])
            ?.map((field) => [field, data[field] ?? "0"])
        )
      : [];

    let updatedData = { ...data, ...checkboxes };

    dateFields.forEach((f) => {
      if (typeof f !== "boolean") {
        updatedData = {
          ...updatedData,
          [f]:
            Number(updatedData[f]) === 0
              ? "0"
              : new Date(updatedData[f] * 1000),
        };
      }
    });

    return updatedData;
  };

  const handleGetRubricsFields = (id, lastData, isFormatdate) => {
    getRubricFields(id).then((resp) => {
      isFormatdate &&
        setData(handleFormatDatesToTimestamp(lastData, resp?.data, true));
      setFields(resp?.data);
    });
  };

  const handleChangeField = (fieldName, value) => {
    setErrors(
      errors.filter((e) => e !== "updated").filter((e) => e !== fieldName)
    );
    if (fieldName === "id_rubric") {
      const newData = {
        ...INIT_DATA,
        id_rubric: value,
        id_location: data?.id_location ?? "",
      };
      setData(newData);
      handleGetRubricsFields(value, newData, true);
    } else {
      const newData = {
        ...data,
        [fieldName]: value,
        obj_is_actual:
          fieldName === "obj_is_actual_dt"
            ? "0"
            : fieldName === "obj_is_actual"
            ? value
            : data.obj_is_actual,
        mls:
          fieldName === "obj_is_actual_dt" || fieldName === "obj_is_actual"
            ? "0"
            : fieldName === "mls"
            ? value
            : data.mls,
        dt_end_agreement:
          fieldName === "obj_is_actual"
            ? "0"
            : fieldName === "dt_end_agreement"
            ? value
            : data.dt_end_agreement,
      };
      setData(newData);
    }
  };

  const handleGetObject = () => {
    if (id) {
      getObject(id).then((resp) => {
        const objectData = {
          ...handleFormatDatesToTimestamp(resp?.data, true),
          obj_is_actual_dt:
            !resp?.data?.obj_is_actual_dt ||
            Number(resp?.data?.obj_is_actual_dt) === 0
              ? undefined
              : new Date(Number(resp?.data?.obj_is_actual_dt) * 1000),
          dt_end_agreement:
            Number(resp?.data?.dt_end_agreement) === 0
              ? undefined
              : new Date(Number(resp?.data?.dt_end_agreement) * 1000),
        };
        setData(objectData);
        handleGetRubricsFields(resp?.data?.id_rubric, objectData, true);
        setPhotos(
          Object.entries(resp?.data?.img)
            .map((p) => ({ ...p[1], id: p[0] }))
            ?.sort((a, b) => b.cover - a.cover)
            .map((photo, i) => ({
              url: photo?.url,
              status: "old",
              id: photo?.id,
              cover: photo?.cover,
            })) ?? []
        );
      });
    }
  };

  const handleCreate = () => {
    if (fields?.main_field) {
    }
    const isEmptyFields = handleCheckFields({
      data: { ...data, id_client: clientId },
      requiredFields: [
        ...(fields?.main_field
          ? Object.entries(fields?.main_field)
              ?.filter((f) => f[1]?.required === 1)
              ?.map((f) => f[0])
              ?.filter((f) => f !== "dt_end_agreement")
          : []),
        ...(fields?.other_field
          ? Object.entries(fields?.other_field)
              ?.filter((f) => f[1]?.required === 1)
              ?.filter((f) => f[1]?.type !== "checkbox")
              ?.map((f) => f[0])
          : []),
      ],
      requiredFieldsNumber: [
        ...(fields?.main_field
          ? Object.entries(fields?.main_field)
              ?.filter((f) => f[1]?.required === 1 && f[1]?.type === "int")
              ?.map((f) => f[0])
          : []),
        ...(fields?.other_field
          ? Object.entries(fields?.other_field)
              ?.filter((f) => f[1]?.required === 1 && f[1]?.type === "int")
              ?.map((f) => f[0])
          : []),
      ],
      additionalFields: ["title", "id_rubric"],
      titles: commentsToFields?.object,
      additionalTitles: {
        title: "Заголовок",
        price: "Ціна",
        id_location: "Розташування",
        id_rubric: "Категорія",
      },
    });

    if (isEmptyFields?.length === 0) {
      setLoading(true);
      createObject({
        field: {
          ...handleFormatDatesToTimestamp(data, fields),
          id_client: clientId,
          obj_is_actual_dt: !data?.obj_is_actual_dt
            ? "0"
            : data?.obj_is_actual_dt !== "0"
            ? Math.floor(new Date(data?.obj_is_actual_dt)?.getTime() / 1000)
            : "0",
          dt_end_agreement: !data?.dt_end_agreement
            ? "0"
            : data?.dt_end_agreement !== "0"
            ? Math.floor(
                new Date(
                  handleFromInputDate(data?.dt_end_agreement)
                )?.getTime() / 1000
              )
            : "0",
        },
        photos: photos.map((p) => p.file),
      }).then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          cogoToast.success("Об'єкт успішно створено", {
            hideAfter: 3,
            position: "top-right",
          });
          navigate(`/client/${clientId}`);
        });
      });
    } else {
      setErrors([...isEmptyFields, "updated"]);
    }
  };

  const handleEdit = () => {
    const isEmptyFields = handleCheckFields({
      data: { ...data, id_client: clientId },
      requiredFields: [
        ...(fields?.main_field
          ? Object.entries(fields?.main_field)
              ?.filter((f) => f[1]?.required === 1)
              ?.map((f) => f[0])
              ?.filter((f) => f !== "dt_end_agreement")
          : []),
        ...(fields?.other_field
          ? Object.entries(fields?.other_field)
              ?.filter((f) => f[1]?.required === 1)
              ?.filter((f) => f[1]?.type !== "checkbox")
              ?.map((f) => f[0])
          : []),
      ],
      requiredFieldsNumber: [
        ...(fields?.main_field
          ? Object.entries(fields?.main_field)
              ?.filter((f) => f[1]?.required === 1 && f[1]?.type === "int")
              ?.map((f) => f[0])
          : []),
        ...(fields?.other_field
          ? Object.entries(fields?.other_field)
              ?.filter((f) => f[1]?.required === 1 && f[1]?.type === "int")
              ?.map((f) => f[0])
          : []),
      ],
      additionalFields: ["title", "id_rubric"],
      titles: commentsToFields?.object,
      additionalTitles: {
        title: "Заголовок",
        price: "Ціна",
        id_location: "Розташування",
        id_rubric: "Категорія",
      },
    });

    if (isEmptyFields?.length === 0) {
      setLoading(true);
      editObject({
        id_object: id,
        field: {
          ...handleFormatDatesToTimestamp(data, fields),
          id_client: clientId,
          obj_is_actual_dt: !data?.obj_is_actual_dt
            ? "0"
            : data?.obj_is_actual_dt !== "0"
            ? Math.floor(new Date(data?.obj_is_actual_dt)?.getTime() / 1000)
            : "0",
          dt_end_agreement: !data?.dt_end_agreement
            ? "0"
            : data?.dt_end_agreement !== "0"
            ? Math.floor(
                new Date(
                  handleFromInputDate(data?.dt_end_agreement)
                )?.getTime() / 1000
              )
            : "0",
          img: null,

          photos_json: null,
        },
        photos: photos.filter((p) => p?.status !== "old").map((p) => p.file),
      }).then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          cogoToast.success("Зміни успішно збережено", {
            hideAfter: 3,
            position: "top-right",
          });
          setPhotos(photos.map((p) => (p?.file ? { ...p, status: "old" } : p)));
          handleGetObject();
        });
      });
    } else {
      setErrors(isEmptyFields);
      setErrors([...isEmptyFields, "updated"]);
    }
  };

  useEffect(() => {
    handleGetObject();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    if (!!errors?.find((e) => e === "updated")) {
      const firstErrorField = document.querySelectorAll(
        ".object-main-wrapper .error-field"
      );
      const isFullScroll =
        firstErrorField[0]?.classList.contains("title") ||
        firstErrorField[0]?.classList.contains("mobile-price");
      const mainInfoWrapper = document.querySelector(
        ".object-maininfo-wrapper"
      );
      if (firstErrorField[0]) {
        contentRef.current.scrollTo({
          top: isFullScroll
            ? firstErrorField[0].offsetTop - contentRef.current.offsetTop - 10
            : mainInfoWrapper.offsetTop - contentRef.current.offsetTop - 10,
        });
      }
    }
  }, [errors]);

  return (
    <StyledObject className="object-main-wrapper" ref={contentRef}>
      <ObjectsHeader
        onSave={id ? handleEdit : handleCreate}
        favorite={favorite}
        onToggleFavorite={() => setFavorite(!favorite)}
        loading={loading}
      />
      <Header
        className="mobile-header"
        data={data}
        onChangeField={handleChangeField}
      />
      <Price
        className="mobile-price"
        data={data}
        onChangeField={handleChangeField}
        errors={errors}
        mobile
        options={
          fields?.main_field?.price_for?.field_option
            ? Object.entries(fields?.main_field?.price_for?.field_option)?.map(
                (f) => ({ title: f[1], value: f[0] })
              )
            : []
        }
      />
      <div className="object-wrappper">
        <Photos photos={photos} onChange={handleChangePhotos} />
        <MainInfo
          data={data}
          onChangeField={handleChangeField}
          fields={fields}
          errors={errors}
        />
        <Info data={data} onChangeField={handleChangeField} errors={errors} />
      </div>
    </StyledObject>
  );
};

const StyledObject = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  .object-wrappper {
    padding: 0 39px 10px 17px;
    display: grid;
    grid-template-columns: max-content 1fr 1fr;
    gap: 15px;
  }
  .mobile-header {
    display: none;
  }
  .mobile-price {
    display: none;
  }
  @media (max-width: 1300px) {
    height: calc(100svh - 141px);
    overflow: auto;
    .object-wrappper {
      grid-template-columns: 1fr 1fr;
      padding: 0 20px 20px;
    }
    .mobile-header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin: 0 20px 10px;
      gap: 3px;
    }
  }
  @media (max-width: 800px) {
    width: 100svw;
    margin-left: -24px;
    height: calc(100svh - 107px);
    .object-wrappper {
      grid-template-columns: 1fr;
    }
    .mobile-price {
      display: flex;
      margin: 0 20px 10px;
    }
    .mobile-header {
      grid-template-columns: 1fr max-content 1fr;
    }
  }
`;

export default ObjectPage;
