import { styled } from "styled-components";
import { Header as ObjectsHeader } from "./Header/Header";
import { Photos } from "./Photos/Photos";
import { MainInfo } from "./MainInfo/MainInfo";
import { Info } from "./Info/Info";
import { Header } from "./MainInfo/Header/Header";
import { Price } from "./MainInfo/Price/Price";
import { useEffect, useState } from "react";
import {
  useLazyCreateObjectQuery,
  useLazyDeleteObjectPhotoQuery,
  useLazyEditObjectQuery,
  useLazyGetObjectQuery,
  useLazyGetRubricFieldsQuery,
  useLazySetCoverPhotoQuery,
} from "../../store/objects/objects.api";
import { useNavigate, useParams } from "react-router-dom";
import { handleCheckIsField, handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";

const INIT_DATA = {
  title: "",
  description: "",
  comment: "",
  obj_is_actual: 1,
  price_currency: 1,
  price_for: 1,
};

export const Object = () => {
  const { clientId, id } = useParams();
  const navigate = useNavigate();
  const [createObject] = useLazyCreateObjectQuery();
  const [editObject] = useLazyEditObjectQuery();
  const [getRubricFields] = useLazyGetRubricFieldsQuery();
  const [getObject, { data: objectData }] = useLazyGetObjectQuery();
  const [deletePhoto] = useLazyDeleteObjectPhotoQuery();
  const [setCoverPhoto] = useLazySetCoverPhotoQuery();
  const [data, setData] = useState(INIT_DATA);
  const [fields, setFields] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [deletedPhotos, setDeletedPhotos] = useState([]);

  const handleChangePhotos = (p) => setPhotos(p);

  const handleGetRubricsFields = (id, lastData) => {
    getRubricFields(id).then((resp) => {
      const isDate = handleCheckIsField(resp?.data, "obj_is_actual_dt");
      isDate &&
        setData({
          ...INIT_DATA,
          ...lastData,
          obj_is_actual_dt: new Date().getTime(),
        });
      setFields(resp?.data);
    });
  };

  const handleChangeField = (fieldName, value) => {
    if (fieldName === "id_rubric") {
      const newData = {
        ...INIT_DATA,
        id_rubric: value,
        id_location: data?.id_location ?? "",
      };
      setData(newData);
      handleGetRubricsFields(value, newData);
    } else {
      const newData = { ...data, [fieldName]: value };
      setData(newData);
    }
  };

  const handleDeletePhotos = () => {
    if (deletedPhotos?.length > 0) {
      const photoIds = objectData.img
        .filter((p, i) => !!deletedPhotos.find((index) => index === i))
        ?.map(({ id }) => id);
      Promise.all(
        photoIds?.map((id_img) => deletePhoto({ id_object: id, id_img }))
      );
    }
  };

  const handleSetPhotoCover = () => {
    const firstPhotoId = objectData.img.find((p) => p?.url === photos[0])?.id;

    if (firstPhotoId || firstPhotoId === 0) {
      setCoverPhoto({ id_object: id, id_img: firstPhotoId.toString() });
    }
  };

  const handleCreate = () => {
    createObject({ field: { ...data, id_client: clientId }, photos }).then(
      (resp) =>
        handleResponse(resp, () => {
          cogoToast.success("Заявка успішно створена", {
            hideAfter: 3,
            position: "top-right",
          });
          navigate(`/client/${clientId}`);
        })
    );
  };

  const handleEdit = () => {
    editObject({
      id_object: id,
      field: { ...data, id_client: clientId },
      photos,
    }).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Зміни успішно збережено", {
          hideAfter: 3,
          position: "top-right",
        });
        handleDeletePhotos();
        handleSetPhotoCover();
      })
    );
  };

  useEffect(() => {
    if (id) {
      getObject(id).then((resp) => {
        setData(resp?.data);
        handleGetRubricsFields(resp?.data?.id_rubric, resp?.data);
        setPhotos(
          [...resp?.data?.img]
            ?.sort((a, b) => b.cover - a.cover)
            .map((photo) => photo?.url) ?? []
        );
      });
    }
  }, [id]);

  return (
    <StyledObject className="hide-scroll">
      <ObjectsHeader
        onSave={id ? handleEdit : handleCreate}
        favorite={favorite}
        onToggleFavorite={() => setFavorite(!favorite)}
      />
      {handleCheckIsField(fields, "obj_is_actual_dt") && (
        <Header
          className="mobile-header"
          data={data}
          onChangeField={handleChangeField}
        />
      )}
      <Price
        className="mobile-price"
        data={data}
        onChangeField={handleChangeField}
      />
      <div className="object-wrappper">
        <Photos
          photos={photos}
          onChange={handleChangePhotos}
          onDeletePhoto={(photoIndex) =>
            setDeletedPhotos([...deletedPhotos, photoIndex])
          }
        />
        <MainInfo
          data={data}
          onChangeField={handleChangeField}
          fields={fields}
        />
        <Info data={data} onChangeField={handleChangeField} />
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
