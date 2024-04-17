import styled from "styled-components";
import { Header } from "./Header";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { SectionTitle } from "./SectionTitle";
import { MainInfo } from "./MainInfo/MainInfo";
import { PersonalData } from "./PersonalData";
import { Footer } from "./Footer";
import { useState } from "react";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetPerimissionDirectorQuery,
  useGetStructureUsersCompanyQuery,
  useLazyChangeWorkerLevelQuery,
  useLazyCreateStructureQuery,
  useLazyCreateWorkerQuery,
  useLazyGetStructureUsersCompanyQuery,
} from "../../../../../store/structure/structure.api";
import {
  emailValidation,
  handleFromInputDate,
  handleRemovePhoneMask,
  handleResponse,
} from "../../../../../utilits";
import cogoToast from "cogo-toast";

const INITIAL_DATA = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  phones: [{ code: "1", phone: "", telegram: "0", viber: "0" }],
  photo: { file: null, url: null },
  dt_birthday: null,
};

export const Modal = ({ onClose, onCreatedUser }) => {
  const [createWorker] = useLazyCreateWorkerQuery();
  const [createStructure] = useLazyCreateStructureQuery();
  const [changeWorkerLevel] = useLazyChangeWorkerLevelQuery();
  const [getStructureUsers, { data: structureUsersCompany }] =
    useLazyGetStructureUsersCompanyQuery();
  const [data, setData] = useState(INITIAL_DATA);
  const { data: rolesPermission } = useGetPerimissionDirectorQuery();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const controls = useAnimationControls();

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  const handleChangeField = (fieldName, value) => {
    let newData = { ...data, [fieldName]: value };

    if (fieldName === "id_permision") {
      newData = { ...newData, structure_parent: undefined };
    }

    setData(newData);
    let updatedErrors = errors?.filter((e) => e !== fieldName);

    if (fieldName === "email" && emailValidation(value)) {
      updatedErrors.push("email");
    }
    setErrors(updatedErrors);
  };

  const handleReset = () => {
    setData(INITIAL_DATA);
    handleClose();
  };

  const handleCheckFields = () => {
    let errorsData = [];

    data?.email?.length === 0 && errorsData.push("email");
    data?.first_name?.length === 0 && errorsData.push("first_name");
    data?.last_name?.length === 0 && errorsData.push("last_name");
    data?.password?.length === 0 && errorsData.push("password");
    data?.phones?.filter((p) => p?.phone?.length === 0)?.length > 0 &&
      errorsData.push("phones");

    if (errorsData?.length > 0) {
      setErrors(errorsData);
      cogoToast.error("Заповніть обов'язкові поля", {
        hideAfter: 3,
        position: "top-right",
      });
    } else {
      return true;
    }
  };

  const handleCreate = () => {
    if (handleCheckFields()) {
      setLoading(true);
      createWorker({
        ...data,
        photo: data?.photo?.file,
        id_permision: rolesPermission?.id_permision,
        dt_birthday: Math.floor(
          Math.floor(
            data?.dt_birthday === "0"
              ? new Date()?.getTime() / 1000
              : new Date(handleFromInputDate(data?.dt_birthday))?.getTime() /
                  1000
          )
        ),
        phones_json: JSON.stringify(
          data?.phones.map((phone) => ({
            ...phone,
            id_phone_code: phone?.code,
            phone: handleRemovePhoneMask(phone.phone),
            viber: phone?.viber === "1",
            telegram: phone?.telegram === "1",
          }))
        ),
      }).then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          cogoToast.success("Працівника успішно створено", {
            hideAfter: 3,
            position: "top-right",
          });
          onCreatedUser && onCreatedUser(data?.structure_parent);
          handleReset();
        });
      });
    }
  };

  useEffect(() => {
    if (data?.id_permision) {
      getStructureUsers({ structure_level: data?.id_permision, id_user: "0" });
    }
  }, [, data?.id_permision]);

  return (
    <>
      {" "}
      <StyledModal
        initial={{ opacity: 0, translateX: "100%" }}
        transition={{ duration: 0.4 }}
        animate={controls}
        className="hide-scroll"
      >
        <Header onClose={handleReset} />
        <div className="modal-content">
          <SectionTitle title="Загальна інформація" />
          <MainInfo
            data={data}
            onChangeField={handleChangeField}
            users={structureUsersCompany?.data ?? []}
            errors={errors}
          />
          <SectionTitle title="Персональні дані" />
          <PersonalData
            data={data}
            onChangeField={handleChangeField}
            errors={errors}
          />
        </div>
        <Footer
          onSave={() => (loading ? null : handleCreate())}
          onCancel={handleReset}
          loading={loading}
        />
      </StyledModal>
      <div className="modal-overlay" onClick={handleClose}></div>
    </>
  );
};

const StyledModal = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  overflow: auto;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(12.5px);
  width: 361px;
  z-index: 10;
  .modal-content {
    padding: 0 10px 15px 11px;
    height: calc(100svh - 157px);
    overflow: auto;
    border-radius: 9px;
  }
`;
