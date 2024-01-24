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
  dt_birthday: new Date(),
};

export const Modal = ({ onClose, onRefetchData }) => {
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
    const newData = { ...data, [fieldName]: value };
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
              : new Date(Number(data?.dt_birthday))?.getTime() / 1000
          )
        ),
        phones_json: JSON.stringify(
          data?.phones.map((phone) => ({
            ...phone,
            id_phone_code: phone?.code,
            phone: handleRemovePhoneMask(phone.phone),
          }))
        ),
      }).then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          cogoToast.success("Працівника успішно створено", {
            hideAfter: 3,
            position: "top-right",
          });
          handleReset();
          onRefetchData && onRefetchData();
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
        <Footer
          onSave={() => (loading ? null : handleCreate())}
          onCancel={handleReset}
          loading={loading}
        />
      </div>
    </StyledModal>
  );
};

const StyledModal = styled(motion.div)`
  position: absolute;
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
  }
`;
